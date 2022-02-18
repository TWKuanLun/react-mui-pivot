import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const StyledListItemIcon = withStyles({
  root: {
    minWidth: 34
  }
})(ListItemIcon);

export default StyledListItemIcon;
