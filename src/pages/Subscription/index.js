import React, { useState } from 'react';
import { View } from 'react-native';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, List } from './styles';

export default function Subscription() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([
    {
      past: false,
      provider: { name: 'Humberto' },
      date: '01/01/2010 10:00:00',
      id: 1,
    },
    {
      past: false,
      provider: { name: 'Humberto' },
      date: '01/01/2010 10:00:00',
      id: 1,
    },
  ]);

  function handleCancel() {}

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onClick={() => handleCancel(item.id)}
              buttonText="Cancelar Inscrição"
              data={item}
            />
          )}
        />
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
