import DataFactory from './DataFactory';
import IField from './Interface/IField';
import IFilteredField from './Interface/IFilteredField';
import IMeasureField, { SummarizeType } from './Interface/IMeasureField';
import Enumerable from 'linq';
import FieldInterface from './Interface/FieldInterface';

export default class JsonDataFactory implements DataFactory{
    Source: any[];
    constructor(source :any[]){
        this.Source = source;
    }
    GetFieldInterface(field: IField){
        if(field.Type === 'number'){
            return FieldInterface.IMeasureField;
        }
        if(field.Type === 'string' || field.Type === 'boolean'){
            return FieldInterface.IFilteredField;
        }
        return FieldInterface.Unknown;
    }
    async GetAllFields(): Promise<IField[]>{
        let first = Enumerable.from(this.Source).firstOrDefault();
        let allField: IField[] = [];
        if(first != null){
            for(let fieldName in first){
                let field: IField = { Display: fieldName, Name: fieldName, Type: typeof(first[fieldName])};
                allField.push(field);
            }
        }
        return allField;
    }
    async GetFieldValues(field: IField): Promise<string[]>{
        return Enumerable.from(this.Source).select(x => x[field.Name]).distinct().toArray();
    }
    async GetData(Rows: IFilteredField[], Columns: IFilteredField[], Measures: IMeasureField[], Filters: IFilteredField[]): Promise<any[]>{
        if(this.Source == null){
            return [];
        }
        if(Rows.length === 0 && Columns.length === 0){
            return [];
        }
        if(Measures.length === 0){
            return [];
        }
        let result = Enumerable.from(this.Source);
        result = this.filterData(result, Filters);
        result = this.filterData(result, Rows);
        result = this.filterData(result, Columns);
        let keySelector = (x: any) => {
            let key = {};
            if(Rows != null){
                Rows.forEach(row => {
                    key[row.Name] = x[row.Name];
                });
            }
            if(Columns != null){
                Columns.forEach(column => {
                    key[column.Name] = x[column.Name];
                });
            }
            return key;
        };
        let elementSelector = (x: any) => {
            let element = {};
            Measures.forEach(measure => {
                element[measure.Name] = x[measure.Name] || 0;
            });
            return element;
        };
        let resultSelector = (key: any, element: Enumerable.IEnumerable<any>) => {
            let result = {};
            for(let fieldName in key){
                result[fieldName] = key[fieldName];
            }
            Measures.forEach(measure => {
                switch(measure.Summarize){
                    case SummarizeType.Sum:
                        result[measure.Name] = element.sum(e => e[measure.Name]);
                        break;
                    case SummarizeType.Average:
                        result[measure.Name] = element.average(e => e[measure.Name]);
                        break;
                    default:
                    case SummarizeType.Count:
                        result[measure.Name] = element.count(e => e[measure.Name]);
                        break;
                    case SummarizeType.DistinctCount:
                        result[measure.Name] = element.distinct(e => e[measure.Name]).count();
                        break;
                    case SummarizeType.Minimun:
                        result[measure.Name] = element.min(e => e[measure.Name]);
                        break;
                    case SummarizeType.Maximun:
                        result[measure.Name] = element.max(e => e[measure.Name]);
                        break;
                }
            });
            return result;
        };
        let compareSelector = (key: any) => {
            let compareStr = '';
            for(let fieldName in key){
                compareStr += key[fieldName] + ' ';
            }
            compareStr.substring(0, compareStr.length - 1);
            return compareStr;
        };
        result = result.groupBy(keySelector, elementSelector, resultSelector, compareSelector);
        console.debug(result.toArray());
        return result.toArray();
    }
    private filterData(data: Enumerable.IEnumerable<any>, fields: IFilteredField[]): Enumerable.IEnumerable<any>{
        let result = data;
        fields.forEach(field => {
            if(!field.FilterValues){
                return;
            }
            result = result.where(x => {
                let pass = false;
                field.FilterValues.forEach(filterValue => {
                    pass = pass || (x[field.Name] == filterValue);
                });
                return pass;
            })
        });
        return result;
    }
}
