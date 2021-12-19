import IField from './Interface/IField';
import IFilteredField from './Interface/IFilteredField';
import IMeasureField from './Interface/IMeasureField';
import FieldInterface from './Interface/FieldInterface';

export default interface DataFactory {
    GetData(Rows: IFilteredField[], Columns: IFilteredField[], Measure: IMeasureField[], Filters: IFilteredField[]): Promise<any[]>
    GetAllFields(): Promise<IField[]>
    GetFieldValues(field: IField): Promise<string[]>
    GetFieldInterface(field: IField): FieldInterface
}