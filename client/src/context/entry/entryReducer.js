/* eslint-disable import/no-anonymous-default-export */
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

export default (state, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map(entry => entry.id === action.payload.id ? action.payload : entry)
      }
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.payload)
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case FILTER_ENTRIES:
      return {
        ...state,
        filtered: state.entries.filter(entry => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return entry.title.match(regex);
        })
      }
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null
        }
      case ENTRY_ERROR:
        return {
          ...state,
          error: action.payload
        }
    default: 
      return state;
  }
};