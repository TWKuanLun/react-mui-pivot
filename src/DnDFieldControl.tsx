import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './redux/store';
import { Grid } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableChartIcon from '@material-ui/icons/TableChart';
import FunctionsIcon from '@material-ui/icons/Functions';
import List from '@material-ui/core/List';

import { update_row } from './redux/reducer/rows';
import { update_column } from './redux/reducer/columns';
import { update_filter } from './redux/reducer/filters';
import FieldList from './FieldList';
import PivotBox from './PivotBox';
import DataFactory from './Shared/DataFactory';
import FilteredFieldListItem from './FilteredFieldListItem';
import MeasureFieldListItem from './MeasureFieldListItem';

interface IProps extends PropsFromRedux {
    dataFactory: DataFactory
};

const DnDFieldControl = (props: IProps) => {
    const { dataFactory, rows, columns, filters, measures, update_column, update_filter, update_row } = props;
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
                        {filters.map(filter => <FilteredFieldListItem key={filter.Name} dataFactory={dataFactory} field={filter} updateField={update_filter} />)}
                    </List>
                </PivotBox>
            </Grid>
            <Grid item xs={6}>
                <PivotBox icon={<TableChartIcon />} label='Column'>
                    <List>
                        {columns.map(column => <FilteredFieldListItem key={column.Name} dataFactory={dataFactory} field={column} updateField={update_column} />)}
                    </List>
                </PivotBox>
            </Grid>
            <Grid item xs={6}>
                <PivotBox icon={<TableChartIcon />} label='Row'>
                    <List>
                        {rows.map(row => <FilteredFieldListItem key={row.Name} dataFactory={dataFactory} field={row} updateField={update_row} />)}
                    </List>
                </PivotBox>
            </Grid>
            <Grid item xs={6}>
                <PivotBox icon={<FunctionsIcon />} label='Measure'>
                    <List>
                        {measures.map(measure => <MeasureFieldListItem key={measure.Name} dataFactory={dataFactory} field={measure} />)}
                    </List>
                </PivotBox>
            </Grid>
        </Grid>
    );
};

const mapState = (state: RootState) => ({
    rows: state.rows,
    columns: state.columns,
    filters: state.filters,
    measures: state.measures
})
const connector = connect(mapState, { update_row, update_column, update_filter });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DnDFieldControl);