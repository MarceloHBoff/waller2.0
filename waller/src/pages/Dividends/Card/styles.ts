import styled from 'styled-components/native';

import { Colors } from '#styles';

export const Container = styled.View`
  flex: 1;
  max-height: 150px;
  margin: 16px 24px;

  background: ${Colors.primary};
  border-radius: 8px;

  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
`;

export const Top = styled.View`
  height: 50%;
  width: 50%;
  position: relative;
`;

export const Bottom = styled.View`
  height: 50%;
  width: 50%;
  margin-left: auto;
  position: relative;
`;

export const TopCircle = styled.View`
  width: 120px;
  height: 120px;
  background: ${Colors.primaryDarker}cc;
  border-radius: 60px;

  position: absolute;
  left: -40px;
  top: -40px;
`;

export const TopSubCircle = styled.View`
  width: 80px;
  height: 80px;
  background: ${Colors.primary};
  border-radius: 40px;

  position: absolute;
  left: -22px;
  top: -22px;
`;

export const BottomCircle = styled.View`
  width: 120px;
  height: 120px;
  background: ${Colors.primaryDarker}cc;
  border-radius: 60px;

  position: absolute;
  right: -40px;
  bottom: -40px;
`;

export const BottomSubCircle = styled.View`
  width: 80px;
  height: 80px;
  background: ${Colors.primary};
  border-radius: 40px;

  position: absolute;
  right: -22px;
  bottom: -22px;
`;
