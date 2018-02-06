import { userLogin } from '../utils/credentials';

export const login = data => dispatch => userLogin(data);

export const logout = () => ({ type: 'UNAUTHENTICATE_USER' });

export const authenticateUser = data => ({ type: 'AUTHENTICATE_USER' });
