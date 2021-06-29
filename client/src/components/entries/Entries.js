import React, { Fragment, useContext } from 'react';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';

const Entries = () => {
  const entryContext = useContext(EntryContext);

  const { entries, filtered } = entryContext;

  if (entries.length === 0) {
    return <h4>Please add an entry</h4>;
  }

  return (
    <Fragment>
      {filtered !== null ? filtered.map(entry => <EntryItem key={entry.id} entry={entry} />) : entries.map(entry => <EntryItem key={entry.id} entry={entry} />)}
    </Fragment>
  )
};

export default Entries;
