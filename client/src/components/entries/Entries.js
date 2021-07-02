import React, { Fragment, useContext, useEffect } from 'react';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';
import Spinner from '../layout/Spinner';

const Entries = () => {
  const entryContext = useContext(EntryContext);

  const { entries, filtered, getEntries, loading } = entryContext;

  useEffect(() => {
    getEntries();
    // eslint-disable-next-line
  }, []);

  if (entries !== null && entries.length === 0 && !loading) {
    return <h4>Please add an entry</h4>;
  }

  return (
    <Fragment>
      {entries !== null && !loading ? (
        <Fragment>
          {filtered !== null ? filtered.map(entry => <EntryItem key={entry._id} entry={entry} />) : entries.map(entry => <EntryItem key={entry._id} entry={entry} />)}
        </Fragment>
      ) : <Spinner />}
    </Fragment>
  )
};

export default Entries;
