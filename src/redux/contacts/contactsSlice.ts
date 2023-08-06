import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from '../../common/models';
import {
  addContact,
  fetchContacts,
  removeContact,
  // toggleFavorite,
} from './operations';
import {
  onAddSucces,
  // onFavoriteSucces,
  onRemoveSucces,
} from '../../common/toasts';

interface ContactsState {
  contacts: IContact[];
  status: 'loading' | 'resolved' | 'rejected' | '';
  error: null | string;
}

const initialState: ContactsState = {
  contacts: [],
  status: '',
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.pending.type]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContacts.fulfilled.type]: (
      state,
      action: PayloadAction<IContact[]>
    ) => {
      state.status = 'resolved';
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [addContact.pending.type]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [addContact.fulfilled.type]: (state, action: PayloadAction<IContact>) => {
      state.status = 'resolved';
      state.error = null;
      state.contacts = [...state.contacts, action.payload];
      onAddSucces(action.payload.name);
    },
    [addContact.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [removeContact.pending.type]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [removeContact.fulfilled.type]: (
      state,
      action: PayloadAction<IContact>
    ) => {
      state.status = 'resolved';
      state.error = null;
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
      onRemoveSucces(action.payload.name);
    },
    [removeContact.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default contactsSlice.reducer;
