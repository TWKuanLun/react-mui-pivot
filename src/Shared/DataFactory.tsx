import IField from './Interface/IField';
import IFilteredField from './Interface/IFilteredField';
import IMeasureField from './Interface/IMeasureField';

export default interface DataFactory {
    GetData(Rows?: IField[], Columns?: IField[], Measure?: IMeasureField[], Filters?: IFilteredField[]): any[]
    GetAllFields(): IField[]
}