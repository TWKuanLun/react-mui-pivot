import * as React from 'react';
import { Grid } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableChartIcon from '@material-ui/icons/TableChart';
import FunctionsIcon from '@material-ui/icons/Functions';
import List from '@material-ui/core/List';

import { useAppSelector } from './redux/hooks';
import FieldList from './FieldList';
import PivotBox from './PivotBox';
import DataFactory from './Shared/DataFactory';
import FilteredFieldListItem from './FilteredFieldListItem';
import MeasureFieldListItem from './MeasureFieldListItem';

interface IProps {
    dataFactory: DataFactory
};

const DnDFieldControl = (props: IProps) => {
    const { dataFactory } = props;
    const rows = useAppSelector((state) => state.rows);
    const columns = useAppSelector((state) => state.columns);
    const filters = useAppSelector((state) => state.filters);
    const measures = useAppSelector((state) => state.measures);
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
                        {filters.map(filter => <FilteredFieldListItem key={filter.Name} field={filter} />)}
                    </List>
                </PivotBox>
            </Grid>
            <Grid item xs={6}>
                <PivotBox icon={<TableChartIcon />} label='Column'>
                    <List>
                        {columns.map(column => <FilteredFieldListItem key={column.Name} field={column} />)}
                    </List>
                </PivotBox>
            </Grid>
            <Grid item xs={6}>
                <PivotBox icon={<TableChartIcon />} label='Row'>
                    <List>
                        {rows.map(row => <FilteredFieldListItem key={row.Name} field={row} />)}
                    </List>
                </PivotBox>
            </Grid>
            <Grid item xs={6}>
                <PivotBox icon={<FunctionsIcon />} label='Measure'>
                    <List>
                        {measures.map(measure => <MeasureFieldListItem key={measure.Name} field={measure} />)}
                    </List>
                </PivotBox>
            </Grid>
        </Grid>
    );
};

export default DnDFieldControl;