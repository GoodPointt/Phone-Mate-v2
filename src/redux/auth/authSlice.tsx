import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../../common/models';
import { logIn, logOut, refreshUser, register } from './operations';

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
  extraReducers: {
    [register.fulfilled.type]: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logIn.fulfilled.type]: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled.type]: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    [refreshUser.pending.type](state) {
      state.isRefreshing = true;
    },
    [refreshUser.fulfilled.type](state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [refreshUser.rejected.type](state) {
      state.isRefreshing = false;
    },
  },
});

export default authSlice.reducer;
