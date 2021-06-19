import React, { useReducer } from 'react';
import uuid from 'uuid';
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
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda accusantium provident in veritatis ratione mollitia fugit aliquam dignissimos sint laborum!',
        type: 'private'
      },
      {
        id: 2,
        title: 'A Tail of Two Dogs',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam vitae voluptas nemo pariatur delectus voluptatibus fugit accusamus repellendus modi sapiente.',
        type: 'private'
      },
      {
        id: 3,
        title: 'Something Soggy In My Shoe',
        body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci quisquam, fugiat corrupti sint vel quasi distinctio est alias ab culpa.',
        type: 'public'
      }
    ]
  };

  const [state, dispatch] = useReducer(entryReducer);

  
  return (
    <EntryContext.Provider
      value={{
        entries: state.entries
      }}
    >
      { props.children }
    </EntryContext.Provider>
  );
};

export default EntryState;