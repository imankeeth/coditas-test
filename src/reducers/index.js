import { combineReducers } from 'redux';

const isUserAuthenticated = (state = false, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return true;
    case 'UNAUTHENTICATE_USER':
      return false;
    default:
      return state;
  }
};

export const rootReducers = combineReducers({
  isUserAuthenticated,
});
