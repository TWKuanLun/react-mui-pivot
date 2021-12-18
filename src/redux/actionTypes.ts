export interface IAction {
    type: string,
    payload: any
}

export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const UPDATE_ROWS = "UPDATE_ROWS";
export const UPDATE_COLUMNS = "UPDATE_COLUMNS";
export const UPDATE_MEASURES = "UPDATE_MEASURES";

export const ADD_FILTER = "ADD_FILTER";
export const ADD_ROW = "ADD_ROW";
export const ADD_COLUMN = "ADD_COLUMN";
export const ADD_MEASURE = "ADD_MEASURE";

export const REMOVE_FILTER = "REMOVE_FILTER";
export const REMOVE_ROW = "REMOVE_ROW";
export const REMOVE_COLUMN = "REMOVE_COLUMN";
export const REMOVE_MEASURE = "REMOVE_MEASURE";