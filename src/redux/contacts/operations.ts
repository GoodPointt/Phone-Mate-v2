import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IContact } from '../../common/models';
import { onAddSucces, onRemoveSucces } from '../../common/toasts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IContact[]>('/contacts');
      return response.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact: IContact, { rejectWithValue }) => {
    try {
      const response = await axios.post<IContact>('/contacts', newContact);
      onAddSucces(response.data.name);
      return response.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<IContact>(`/contacts/${contactId}`);
      onRemoveSucces(response.data.name);

      return response.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact: IContact, { rejectWithValue }) => {
    try {
      const response = await axios.patch<IContact>(`/contacts/${contact.id}`, {
        name: contact.name,
        number: contact.number,
      });
      return response.data;
    } catch (err) {
      const error = err as unknown;
      if (!(error instanceof AxiosError)) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);
