import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  body: {
    width: '100%',
    overflow: 'auto',
    height: 260
  }
});

interface IProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function PivotBox(props: IProps) {
  const { icon, label, children } = props;
  const classes = useStyles();
  return (
    <div>
      <div>
        {icon}
        {label}
      </div>
      <div className={classes.body}>{children}</div>
    </div>
  );
}

export default PivotBox;
