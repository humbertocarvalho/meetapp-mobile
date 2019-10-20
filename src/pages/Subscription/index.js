import React, { useState } from 'react';
import { View } from 'react-native';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Meetup, Banner, Title, SubmitButton } from './styles';

export default function Subscription() {
  const [loading, setLoading] = useState(true);

  function handleSubmit() {}

  return (
    <Background>
      <Header />
      <Container>
        <Meetup>
          <Banner />
          <Title />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Realizar inscrição
          </SubmitButton>
        </Meetup>
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
