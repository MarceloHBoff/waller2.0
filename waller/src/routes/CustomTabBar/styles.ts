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

  overflow: visible;
`;

interface TabProps {
  index: number;
  active: boolean;
}

export const Tab = styled.TouchableOpacity<TabProps>`
  flex: 1;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  ${props =>
    props.index === 2 &&
    css`
      margin-top: -5px;
      height: 50px;
      border-radius: 25px;
      border-width: 3px;
      border-color: ${Colors.grayDarker};
      background: ${Colors.grayDark};
    `}

  ${props =>
    props.active &&
    css`
      border-color: ${Colors.primaryDark};
      background: ${Colors.primaryDark};
    `}
`;
