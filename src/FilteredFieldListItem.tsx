import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import IFilteredField from './Shared/Interface/IFilteredField';

interface IProps {
    field: IFilteredField
};

const FilteredFieldListItem = (props: IProps) => {
    const { field } = props;
    return (
        <ListItem>
            <ListItemText primary={field.Display} />
            <ListItemSecondaryAction>
                <IconButton edge="end">
                    <ArrowDropDownIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default FilteredFieldListItem;