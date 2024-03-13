import Layout from '@/layouts';
import { useEvent } from '@/hooks';
import { Suspense, useEffect } from 'react';
import CategoryCollection from './CategoryCollection';
import trips from './CategoryCollection/trips-by-category.json'
import { Container } from 'react-grid-system';
import { EventCard, EventCardFeatured } from '@/components';

export function Index() {

  const { fetchEvents, loading } = useEvent();
 
  useEffect(() => {
    fetchEvents().then(resposne => console.log(resposne))
  },[])

  // console.log(events, 'eventseventsevents')
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.none file.
   */
  return (
   <Layout name={'client'}>
      <EventCardFeatured />
     <CategoryCollection data={trips} />
   </Layout>

  );
}

export default Index;
