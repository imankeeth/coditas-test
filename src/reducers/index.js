import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const defaultState = { total_users: 0, items: [], error: '', sort_order: 'name_asc' };

const users = (state = defaultState, { type, response, sort_order }) => {
  switch (type) {
    case types.GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        total_users: response.total_count,
        items: response.items.map(singleUser),
      };

    case types.CHANGE_SORTING_ORDER:
      let items_arr = [...state.items];
      sort_order = sort_order || state.sort_order;
      if (sort_order === 'name_des') {
        items_arr.sort((a, b) => {
          if (a.login.toLowerCase() > b.login.toLowerCase()) return -1;
          else if (a.login.toLowerCase() < b.login.toLowerCase()) return 1;
          else return 0;
        });
      } else if (sort_order === 'name_asc') {
        items_arr.sort((a, b) => {
          if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
          else if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
          else return 0;
        });
      }
      if (sort_order === 'rank_asc') {
        items_arr.sort((a, b) => {
          return a.score - b.score;
        });
      } else if (sort_order === 'rank_des') {
        items_arr.sort((a, b) => {
          return b.score - a.score;
        });
      }
      return {
        ...state,
        sort_order,
        items: [...items_arr],
      };

    case types.EMPTY_USERS_LIST:
      return { ...defaultState };

    case types.GET_USERS_LIST_ERROR:
      return {
        ...defaultState,
        error: 'API rate limit might have exceeded for this IP.',
      };

    default:
      return state;
  }
};

const singleUser = ({ id, login, avatar_url, url, html_url, repos_url, score }) => ({
  id,
  login,
  avatar_url,
  url,
  html_url,
  repos_url,
  score,
});

export const rootReducers = combineReducers({
  users,
});
