import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const StyledListItem = withStyles({
    root: {
        paddingTop: 0,
        paddingBottom: 0
    },
})(ListItem);

export default StyledListItem;