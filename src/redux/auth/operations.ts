import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IUser } from '../../common/models';
import { onError, onLoginError } from '../../common/toasts';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'users/createUser',
  async (credntials: IUser, { rejectWithValue }) => {
    try {
      const response = await axios.post<IUser>('/users/signup', credntials);
      const token = response.data.token;
      if (token) {
        setAuthHeader(token);
      }
      return response.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }
      onError('Oops!😒');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: IUser, { rejectWithValue }) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }
      onLoginError(error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }

      return rejectWithValue(error.response?.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }

      return rejectWithValue(error.response?.data);
    }
  }
);
