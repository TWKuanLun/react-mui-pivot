import IField from './IField';

export default interface IMeasureField extends IField {
    Summarize: SummarizeType
};

export enum SummarizeType {
    Count,
    DistinctCount,
    Sum,
    Average,
    Maximun,
    Minimun
}