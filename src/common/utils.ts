import { IContact } from './models';

export const isContactExist = (
  newContact: IContact,
  contactsArr: IContact[]
): Boolean => {
  return contactsArr?.find(
    contact =>
      contact.name.toLowerCase().trim() === newContact.name.toLowerCase().trim()
  )
    ? true
    : false;
};
