import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
  width: 335px;
  height: 345px;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  width: 335px;
  height: 150px;
  border-radius: 4px;
`;

export const Info = styled.View`
  margin-top: 20px;
  margin-left: 18px;
  align-items: baseline;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const TextInfo = styled.Text`
  font-size: 13px;
  color: #999999;
  margin-top: 9px;
`;

export const SubmitButton = styled(Button)`
  width: 295px;
  height: 40px;
  margin-top: 10px;
`;
