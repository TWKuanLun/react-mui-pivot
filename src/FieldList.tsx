import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import IField from './Shared/Interface/IField';
import { add_column, remove_column, selectColumns } from './redux/reducer/columns';
import { add_row, remove_row, selectRows } from './redux/reducer/rows';
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

interface IProps {
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
    const rows = useAppSelector(selectRows);
    const columns = useAppSelector(selectColumns);
    const dispatch = useAppDispatch();
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
        fieldCheck(e.target.name);
    };
    const handleListItemClick = (fieldname: string) => {
        fieldCheck(fieldname);
    };
    const fieldCheck = (fieldName: string) => {
        let newAllFields = { ...allFields };
        let fieldInterFace = props.dataFactory.GetFieldInterface(newAllFields[fieldName]);
        let tempIField = newAllFields[fieldName] as IField;
        let nextChecked = !allFields[fieldName].checked;
        if (nextChecked) {
            switch (fieldInterFace) {
                case FieldInterface.IMeasureField:
                    let tempIMeasureField: IMeasureField = { ...tempIField, Summarize: SummarizeType.Sum };
                    dispatch(add_measure(tempIMeasureField));
                    break;
                case FieldInterface.IFilteredField:
                    let tempIFilteredField: IFilteredField = { ...tempIField, FilterValues: [] };
                    if (columns.length >= rows.length) {
                        dispatch(add_row(tempIFilteredField));
                    } else {
                        dispatch(add_column(tempIFilteredField));
                    }
                    break;
                default: break;
            }
        }
        else {
            dispatch(remove_row(fieldName));
            dispatch(remove_column(fieldName));
            dispatch(remove_filter(fieldName));
            dispatch(remove_measure(fieldName));
        }
        newAllFields[fieldName].checked = nextChecked;
        setAllFields(newAllFields);
    };
    return (
        <List className={classes.root}>
            {Object.keys(allFields).map((fieldname, i) => (
                <StyledListItem key={i} button alignItems='center' onClick={()=>handleListItemClick(fieldname)}>
                    <StyledListItemIcon>
                        <StyledCheckbox
                            name={fieldname}
                            onClick={(e)=>e.stopPropagation()}
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

export default FieldList;