import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import VisualizationType from '../../Shared/VisualizationType';
import { RootState } from '../store';

const initialState = 0 as VisualizationType;

const visualizationTypeSlice = createSlice({
    name: 'visualizationType',
    initialState,
    reducers: {
        // @ts-ignore: semantic error TS6133: 'state' is declared but its value is never read.
        change_visualization_type(state, action: PayloadAction<VisualizationType>) {
            return action.payload;
        }
    },
})

export const selectVisualizationType = (state: RootState) => state.visualizationType;
export const { change_visualization_type } = visualizationTypeSlice.actions;
export default visualizationTypeSlice.reducer;
