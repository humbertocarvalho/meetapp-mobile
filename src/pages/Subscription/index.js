import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, List } from './styles';

function Subscription({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    setLoading(true);
    const response = await api.get('registration');

    const meetupsFormatted = response.data.map(meetup => {
      return { ...meetup.meetup, registrationId: meetup.id };
    });

    setMeetups(meetupsFormatted);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`registration/${id}`);
      Alert.alert('Sucesso!', 'Você cancelou seu registro no Meetup!');
      loadSubscriptions();
    } catch (err) {
      const responseError = err.response.data;
      Alert.alert(
        'Erro :(',
        responseError && responseError.error
          ? `Erro ao cancelar seu registro no Meetup: ${responseError.error}`
          : 'Erro ao cancelar seu registro no Meetup, tente novamente!',
      );
    }
  }

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
                onSubmit={() => handleCancel(item.registrationId)}
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

export default withNavigationFocus(Subscription);
