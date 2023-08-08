import { createSlice } from '@reduxjs/toolkit';
import { IContact } from '../../common/models';
import {
  addContact,
  fetchContacts,
  removeContact,
  editContact,
} from './operations';

interface ContactsState {
  contacts: IContact[];
  status: 'loading' | 'resolved' | 'rejected' | '';
  error: null | string | unknown;
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
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.contacts = [action.payload, ...state.contacts];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(removeContact.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.contacts = state.contacts.map(contact => {
          if (contact.id === action.payload.id) {
            contact.name = action.payload.name;
            contact.number = action.payload.number;
          }
          return contact;
        });
      });
  },
});

export default contactsSlice.reducer;
