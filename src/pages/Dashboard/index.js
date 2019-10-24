import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
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

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('meetups', {
        params: {
          date,
        },
      });

      setMeetups(response.data);
      setLoading(false);
    }
    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]);

  async function handleSubscription(id) {
    const response = await api.post(`registration/${id}`);
    Alert.alert('Sucesso!', 'Você realizou seu registro no Meetup!');
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
        {loading ? (
          <ActivityIndicator size="large" color="#7159c1" />
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onSubmit={() => handleSubscription(item.id)}
                buttonText="Realizar Inscrição"
                data={item}
              />
            )}
          />
        )}
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
