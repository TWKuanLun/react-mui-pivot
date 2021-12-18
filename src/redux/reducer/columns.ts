import { ADD_COLUMN, IAction, REMOVE_COLUMN, UPDATE_COLUMNS } from '../actionTypes';
import IFilteredField from '../../Shared/Interface/IFilteredField';

const initialState: IFilteredField[] = [];

export default (state = initialState, action: IAction): IFilteredField[] => {
    switch (action.type) {
        case REMOVE_COLUMN: {
            if(state.some(x => x.Name === action.payload)){
                return state.filter(x => x.Name !== action.payload);
            }
            return state;
        }
        case ADD_COLUMN: {
            return [...state, action.payload];
        }
        case UPDATE_COLUMNS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};
