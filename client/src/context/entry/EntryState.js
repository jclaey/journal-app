import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EntryContext from './entryContext';
import entryReducer from './entryReducer';

import {
  ADD_ENTRY,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ENTRY,
  FILTER_ENTRIES,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from '../Types';

const EntryState = props => {
  const initialState = {
    entries: [
      {
        id: 1,
        title: 'My First Entry',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda accusantium provident in veritatis ratione mollitia fugit aliquam dignissimos sint laborum!'
      },
      {
        id: 2,
        title: 'A Tail of Two Dogs',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam vitae voluptas nemo pariatur delectus voluptatibus fugit accusamus repellendus modi sapiente.'
      },
      {
        id: 3,
        title: 'Something Soggy In My Shoe',
        body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci quisquam, fugiat corrupti sint vel quasi distinctio est alias ab culpa.'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(entryReducer, initialState);

  const addEntry = entry => {
    entry.id = uuidv4();
    dispatch({ type: ADD_ENTRY, payload: entry });
  };

  const deleteEntry = id => {
    dispatch({ type: DELETE_ENTRY, payload: id });
  };

  const setCurrent = entry => {
    dispatch({ type: SET_CURRENT, payload: entry });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateEntry = entry => {
    dispatch({ type: UPDATE_ENTRY, payload: entry });
  };

  const filterEntries = text => {
    dispatch({ type: FILTER_ENTRIES, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  
  return (
    <EntryContext.Provider
      value={{
        entries: state.entries,
        current: state.current,
        filtered: state.filtered,
        addEntry,
        deleteEntry,
        setCurrent,
        clearCurrent,
        updateEntry,
        filterEntries,
        clearFilter
      }}
    >
      { props.children }
    </EntryContext.Provider>
  );
};

export default EntryState;