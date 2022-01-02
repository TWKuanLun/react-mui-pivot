import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFilteredField from '../../Shared/Interface/IFilteredField';

const initialState = [] as IFilteredField[];

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        update_filter(state, action: PayloadAction<IFilteredField>) {
            let field: IFilteredField = action.payload;
            let shallowCloneState = [...state];
            let index = shallowCloneState.map(x => x.Name).indexOf(field.Name);
            if(index !== -1){
                shallowCloneState.splice(index, 1, field);
                return shallowCloneState;
            }
            return state;
        },
        add_filter(state, action: PayloadAction<IFilteredField>) {
            let field: IFilteredField = action.payload;
            return [...state, field];
        },
        remove_filter(state, action: PayloadAction<string>) {
            let fieldName: string = action.payload;
            if(state.some(x => x.Name === fieldName)){
                return state.filter(x => x.Name !== fieldName);
            }
            return state;
        },
    },
})


export const { update_filter, add_filter, remove_filter } = filtersSlice.actions;
export default filtersSlice.reducer;
