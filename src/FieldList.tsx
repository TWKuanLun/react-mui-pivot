import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './redux/store';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
//import ListItem from '@material-ui/core/ListItem';

import IField from './Shared/Interface/IField';
import { add_column, remove_column } from './redux/reducer/columns';
import { add_row, remove_row } from './redux/reducer/rows';
import { remove_filter } from './redux/reducer/filters';
import { add_measure, remove_measure } from './redux/reducer/measures';
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

interface IProps extends PropsFromRedux {
    dataFactory: DataFactory;
};

interface ICheckedField extends IField {
    checked: boolean;
};

interface IAllFieldsState {
    [x: string]: ICheckedField;
};

const FieldList = (props: IProps) => {
    const [allFields, setAllFields] = React.useState<IAllFieldsState>({});
    const classes = useStyles();
    React.useEffect(() => {
        const getAllField = async () => {
            try {
                let allFieldList = await props.dataFactory.GetAllFields();
                setAllFields(Object.fromEntries(allFieldList.map(o => [o.Name, { ...o, checked: false }])));
            } catch (e) {
                console.error(e);
            }
        };
        getAllField();
    }, [props.dataFactory]);
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newAllFields = { ...allFields };
        let fieldInterFace = props.dataFactory.GetFieldInterface(newAllFields[e.target.name]);
        let tempIField = newAllFields[e.target.name] as IField;
        if (e.target.checked) {
            switch (fieldInterFace) {
                case FieldInterface.IMeasureField:
                    let tempIMeasureField: IMeasureField = { ...tempIField, Summarize: SummarizeType.Sum };
                    props.add_measure(tempIMeasureField);
                    break;
                case FieldInterface.IFilteredField:
                    let tempIFilteredField: IFilteredField = { ...tempIField, FilterValues: [] };
                    if (props.columns.length >= props.rows.length) {
                        props.add_row(tempIFilteredField);
                    } else {
                        props.add_column(tempIFilteredField);
                    }
                    break;
                default: break;
            }
        }
        else {
            props.remove_row(e.target.name);
            props.remove_column(e.target.name);
            props.remove_filter(e.target.name);
            props.remove_measure(e.target.name);
        }
        newAllFields[e.target.name].checked = e.target.checked;
        setAllFields(newAllFields);
    };
    return (
        <List className={classes.root}>
            {Object.keys(allFields).map((fieldname, i) => (
                <StyledListItem key={i} button alignItems='center'>
                    <StyledListItemIcon>
                        <StyledCheckbox
                            name={fieldname}
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
};

const mapState = (state: RootState) => ({
    rows: state.rows,
    columns: state.columns
})
const connector = connect(mapState, { add_column, add_row, add_measure, remove_column, remove_measure, remove_row, remove_filter });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FieldList)