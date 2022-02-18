import * as React from 'react';
import DataFactory from './Shared/DataFactory';
import { useAppSelector } from './redux/hooks';
import {
  selectColumns,
  selectRows,
  selectMeasures,
  selectFilters
} from './redux/reducer/pivotSettingSlice';

interface IProps {
  dataFactory: DataFactory;
}

function PivotTable(props: IProps) {
  const { dataFactory } = props;
  const rows = useAppSelector(selectRows);
  const columns = useAppSelector(selectColumns);
  const filters = useAppSelector(selectFilters);
  const measures = useAppSelector(selectMeasures);
  const [pivotData, setPivotData] = React.useState<any>(null);
  React.useEffect(() => {
    const getData = async () => {
      const data = await dataFactory.GetData(rows, columns, measures, filters);
      setPivotData(data);
    };
    getData();
  }, [rows, columns, filters, measures, dataFactory]);
  console.log('pivotData', pivotData);
  return <div />;
}

export default PivotTable;
