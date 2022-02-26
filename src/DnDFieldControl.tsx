/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableChartIcon from '@mui/icons-material/TableChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import List from '@mui/material/List';
import { useAppSelector } from './redux/hooks';

import {
  updateRow,
  updateColumn,
  updateFilter,
  selectRows,
  selectColumns,
  selectFilters,
  selectMeasures
} from './redux/reducer/pivotSettingSlice';
import FieldList from './FieldList';
import PivotBox from './PivotBox';
import DataFactory from './Shared/DataFactory';
import FilteredFieldListItem from './FilteredFieldListItem';
import MeasureFieldListItem from './MeasureFieldListItem';

interface IProps {
  dataFactory: DataFactory;
}

function DnDFieldControl(props: IProps) {
  const { dataFactory } = props;
  const rows = useAppSelector(selectRows);
  const columns = useAppSelector(selectColumns);
  const filters = useAppSelector(selectFilters);
  const measures = useAppSelector(selectMeasures);
  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
      alignItems='flex-start'
    >
      <Grid item xs={12}>
        <FieldList dataFactory={dataFactory} />
      </Grid>
      <Grid item xs={6}>
        <PivotBox icon={<FilterListIcon />} label='Filter'>
          <List>
            {filters.map((filter) => (
              <FilteredFieldListItem
                key={filter.Name}
                dataFactory={dataFactory}
                field={filter}
                updateField={updateFilter}
              />
            ))}
          </List>
        </PivotBox>
      </Grid>
      <Grid item xs={6}>
        <PivotBox icon={<TableChartIcon />} label='Column'>
          <List>
            {columns.map((column) => (
              <FilteredFieldListItem
                key={column.Name}
                dataFactory={dataFactory}
                field={column}
                updateField={updateColumn}
              />
            ))}
          </List>
        </PivotBox>
      </Grid>
      <Grid item xs={6}>
        <PivotBox icon={<TableChartIcon />} label='Row'>
          <List>
            {rows.map((row) => (
              <FilteredFieldListItem
                key={row.Name}
                dataFactory={dataFactory}
                field={row}
                updateField={updateRow}
              />
            ))}
          </List>
        </PivotBox>
      </Grid>
      <Grid item xs={6}>
        <PivotBox icon={<FunctionsIcon />} label='Measure'>
          <List>
            {measures.map((measure) => (
              <MeasureFieldListItem
                key={measure.Name}
                dataFactory={dataFactory}
                field={measure}
              />
            ))}
          </List>
        </PivotBox>
      </Grid>
    </Grid>
  );
}

export default DnDFieldControl;
