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
  InfoDiv,
} from './styles';

export default function Meetup({ data, onSubmit, buttonText }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  // TODO Verificar por que não está trazendo certo a imamge.
  return (
    <Container past={data.past}>
      <Banner source={{ uri: data.banner.url }} />
      <Info>
        <Title>{data.title}</Title>

        <InfoDiv>
          <Icon name={'event'} size={18} color="#999999" />
          <TextInfo>{dateParsed}</TextInfo>
        </InfoDiv>
        <InfoDiv>
          <Icon name={'place'} size={18} color="#999999" />
          <TextInfo>{data.location}</TextInfo>
        </InfoDiv>
        <InfoDiv>
          <Icon name={'person'} size={18} color="#999999" />
          <TextInfo>{`Organizador: ${data.host.name}`}</TextInfo>
        </InfoDiv>

        {!data.past && (
          <SubmitButton onPress={onSubmit}>{buttonText}</SubmitButton>
        )}
      </Info>
    </Container>
  );
}
