import { ADD_COLUMN, IAction, REMOVE_COLUMN, UPDATE_COLUMN } from '../actionTypes';
import IFilteredField from '../../Shared/Interface/IFilteredField';

const initialState: IFilteredField[] = [];

export default (state = initialState, action: IAction): IFilteredField[] => {
    switch (action.type) {
        case REMOVE_COLUMN: {
            let fieldName: string = action.payload;
            if(state.some(x => x.Name === fieldName)){
                return state.filter(x => x.Name !== fieldName);
            }
            return state;
        }
        case ADD_COLUMN: {
            let field: IFilteredField = action.payload;
            return [...state, field];
        }
        case UPDATE_COLUMN: {
            let field: IFilteredField = action.payload;
            let shallowCloneState = [...state];
            let index = shallowCloneState.map(x => x.Name).indexOf(field.Name);
            if(index !== -1){
                shallowCloneState.splice(index, 1, field);
                return shallowCloneState;
            }
            return state;
        }
        default: {
            return state;
        }
    }
};
