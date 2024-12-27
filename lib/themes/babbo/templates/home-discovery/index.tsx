import {EventCard, ResultMessage } from '@/components';
import { Grid, GridItem, Heading, Stack } from '@chakra-ui/react';

import { EventInterface } from '@/types';
import eventsMock from './discovery.json';
import _ from 'lodash';
import { useEvent } from '@/hooks';

const mediaSizes = {
  320: { slidesPerView: 1.3, spaceBetween: 10 },
  480: { slidesPerView: 1.3, spaceBetween: 5 },
  640: { slidesPerView: 5, spaceBetween: 30 },
  1366: { slidesPerView: 4, spaceBetween: 20 },
};

export function HomeDiscovery({ dataDiscovery }: {
  dataDiscovery: EventInterface[] | null;
}) {
  eventsMock;

  const renderWithAdSense = (event: EventInterface, index: number) => {
    if (index > 0 && index % 10 === 0) {
      return (

        <GridItem key={`${index}-${event.uuid}`} >
          <EventCard {...event} />
        </GridItem>

      );
    } else {
      return (
        <GridItem overflow={'hidden'} key={`${index}-${event.uuid}`}>
          <EventCard {...event} />
        </GridItem>
      );
    }
  };

  // if (dataDiscovery === null) return <></>

  if (dataDiscovery?.length === 0) return <ResultMessage
    title='Nenhum evento encontrado'
  />;

  return (
    <Stack spacing='8' className='app-wrapper'>
      <div>
        <Heading fontWeight={'300'} size={'lg'}>Os melhores eventos da sua região em um só lugar</Heading>
      </div>
      <Grid templateColumns={{
        lg: 'repeat(5, minmax(0, 1fr))',
        md: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(1, minmax(0, 1fr))',
      }}
        gap={4}>
        {dataDiscovery?.map((event, index) => renderWithAdSense(event, index))}
      </Grid>
    </Stack>
  );
}
