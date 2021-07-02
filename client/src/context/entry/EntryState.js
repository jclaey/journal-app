import React, { useReducer } from 'react';
import axios from 'axios';
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
  ENTRY_ERROR,
  SET_ALERT,
  REMOVE_ALERT
} from '../Types';

const EntryState = props => {
  const initialState = {
    entries: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(entryReducer, initialState);

  const addEntry = async entry => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/entries', entry, config);

      dispatch({ type: ADD_ENTRY, payload: res.data });
    } catch (err) {
      dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
    }

    
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
        error: state.error,
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