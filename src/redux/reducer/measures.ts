import { ADD_MEASURE, IAction, REMOVE_MEASURE, UPDATE_MEASURES } from '../actionTypes';
import IMeasureField from '../../Shared/Interface/IMeasureField';

const initialState: IMeasureField[] = [];

export default (state = initialState, action: IAction): IMeasureField[] => {
    switch (action.type) {
        case REMOVE_MEASURE: {
            if(state.some(x => x.Name === action.payload)){
                return state.filter(x => x.Name !== action.payload);
            }
            return state;
        }
        case ADD_MEASURE: {
            return [...state, action.payload];
        }
        case UPDATE_MEASURES: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};
