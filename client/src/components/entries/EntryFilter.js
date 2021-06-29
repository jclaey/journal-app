import React, { useContext, useRef, useEffect } from 'react';
import EntryContext from '../../context/entry/entryContext';

const EntryFilter = () => {
  const entryContext = useContext(EntryContext);
  const text= useRef('');

  const { filterEntries, clearFilter, filtered } = entryContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterEntries();
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <input type="text" ref={text} placeholder="Filter entries..." onChange={onChange} />
    </div>
  )
}

export default EntryFilter;