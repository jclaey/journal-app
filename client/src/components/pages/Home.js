import React from 'react';
import Entries from '../entries/Entries';
import EntryForm from '../../components/entries/EntryForm';
import EntryFilter from '../../components/entries/EntryFilter';

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <EntryForm />
      </div>
      <div>
        <EntryFilter />
        <Entries />
      </div>
    </div>
  )
}

export default Home;