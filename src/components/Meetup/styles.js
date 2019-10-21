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
`;

export const Info = styled.View`
  margin-top: 20px;
  margin-left: 18px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const TextInfo = styled.Text``;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;

export const SubmitButton = styled(Button)`
  width: 295px;
  height: 40px;
  margin-top: 5px;
`;
