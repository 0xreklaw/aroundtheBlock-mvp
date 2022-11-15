import Layout from '../components/Layout';
import EventsList from '../components/EventsList';
import { useContext, useEffect, useState } from 'react';
import FilterByLocation from '../components/FilterByLocation';
import EventContext from '../context/event/eventContext';

export default function HomePage() {
  const eventContext = useContext(EventContext);
  const { resetEvent } = eventContext;

  const [locationFilter, setLocationFilter] = useState(null);

  useEffect(() => {
    resetEvent();
  },[])

  return (
    <Layout>
      <h1 className='title'>Enhance your Blockchain Experience</h1>
      <p>Browse blockchain events near you</p>
      <FilterByLocation locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
      <hr className="divider" />
      <EventsList locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
    </Layout>
  )
}
