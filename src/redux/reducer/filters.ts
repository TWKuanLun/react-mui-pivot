import { ADD_FILTER, IAction, REMOVE_FILTER, UPDATE_FILTERS } from '../actionTypes';
import IFilteredField from '../../Shared/Interface/IFilteredField';

const initialState: IFilteredField[] = [];

export default (state = initialState, action: IAction): IFilteredField[] => {
    switch (action.type) {
        case REMOVE_FILTER: {
            if(state.some(x => x.Name === action.payload)){
                return state.filter(x => x.Name !== action.payload);
            }
            return state;
        }
        case ADD_FILTER: {
            return [...state, action.payload];
        }
        case UPDATE_FILTERS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};
