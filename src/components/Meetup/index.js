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
        <TextInfo>
          <Icon name={'event'} size={18} />
          24 de Junho, às 20h
        </TextInfo>
        <TextInfo>
          <Icon name={'place'} size={18} />
          Rua Guilherme Gembala, 260
        </TextInfo>
        <TextInfo>
          <Icon name={'person'} size={18} />
          Organizador: Diego Fernandes
        </TextInfo>
        {!data.past && <SubmitButton>Realizar inscrição</SubmitButton>}
      </Info>
    </Container>
  );
}
