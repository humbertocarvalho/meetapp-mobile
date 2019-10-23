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

export default function Meetup({ data, onClick, buttonText }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);
  // TODO Verificar por que não está trazendo certo a imamge.
  return (
    <Container past={data.past}>
      <Banner source={banner} />
      <Info>
        <Title>{data.title}</Title>
        <TextInfo>
          <Icon name={'event'} size={18} />
          {dateParsed}
        </TextInfo>
        <TextInfo>
          <Icon name={'place'} size={18} />
          {data.location}
        </TextInfo>
        <TextInfo>
          <Icon name={'person'} size={18} />
          {`Organizador: ${data.host.name}`}
        </TextInfo>
        {!data.past && (
          <SubmitButton onPress={onClick}>{buttonText}</SubmitButton>
        )}
      </Info>
    </Container>
  );
}
