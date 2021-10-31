import IField from './Interface/IField';
import IFilteredField from './Interface/IFilteredField';
import IMeasureField from './Interface/IMeasureField';

export default interface DataFactory {
    GetData(Rows: IFilteredField[], Columns: IFilteredField[], Measure: IMeasureField[], Filters: IFilteredField[]): any[]
    GetAllFields(): IField[]
}