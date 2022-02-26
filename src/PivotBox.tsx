import * as React from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled('div')`
  width: 100%;
  overflow: auto;
  height: 260px;
`;

interface IProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function PivotBox(props: IProps) {
  const { icon, label, children } = props;
  return (
    <div>
      <div>
        {icon}
        {label}
      </div>
      <StyledDiv>{children}</StyledDiv>
    </div>
  );
}

export default PivotBox;
