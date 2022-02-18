/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMeasureField from '../../Shared/Interface/IMeasureField';
import IFilteredField from '../../Shared/Interface/IFilteredField';
import IField from '../../Shared/Interface/IField';
import VisualizationType from '../../Shared/VisualizationType';
import { RootState } from '../store';

export interface IPivotConfig {
  filters: IFilteredField[];
  columns: IFilteredField[];
  rows: IFilteredField[];
  measures: IMeasureField[];
  visualizationType:
    | 'table'
    | 'lineChart'
    | 'barChart'
    | 'columnChart'
    | 'stackBarChart'
    | 'stackColumnChart';
}

const initialState: IPivotConfig = {
  filters: [],
  columns: [],
  rows: [],
  measures: [],
  visualizationType: 'table'
};

const updateField = <TWritableDraftConfig, T extends IField>(
  state: TWritableDraftConfig,
  configName: keyof IPivotConfig,
  field: T
) => {
  const configNameStr = configName as string;
  const shallowCloneArray = [...state[configNameStr]];
  const index = shallowCloneArray.map((x) => x.Name).indexOf(field.Name);
  if (index !== -1) {
    shallowCloneArray.splice(index, 1, field);
    state[configNameStr] = shallowCloneArray;
  }
};
const addField = <TWritableDraftConfig, T extends IField>(
  state: TWritableDraftConfig,
  configName: keyof IPivotConfig,
  field: T
) => {
  const configNameStr = configName as string;
  state[configNameStr] = [...state[configNameStr], field];
};
const removeField = <TWritableDraftConfig>(
  state: TWritableDraftConfig,
  configName: keyof IPivotConfig,
  fieldName: string
) => {
  const configNameStr = configName as string;
  if (state[configNameStr].some((x: IField) => x.Name === fieldName)) {
    state[configNameStr] = state[configNameStr].filter(
      (x: IField) => x.Name !== fieldName
    );
  }
};

const pivotConfigSlice = createSlice({
  name: 'pivotConfig',
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<IFilteredField>) {
      updateField(state, 'filters', action.payload);
    },
    addFilter(state, action: PayloadAction<IFilteredField>) {
      addField(state, 'filters', action.payload);
    },
    removeFilter(state, action: PayloadAction<string>) {
      removeField(state, 'filters', action.payload);
    },
    updateRow(state, action: PayloadAction<IFilteredField>) {
      updateField(state, 'rows', action.payload);
    },
    addRow(state, action: PayloadAction<IFilteredField>) {
      addField(state, 'rows', action.payload);
    },
    removeRow(state, action: PayloadAction<string>) {
      removeField(state, 'rows', action.payload);
    },
    updateColumn(state, action: PayloadAction<IFilteredField>) {
      updateField(state, 'columns', action.payload);
    },
    addColumn(state, action: PayloadAction<IFilteredField>) {
      addField(state, 'columns', action.payload);
    },
    removeColumn(state, action: PayloadAction<string>) {
      removeField(state, 'columns', action.payload);
    },
    updateMeasure(state, action: PayloadAction<IMeasureField>) {
      updateField(state, 'measures', action.payload);
    },
    addMeasure(state, action: PayloadAction<IMeasureField>) {
      addField(state, 'measures', action.payload);
    },
    removeMeasure(state, action: PayloadAction<string>) {
      removeField(state, 'measures', action.payload);
    },
    changeVisualizationType(state, action: PayloadAction<VisualizationType>) {
      state.visualizationType = action.payload;
    }
  }
});

export const selectFilters = (state: RootState) => state.pivotSetting.filters;
export const selectColumns = (state: RootState) => state.pivotSetting.columns;
export const selectRows = (state: RootState) => state.pivotSetting.rows;
export const selectMeasures = (state: RootState) => state.pivotSetting.measures;
export const selectVisualizationType = (state: RootState) =>
  state.pivotSetting.visualizationType;
export const {
  addFilter,
  updateFilter,
  removeFilter,
  addColumn,
  updateColumn,
  removeColumn,
  addRow,
  updateRow,
  removeRow,
  updateMeasure,
  addMeasure,
  removeMeasure,
  changeVisualizationType
} = pivotConfigSlice.actions;
export default pivotConfigSlice.reducer;
