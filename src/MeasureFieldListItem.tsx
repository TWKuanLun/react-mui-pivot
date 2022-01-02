import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';

import IMeasureField from './Shared/Interface/IMeasureField';
import DataFactory from './Shared/DataFactory';
import { SummarizeType } from './Shared/Interface/IMeasureField';
import StyledListItem from './Shared/StyledListItem';
import StyledListItemIcon from './Shared/StyledListItemIcon';
import { update_measure } from './redux/reducer/measures';
import Radio from '@material-ui/core/Radio';

interface IProps extends PropsFromRedux {
    dataFactory: DataFactory;
    field: IMeasureField;
};

interface IState {
    anchorEl: HTMLButtonElement | null;
    open: boolean;
}

class MeasureFieldListItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
    handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { field, update_measure } = this.props;
        if(field.Summarize === SummarizeType[e.target.name]){
            return;
        }
        let cloneField: IMeasureField = JSON.parse(JSON.stringify(field));
        cloneField.Summarize = SummarizeType[e.target.name];
        update_measure(cloneField);
    }
    handleListItemClick(summarizeType: string){
        const { field, update_measure } = this.props;
        if(field.Summarize === SummarizeType[summarizeType]){
            return;
        }
        let cloneField: IMeasureField = JSON.parse(JSON.stringify(field));
        cloneField.Summarize = SummarizeType[summarizeType];
        update_measure(cloneField);
    }
    render() {
        const { field } = this.props;
        const { open, anchorEl } = this.state;
        return (
            <ListItem>
                <ListItemText primary={`${SummarizeType[field.Summarize]} of ${field.Display}`} />
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
                            <StyledListItem button alignItems='center' onClick={()=> this.handleListItemClick(SummarizeType[SummarizeType.Average])}>
                                <StyledListItemIcon>
                                    <Radio
                                        name={SummarizeType[SummarizeType.Average]}
                                        onChange={this.handleCheckboxChange}
                                        color='primary'
                                        checked={field.Summarize === SummarizeType.Average}
                                        disableRipple
                                    />
                                </StyledListItemIcon>
                                <ListItemText primary={SummarizeType[SummarizeType.Average]} />
                            </StyledListItem>
                            <StyledListItem button alignItems='center' onClick={()=> this.handleListItemClick(SummarizeType[SummarizeType.Count])}>
                                <StyledListItemIcon>
                                    <Radio
                                        name={SummarizeType[SummarizeType.Count]}
                                        onChange={this.handleCheckboxChange}
                                        color='primary'
                                        checked={field.Summarize === SummarizeType.Count}
                                        disableRipple
                                    />
                                </StyledListItemIcon>
                                <ListItemText primary={SummarizeType[SummarizeType.Count]} />
                            </StyledListItem>
                            <StyledListItem button alignItems='center' onClick={()=> this.handleListItemClick(SummarizeType[SummarizeType.DistinctCount])}>
                                <StyledListItemIcon>
                                    <Radio
                                        name={SummarizeType[SummarizeType.DistinctCount]}
                                        onChange={this.handleCheckboxChange}
                                        color='primary'
                                        checked={field.Summarize === SummarizeType.DistinctCount}
                                        disableRipple
                                    />
                                </StyledListItemIcon>
                                <ListItemText primary={SummarizeType[SummarizeType.DistinctCount]} />
                            </StyledListItem>
                            <StyledListItem button alignItems='center' onClick={()=> this.handleListItemClick(SummarizeType[SummarizeType.Maximun])}>
                                <StyledListItemIcon>
                                    <Radio
                                        name={SummarizeType[SummarizeType.Maximun]}
                                        onChange={this.handleCheckboxChange}
                                        color='primary'
                                        checked={field.Summarize === SummarizeType.Maximun}
                                        disableRipple
                                    />
                                </StyledListItemIcon>
                                <ListItemText primary={SummarizeType[SummarizeType.Maximun]} />
                            </StyledListItem>
                            <StyledListItem button alignItems='center' onClick={()=> this.handleListItemClick(SummarizeType[SummarizeType.Minimun])}>
                                <StyledListItemIcon>
                                    <Radio
                                        name={SummarizeType[SummarizeType.Minimun]}
                                        onChange={this.handleCheckboxChange}
                                        color='primary'
                                        checked={field.Summarize === SummarizeType.Minimun}
                                        disableRipple
                                    />
                                </StyledListItemIcon>
                                <ListItemText primary={SummarizeType[SummarizeType.Minimun]} />
                            </StyledListItem>
                            <StyledListItem button alignItems='center' onClick={()=> this.handleListItemClick(SummarizeType[SummarizeType.Sum])}>
                                <StyledListItemIcon>
                                    <Radio
                                        name={SummarizeType[SummarizeType.Sum]}
                                        onChange={this.handleCheckboxChange}
                                        color='primary'
                                        checked={field.Summarize === SummarizeType.Sum}
                                        disableRipple
                                    />
                                </StyledListItemIcon>
                                <ListItemText primary={SummarizeType[SummarizeType.Sum]} />
                            </StyledListItem>
                        </List>
                    </Popover>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
};

const connector = connect(null, { update_measure });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MeasureFieldListItem);