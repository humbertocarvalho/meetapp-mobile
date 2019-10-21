import React, { useMemo } from 'react';
import banner from '~/assets/banner.png';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Title,
  Info,
  SubmitButton,
  TextInfo,
} from './styles';

export default function Meetup({ data, onCancel }) {
  // const dateParsed = useMemo(() => {
  //   return formatRelative(parseISO(data.date), new Date(), {
  //     locale: pt,
  //     addSuffix: true,
  //   });
  // }, [data.date]);
  // TODO Verificar por que não está trazendo certo a imamge.
  return (
    <Container past={data.past}>
      <Banner source={banner} />
      <Info>
        <Title>Meetup de React Native</Title>
        <TextInfo>24 de Junho, às 20h</TextInfo>
        <SubmitButton>Realizar inscrição</SubmitButton>
      </Info>

      {/* {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )} */}
    </Container>
  );
}
