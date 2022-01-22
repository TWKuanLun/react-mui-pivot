import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMeasureField from '../../Shared/Interface/IMeasureField';
import { RootState } from '../store';

const initialState = [] as IMeasureField[];

const measuresSlice = createSlice({
    name: 'measures',
    initialState,
    reducers: {
        update_measure(state, action: PayloadAction<IMeasureField>) {
            let field: IMeasureField = action.payload;
            let shallowCloneState = [...state];
            let index = shallowCloneState.map(x => x.Name).indexOf(field.Name);
            if(index !== -1){
                shallowCloneState.splice(index, 1, field);
                return shallowCloneState;
            }
            return state;
        },
        add_measure(state, action: PayloadAction<IMeasureField>) {
            let field: IMeasureField = action.payload;
            return [...state, field];
        },
        remove_measure(state, action: PayloadAction<string>) {
            let fieldName: string = action.payload;
            if(state.some(x => x.Name === fieldName)){
                return state.filter(x => x.Name !== fieldName);
            }
            return state;
        },
    },
})

export const selectMeasures = (state: RootState) => state.measures;
export const { update_measure, add_measure, remove_measure } = measuresSlice.actions;
export default measuresSlice.reducer;
