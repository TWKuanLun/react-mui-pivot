import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';

import IFilteredField from './Shared/Interface/IFilteredField';
import DataFactory from './Shared/DataFactory';
import StyledListItem from './Shared/StyledListItem';
import StyledListItemIcon from './Shared/StyledListItemIcon';
import StyledCheckbox from './Shared/StyledCheckbox';

interface IProps {
    updateField: (field: IFilteredField) => {
        type: string;
        payload: IFilteredField;
    }
    dataFactory: DataFactory;
    field: IFilteredField;
};

interface IState {
    values: string[];
    anchorEl: HTMLButtonElement | null;
    open: boolean;
}
class FilteredFieldListItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            values: [],
            anchorEl: null,
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    async callFieldListOfValueApi() {
        const { dataFactory, field } = this.props;
        let listOfValues = await dataFactory.GetFieldValues(field);
        this.setState({
            values: listOfValues
        });
    }
    handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { values } = this.state;
        if (values.length === 0) {
            this.callFieldListOfValueApi();
        }
        this.setState({
            open: true,
            anchorEl: e.currentTarget
        });
    }
    handleClose() {
        this.setState({
            open: false,
            anchorEl: null
        });
    }
    handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        const { field, updateField } = this.props;
        let cloneField: IFilteredField = JSON.parse(JSON.stringify(field));
        if(checked){
            cloneField.FilterValues.push(e.target.name);
            updateField(cloneField);
        }else{
            cloneField.FilterValues = cloneField.FilterValues.filter(x => x !== e.target.name);
            updateField(cloneField);
        }
    }
    handleListItemClick(value: string){
        const { field, updateField } = this.props;
        let cloneField: IFilteredField = JSON.parse(JSON.stringify(field));
        if(field.FilterValues.indexOf(value) === -1){
            cloneField.FilterValues.push(value);
            updateField(cloneField);
        }else{
            cloneField.FilterValues = cloneField.FilterValues.filter(x => x !== value);
            updateField(cloneField);
        }
    }
    render() {
        const { field } = this.props;
        const { open, anchorEl, values } = this.state;
        return (
            <ListItem>
                <ListItemText primary={field.Display} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={this.handleClick}>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <List>
                            {values.map((value, i) => (
                                <StyledListItem key={i} button alignItems='center' onClick={()=> this.handleListItemClick(value)}>
                                    <StyledListItemIcon>
                                        <StyledCheckbox
                                            name={value}
                                            onChange={this.handleCheckboxChange}
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
}

export default FilteredFieldListItem;