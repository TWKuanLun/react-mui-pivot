/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import Radio from '@mui/material/Radio';
import IMeasureField, { SummarizeType } from './Shared/Interface/IMeasureField';
import DataFactory from './Shared/DataFactory';
import { useAppDispatch } from './redux/hooks';
import StyledListItemIcon from './Shared/StyledListItemIcon';
import { updateMeasure } from './redux/reducer/pivotSettingSlice';
import StyledListItemButton from './Shared/StyledListItemButton';

interface IProps {
  dataFactory: DataFactory;
  field: IMeasureField;
}

interface IPopoverState {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
}

function MeasureFieldListItem(props: IProps) {
  const dispatch = useAppDispatch();
  const { field } = props;
  const [popoverState, setPopoverState] = React.useState<IPopoverState>({
    anchorEl: null,
    open: false
  });
  const { open, anchorEl } = popoverState;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPopoverState({
      open: true,
      anchorEl: e.currentTarget
    });
  };

  const handleClose = () => {
    setPopoverState({
      open: false,
      anchorEl: null
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field.Summarize === SummarizeType[e.target.name]) {
      return;
    }
    const cloneField: IMeasureField = JSON.parse(JSON.stringify(field));
    cloneField.Summarize = SummarizeType[e.target.name];
    dispatch(updateMeasure(cloneField));
  };

  const handleListItemClick = (summarizeType: string) => {
    if (field.Summarize === SummarizeType[summarizeType]) {
      return;
    }
    const cloneField: IMeasureField = JSON.parse(JSON.stringify(field));
    cloneField.Summarize = SummarizeType[summarizeType];
    dispatch(updateMeasure(cloneField));
  };
  return (
    <ListItem>
      <ListItemText
        primary={`${SummarizeType[field.Summarize]} of ${field.Display}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' onClick={handleClick}>
          <ArrowDropDownIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
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
            <ListItem disablePadding>
              <StyledListItemButton
                onClick={() =>
                  handleListItemClick(SummarizeType[SummarizeType.Average])
                }
              >
                <StyledListItemIcon>
                  <Radio
                    name={SummarizeType[SummarizeType.Average]}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.Summarize === SummarizeType.Average}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText primary={SummarizeType[SummarizeType.Average]} />
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton
                onClick={() =>
                  handleListItemClick(SummarizeType[SummarizeType.Count])
                }
              >
                <StyledListItemIcon>
                  <Radio
                    name={SummarizeType[SummarizeType.Count]}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.Summarize === SummarizeType.Count}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText primary={SummarizeType[SummarizeType.Count]} />
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton
                onClick={() =>
                  handleListItemClick(
                    SummarizeType[SummarizeType.DistinctCount]
                  )
                }
              >
                <StyledListItemIcon>
                  <Radio
                    name={SummarizeType[SummarizeType.DistinctCount]}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.Summarize === SummarizeType.DistinctCount}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText
                  primary={SummarizeType[SummarizeType.DistinctCount]}
                />
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton
                onClick={() =>
                  handleListItemClick(SummarizeType[SummarizeType.Maximun])
                }
              >
                <StyledListItemIcon>
                  <Radio
                    name={SummarizeType[SummarizeType.Maximun]}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.Summarize === SummarizeType.Maximun}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText primary={SummarizeType[SummarizeType.Maximun]} />
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton
                onClick={() =>
                  handleListItemClick(SummarizeType[SummarizeType.Minimun])
                }
              >
                <StyledListItemIcon>
                  <Radio
                    name={SummarizeType[SummarizeType.Minimun]}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.Summarize === SummarizeType.Minimun}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText primary={SummarizeType[SummarizeType.Minimun]} />
              </StyledListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <StyledListItemButton
                onClick={() =>
                  handleListItemClick(SummarizeType[SummarizeType.Sum])
                }
              >
                <StyledListItemIcon>
                  <Radio
                    name={SummarizeType[SummarizeType.Sum]}
                    onChange={handleCheckboxChange}
                    color='primary'
                    checked={field.Summarize === SummarizeType.Sum}
                    disableRipple
                  />
                </StyledListItemIcon>
                <ListItemText primary={SummarizeType[SummarizeType.Sum]} />
              </StyledListItemButton>
            </ListItem>
          </List>
        </Popover>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
export default MeasureFieldListItem;
