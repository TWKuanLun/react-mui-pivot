import { ADD_ROW, IAction, REMOVE_ROW, UPDATE_ROWS } from '../actionTypes';
import IFilteredField from '../../Shared/Interface/IFilteredField';

const initialState: IFilteredField[] = [];

export default (state = initialState, action: IAction): IFilteredField[] => {
    switch (action.type) {
        case REMOVE_ROW: {
            if(state.some(x => x.Name === action.payload)){
                return state.filter(x => x.Name !== action.payload);
            }
            return state;
        }
        case ADD_ROW: {
            return [...state, action.payload];
        }
        case UPDATE_ROWS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};
