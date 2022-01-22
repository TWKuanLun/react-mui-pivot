import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFilteredField from '../../Shared/Interface/IFilteredField';
import { RootState } from '../store';

const initialState = [] as IFilteredField[];

const rowsSlice = createSlice({
    name: 'rows',
    initialState,
    reducers: {
        update_row(state, action: PayloadAction<IFilteredField>) {
            let field: IFilteredField = action.payload;
            let shallowCloneState = [...state];
            let index = shallowCloneState.map(x => x.Name).indexOf(field.Name);
            if(index !== -1){
                shallowCloneState.splice(index, 1, field);
                return shallowCloneState;
            }
            return state;
        },
        add_row(state, action: PayloadAction<IFilteredField>) {
            let field: IFilteredField = action.payload;
            return [...state, field];
        },
        remove_row(state, action: PayloadAction<string>) {
            let fieldName: string = action.payload;
            if(state.some(x => x.Name === fieldName)){
                return state.filter(x => x.Name !== fieldName);
            }
            return state;
        },
    },
})


export const selectRows = (state: RootState) => state.rows;
export const { update_row, add_row, remove_row } = rowsSlice.actions;
export default rowsSlice.reducer;
