import DataFactory from './DataFactory';
import IField from './Interface/IField';
import IFilteredField from './Interface/IFilteredField';
import IMeasureField, { SummarizeType } from './Interface/IMeasureField';
import Enumerable from 'linq';

export default class JsonDataFactory implements DataFactory{
    Source: any[];
    constructor(source :any[]){
        this.Source = source;
    }
    GetAllFields(): IField[]{
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
    GetData(Rows?: IField[], Columns?: IField[], Measures?: IMeasureField[], Filters?: IFilteredField[]):any[]{
        if(this.Source == null){
            return [];
        }
        if(Rows == null && Columns == null){
            return [];
        }
        if(Measures == null){
            return [];
        }
        let result = Enumerable.from(this.Source);
        if(Filters){
            Filters.forEach(filter => {
                result = result.where(x => {
                    if(!filter.FilterValues){
                        return true;
                    }
                    let pass = false;
                    filter.FilterValues.forEach(filterValue => {
                        pass = pass || (x[filter.Name] == filterValue);
                    });
                    return pass;
                })
            });
        }
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
}
