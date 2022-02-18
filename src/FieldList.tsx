/* eslint-disable no-case-declarations */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import IField from './Shared/Interface/IField';
import {
  addColumn,
  removeColumn,
  selectColumns,
  addRow,
  removeRow,
  selectRows,
  removeFilter,
  addMeasure,
  removeMeasure
} from './redux/reducer/pivotSettingSlice';
import FieldInterface from './Shared/Interface/FieldInterface';
import IMeasureField, { SummarizeType } from './Shared/Interface/IMeasureField';
import IFilteredField from './Shared/Interface/IFilteredField';
import DataFactory from './Shared/DataFactory';
import StyledListItem from './Shared/StyledListItem';
import StyledListItemIcon from './Shared/StyledListItemIcon';
import StyledCheckbox from './Shared/StyledCheckbox';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    overflow: 'auto',
    maxHeight: 300
  },
  listItemRoot: {
    paddingTop: 0,
    paddingBottom: 0
  },
  listItemIconRoot: {
    minWidth: 34
  },
  checkboxRoot: {
    padding: 0
  }
});

interface IProps {
  dataFactory: DataFactory;
}

interface ICheckedField extends IField {
  checked: boolean;
}

interface IAllFieldsState {
  [x: string]: ICheckedField;
}

function FieldList(props: IProps) {
  const { dataFactory } = props;
  const [allFields, setAllFields] = React.useState<IAllFieldsState>({});
  const rows = useAppSelector(selectRows);
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  React.useEffect(() => {
    const getAllField = async () => {
      try {
        const allFieldList = await dataFactory.GetAllFields();
        setAllFields(
          Object.fromEntries(
            allFieldList.map((o) => [o.Name, { ...o, checked: false }])
          )
        );
      } catch (e) {
        console.error(e);
      }
    };
    getAllField();
  }, [dataFactory]);

  const fieldCheck = (fieldName: string) => {
    const newAllFields = { ...allFields };
    const fieldInterFace = dataFactory.GetFieldInterface(
      newAllFields[fieldName]
    );
    const tempIField = newAllFields[fieldName] as IField;
    const nextChecked = !allFields[fieldName].checked;
    if (nextChecked) {
      switch (fieldInterFace) {
        case FieldInterface.IMeasureField:
          const tempIMeasureField: IMeasureField = {
            ...tempIField,
            Summarize: SummarizeType.Sum
          };
          dispatch(addMeasure(tempIMeasureField));
          break;
        case FieldInterface.IFilteredField:
          const tempIFilteredField: IFilteredField = {
            ...tempIField,
            FilterValues: []
          };
          console.log('tempIFilteredField', tempIFilteredField);
          if (columns.length >= rows.length) {
            dispatch(addRow(tempIFilteredField));
          } else {
            dispatch(addColumn(tempIFilteredField));
          }
          break;
        default:
          break;
      }
    } else {
      dispatch(removeRow(fieldName));
      dispatch(removeColumn(fieldName));
      dispatch(removeFilter(fieldName));
      dispatch(removeMeasure(fieldName));
    }
    newAllFields[fieldName].checked = nextChecked;
    setAllFields(newAllFields);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldCheck(e.target.name);
  };
  const handleListItemClick = (fieldname: string) => {
    fieldCheck(fieldname);
  };
  return (
    <List className={classes.root}>
      {Object.keys(allFields).map((fieldname) => (
        <StyledListItem
          key={fieldname}
          button
          alignItems='center'
          onClick={() => handleListItemClick(fieldname)}
        >
          <StyledListItemIcon>
            <StyledCheckbox
              name={fieldname}
              onClick={(e) => e.stopPropagation()}
              onChange={handleCheckboxChange}
              color='primary'
              checked={allFields[fieldname].checked}
              disableRipple
            />
          </StyledListItemIcon>
          <ListItemText primary={allFields[fieldname].Display} />
        </StyledListItem>
      ))}
    </List>
  );
}

export default FieldList;
