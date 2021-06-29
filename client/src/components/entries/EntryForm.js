import React, { useState, useContext, useEffect } from 'react';
import EntryContext from '../../context/entry/entryContext';

const EntryForm = () => {
  const entryContext = useContext(EntryContext);

  const { addEntry, current, clearCurrent, updateEntry } = entryContext;

  useEffect(() => {
    if (current !== null) {
      setEntry(current);
    } else {
      setEntry({
        title: '',
        body: ''
      });
    }
  }, [entryContext, current]);

  const [entry, setEntry] = useState({
    title: '',
    body: ''
  });

  const { title, body } = entry;

  const onChange = e => setEntry({ ...entry, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addEntry(entry);
    } else {
      updateEntry(entry);
    }
    
    setEntry({
      title: '',
      body: ''
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Entry' : 'Add Entry'}</h2>
      <input type="text" placeholder="Title" name="title" value={title} onChange={onChange} />
      <h5>Body</h5>
      <textarea name="body" id="body" cols="30" rows="10" onChange={onChange}></textarea>
      <div>
        <input type="submit" value={current ? 'Update Entry' : 'Create Entry'} className="btn btn-primary btn-block" />
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear Entry</button>
      </div>}
    </form>
  )
};

export default EntryForm;
