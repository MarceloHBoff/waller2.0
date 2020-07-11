import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../styles';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const Header = styled.View`
  height: 80px;
  border-bottom-left-radius: ${Metrics.radius * 2}px;
  border-bottom-right-radius: ${Metrics.radius * 2}px;
  background: ${Colors.primarySuperDark};
`;

export const HeaderText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.regular}px;
  font-family: ${Fonts.poppinsMedium};
  padding: ${Metrics.base}px;
`;

export const Cards = styled.ScrollView`
  max-height: 220px;
`;

export const Card = styled.View`
  border-radius: ${Metrics.radius}px;
  background: ${Colors.gray};
  margin: ${Metrics.base}px;
  padding: ${Metrics.base}px;

  width: 200px;
  height: 200px;

  justify-content: center;
  align-items: center;
`;

export const CardTitle = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.regular}px;
  font-family: ${Fonts.poppinsMedium};
`;

export const CardValue = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.regular}px;
  font-family: ${Fonts.poppinsMedium};
`;
