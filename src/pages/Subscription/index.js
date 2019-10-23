import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, List } from './styles';

export default function Subscription({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('registration');

      const meetupsFormatted = response.data.map(meetup => meetup.meetup);

      setMeetups(meetupsFormatted);
      setLoading(false);
    }
    loadSubscriptions();
  }, [isFocused]);

  function handleCancel() {}

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator size="large" color="#7159c1" />
        ) : (
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
        )}
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
