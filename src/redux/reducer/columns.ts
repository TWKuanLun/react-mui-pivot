import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFilteredField from '../../Shared/Interface/IFilteredField';

const initialState = [] as IFilteredField[];

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        update_column(state, action: PayloadAction<IFilteredField>) {
            let field: IFilteredField = action.payload;
            let shallowCloneState = [...state];
            let index = shallowCloneState.map(x => x.Name).indexOf(field.Name);
            if(index !== -1){
                shallowCloneState.splice(index, 1, field);
                return shallowCloneState;
            }
            return state;
        },
        add_column(state, action: PayloadAction<IFilteredField>) {
            let field: IFilteredField = action.payload;
            return [...state, field];
        },
        remove_column(state, action: PayloadAction<string>) {
            let fieldName: string = action.payload;
            if (state.some(x => x.Name === fieldName)) {
                return state.filter(x => x.Name !== fieldName);
            }
            return state;
        },
    },
})


export const { update_column, add_column, remove_column } = columnsSlice.actions;
export default columnsSlice.reducer;

