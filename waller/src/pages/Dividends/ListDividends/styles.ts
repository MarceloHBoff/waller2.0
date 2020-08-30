import styled from 'styled-components/native';

import { Metrics, Colors, Fonts } from '#styles';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  height: ${Metrics.height - Metrics.base * 10}px;
  width: ${Metrics.width - Metrics.base * 4}px;
  border-radius: ${Metrics.radius}px;
  padding: ${Metrics.base}px 0;

  background: ${Colors.grayDark};
  position: relative;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${Colors.white};
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.poppinsMedium};
  margin-bottom: ${Metrics.base / 2}px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const Dividend = styled.View`
  flex-direction: row;
  padding: ${Metrics.base / 2}px ${Metrics.base}px;

  border-bottom-width: 1px;
  border-bottom-color: ${Colors.grayDarker};
`;

export const Header = styled(Dividend)`
  background: ${Colors.grayDarker};
`;

export const Text = styled.Text`
  text-align: right;
  color: ${Colors.white};
  font-size: ${Fonts.superSmall}px;
  font-family: ${Fonts.robotoMedium};
`;
