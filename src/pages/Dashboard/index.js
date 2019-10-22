import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import { Container, List } from './styles';
import api from '~/services/api';
import Header from '~/components/Header';

function Dashboard({ isFocused }) {
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

  async function loadMeetups() {
    const response = await api.get('meetups');
    setMeetups(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleSubscription(id) {
    const response = await api.delete(`meetups/${id}`);

    setMeetups(
      meetups.map(a =>
        a.id === id ? { ...a, canceled_at: response.data.canceled_at } : a,
      ),
    );
  }
  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onClick={() => handleSubscription(item.id)}
              buttonText="Realizar Inscrição"
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
