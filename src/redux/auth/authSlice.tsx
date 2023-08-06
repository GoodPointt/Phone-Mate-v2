import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../common/models';

interface IAuthState {
  user: IUser;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: IAuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
