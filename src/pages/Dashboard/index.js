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
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  /* INFINITY SCROLL */
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

  async function loadMeetups(currentPage = 1) {
    if (currentPage > 1 && !hasMore) {
      return;
    }

    const response = await api.get('meetups', {
      params: {
        date,
        page: currentPage,
      },
    });

    setMeetups(
      currentPage > 1
        ? [...meetups, ...response.data.rows]
        : response.data.rows,
    );
    setHasMore(response.data.totalPages > currentPage);
    setPage(currentPage);

    setLoading(false);
  }
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMeetups();
    }
  }, [date, isFocused]); // eslint-disable-line

  async function handleSubscription(id) {
    try {
      await api.post(`registration/${id}`);
      Alert.alert('Sucesso!', 'Você realizou seu registro no Meetup!');
    } catch (err) {
      const responseError = err.response.data;
      Alert.alert(
        'Erro :(',
        responseError && responseError.error
          ? `Erro ao se registrar no Meetup: ${responseError.error}`
          : 'Erro ao se registrar no Meetup, tente novamente!',
      );
    }
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
            onRefresh={loadMeetups}
            refreshing={refreshing}
            onEndReached={() => loadMeetups(page + 1)}
            onEndReachedThreshold={0.2}
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
