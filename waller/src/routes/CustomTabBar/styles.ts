import styled, { css } from 'styled-components/native';

import { Colors } from '#styles';

export const TabContainer = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: center;

  height: 40px;
  background: ${Colors.grayDark};
  border-radius: 10px;
  margin: 8px 4px;
`;

interface TabProps {
  active: boolean;
}

export const Tab = styled.TouchableOpacity<TabProps>`
  flex: 1;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  ${props =>
    props.active &&
    css`
      background: ${Colors.primaryDark};
    `}
`;
