import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const StyledCheckbox = withStyles({
  root: {
    padding: 0
  }
})(Checkbox);

export default StyledCheckbox;
