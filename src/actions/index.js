import axios from 'axios';

import * as types from './actionTypes';

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3.text-match+json' },
});

export const getUsersList = (name, page_no = 1) => dispatch => {
  if (name) {
    return axiosInstance
      .get(`/search/users?q=${name}+in%3Afullname+-in%3Alogin&page=${page_no}&per_page=10`)
      .then(({ data }) => {
        dispatch(getUsersListSuccess(data));
        dispatch(changeSortingOrder());
      })
      .catch(err => dispatch(getUsersListError()));
  } else {
    dispatch({ type: types.EMPTY_USERS_LIST });
  }
};

export const changeSortingOrder = sort_order => ({
  type: types.CHANGE_SORTING_ORDER,
  sort_order,
});

const getUsersListError = () => ({
  type: types.GET_USERS_LIST_ERROR,
});

const getUsersListSuccess = (response, sort_order) => ({
  type: types.GET_USERS_LIST_SUCCESS,
  response,
  sort_order,
});
