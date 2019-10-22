import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DashHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 34px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
