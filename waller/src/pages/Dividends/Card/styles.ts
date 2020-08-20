import styled from 'styled-components/native';

export const Container = styled.View`
  width: 400px;
  height: 150px;
  margin: 10px;
  background: #ccc;

  position: relative;
  overflow: hidden;
`;

export const Circle = styled.View`
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 40px;

  position: absolute;
  right: -20px;
  bottom: -20px;
`;
