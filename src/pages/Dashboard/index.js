import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import api from '~/services/api';
import Header from '~/components/Header';

import { Container, List, DashHeader, Title } from './styles';

function Dashboard({ isFocused }) {
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
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

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

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Header />
      <Container>
        <DashHeader>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon size={36} name="chevron-left" color="#fff" />
          </TouchableOpacity>
          <Title>{dateFormatted}</Title>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon size={36} name="chevron-right" color="#fff" />
          </TouchableOpacity>
        </DashHeader>
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
