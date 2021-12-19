import {
    UPDATE_FILTER,
    UPDATE_COLUMN,
    UPDATE_MEASURE,
    UPDATE_ROW,
    ADD_FILTER,
    ADD_COLUMN,
    ADD_MEASURE,
    ADD_ROW,
    REMOVE_FILTER,
    REMOVE_COLUMN,
    REMOVE_MEASURE,
    REMOVE_ROW
} from './actionTypes';

import IFilteredField from '../Shared/Interface/IFilteredField';
import IMeasureField from '../Shared/Interface/IMeasureField';

export const update_filter = (filter: IFilteredField) => {
    return {
        type: UPDATE_FILTER,
        payload: filter
    };
};

export const update_column = (column: IFilteredField) => {
    return {
        type: UPDATE_COLUMN,
        payload: column
    };
};

export const update_row = (row: IFilteredField) => {
    return {
        type: UPDATE_ROW,
        payload: row
    };
};

export const update_measure = (measure: IMeasureField) => {
    return {
        type: UPDATE_MEASURE,
        payload: measure
    };
};

export const add_filter = (filter: IFilteredField) => {
    return {
        type: ADD_FILTER,
        payload: filter
    };
};

export const add_column = (column: IFilteredField) => {
    return {
        type: ADD_COLUMN,
        payload: column
    };
};

export const add_row = (row: IFilteredField) => {
    return {
        type: ADD_ROW,
        payload: row
    };
};

export const add_measure = (measure: IMeasureField) => {
    return {
        type: ADD_MEASURE,
        payload: measure
    };
};

export const remove_filter = (fieldName: string) => {
    return {
        type: REMOVE_FILTER,
        payload: fieldName
    };
};

export const remove_column = (fieldName: string) => {
    return {
        type: REMOVE_COLUMN,
        payload: fieldName
    };
};

export const remove_row = (fieldName: string) => {
    return {
        type: REMOVE_ROW,
        payload: fieldName
    };
};

export const remove_measure = (fieldName: string) => {
    return {
        type: REMOVE_MEASURE,
        payload: fieldName
    };
};