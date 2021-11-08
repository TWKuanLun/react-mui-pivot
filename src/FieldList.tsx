import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import DataFactory from './Shared/DataFactory';
import IField from './Shared/Interface/IField';

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

interface Props {
    dataFactory: DataFactory
};

interface ICheckedField extends IField {
    checked: boolean
};

interface IAllFieldsState {
    [x: string]: ICheckedField
};

const FieldList = (props: Props) => {
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
        console.debug('FieldList: GetAllFields');
        getAllField();
    }, [props.dataFactory]);
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newAllFields = {...allFields};
        newAllFields[e.target.name].checked = e.target.checked;
        setAllFields(newAllFields);
    };
    return (
        <List className={classes.root}>
            {Object.keys(allFields).map((fieldname, i) => (
                <ListItem key={i} classes={{ root: classes.listItemRoot }}>
                    <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                        <Checkbox
                            name={fieldname}
                            onChange={handleCheckboxChange}
                            color='primary'
                            classes={{ root: classes.checkboxRoot }}
                            checked={allFields[fieldname].checked}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={allFields[fieldname].Display} />
                </ListItem>
            ))}
        </List>
    );
};

export default FieldList;