import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';

import { useAppDispatch } from './redux/hooks';
import IFilteredField from './Shared/Interface/IFilteredField';
import DataFactory from './Shared/DataFactory';
import StyledListItem from './Shared/StyledListItem';
import StyledListItemIcon from './Shared/StyledListItemIcon';
import StyledCheckbox from './Shared/StyledCheckbox';

interface IProps {
  updateField: (field: IFilteredField) => {
    type: string;
    payload: IFilteredField;
  };
  dataFactory: DataFactory;
  field: IFilteredField;
}
interface PopoverState {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
}

function FilteredFieldListItem(props: IProps) {
  const dispatch = useAppDispatch();
  const { field, dataFactory, updateField } = props;
  const [values, setValues] = React.useState<string[]>([]);
  const [popoverState, setPopoverState] = React.useState<PopoverState>({
    anchorEl: null,
    open: false
  });

  const callFieldListOfValueApi = async () => {
    const listOfValues = await dataFactory.GetFieldValues(field);
    setValues(listOfValues);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (values.length === 0) {
      callFieldListOfValueApi();
    }
    setPopoverState({
      anchorEl: e.currentTarget,
      open: true
    });
  };

  const handleClose = () => {
    setPopoverState({
      anchorEl: null,
      open: false
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const cloneField: IFilteredField = JSON.parse(JSON.stringify(field));
    if (checked) {
      cloneField.FilterValues.push(e.target.name);
      dispatch(updateField(cloneField));
    } else {
      cloneField.FilterValues = cloneField.FilterValues.filter(
        (x) => x !== e.target.name
      );
      dispatch(updateField(cloneField));
    }
  };

  const handleListItemClick = (value: string) => {
    const cloneField: IFilteredField = JSON.parse(JSON.stringify(field));
    if (field.FilterValues.indexOf(value) === -1) {
      cloneField.FilterValues.push(value);
      dispatch(updateField(cloneField));
    } else {
      cloneField.FilterValues = cloneField.FilterValues.filter(
        (x) => x !== value
      );
      dispatch(updateField(cloneField));
    }
  };
  return (
    <ListItem>
      <ListItemText primary={field.Display} />
      <ListItemSecondaryAction>
        <IconButton edge='end' onClick={handleClick}>
          <ArrowDropDownIcon />
        </IconButton>
        <Popover
          open={popoverState.open}
          anchorEl={popoverState.anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <List>
            {values.map((value) => (
              <StyledListItem
                key={value}
                button
                alignItems='center'
                onClick={() => handleListItemClick(value)}
              >
                <StyledListItemIcon>
                  <StyledCheckbox
                    name={value}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.FilterValues.indexOf(value) !== -1}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText primary={value} />
              </StyledListItem>
            ))}
          </List>
        </Popover>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default FilteredFieldListItem;
