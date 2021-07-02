import React, { useReducer } from 'react';
import axios from 'axios';
import EntryContext from './entryContext';
import entryReducer from './entryReducer';

import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ENTRY,
  FILTER_ENTRIES,
  CLEAR_ENTRIES,
  CLEAR_FILTER,
  ENTRY_ERROR,
  SET_ALERT,
  REMOVE_ALERT
} from '../Types';

const EntryState = props => {
  const initialState = {
    entries: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(entryReducer, initialState);

  const getEntries = async () => {
    try {
      const res = await axios.get('/api/entries');

      dispatch({ type: GET_ENTRIES, payload: res.data });
    } catch (err) {
      dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
    }
  };

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

  const deleteEntry = async id => {
    try {
      await axios.delete(`/api/entries/${id}`);

      dispatch({ type: DELETE_ENTRY, payload: id });
    } catch (err) {
      dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
    }
  };

  const updateEntry = async entry => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/contacts/${entry._id}`, entry, config);

      dispatch({ type: UPDATE_ENTRY, payload: res.data });
    } catch (err) {
      dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
    }
  };

  const clearEntries = () => {
    dispatch({ type: CLEAR_ENTRIES });
  };

  const setCurrent = entry => {
    dispatch({ type: SET_CURRENT, payload: entry });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        getEntries,
        addEntry,
        deleteEntry,
        clearEntries,
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