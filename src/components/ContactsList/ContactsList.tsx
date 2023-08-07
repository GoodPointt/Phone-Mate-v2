import { StyledList, StyledText } from './ContactsList.styled';

import { useAppSelector } from '../../hooks/hooks';
import { IContact } from '../../common/models';

import { Filter } from '../Filter/Filter';
import { ContactsItem } from '../Contact/ContactsItem';
import { useContacts } from '../../hooks/useContacts';

export const ContactsList = () => {
  const { contacts } = useContacts();
  const filter = useAppSelector(state => state.filter.filter);

  const filteredContacts: IContact[] =
    contacts?.filter(
      (contact: IContact) =>
        contact.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim()) ||
        contact.number.includes(filter.toLowerCase().trim())
    ) || [];

  return (
    <>
      <h2>
        There
        {contacts.length === 1 ? (
          <span> is {contacts.length} contact </span>
        ) : (
          <span> are {contacts.length} contacts </span>
        )}
        in your phonebook
      </h2>

      {contacts.length > 0 && <Filter />}
      {filter !== '' ? (
        <>
          <h4>Search result:</h4>
          {filteredContacts.length > 0 ? (
            <StyledList>
              {filteredContacts.map(filteredContact => (
                <ContactsItem
                  key={filteredContact.id}
                  contact={filteredContact}
                />
              ))}
            </StyledList>
          ) : (
            <StyledText>
              Sorry, you have no contacts matching your search query 😒
            </StyledText>
          )}
        </>
      ) : (
        <StyledList>
          {contacts?.map((contact: IContact) => (
            <ContactsItem key={contact.id} contact={contact} />
          ))}
        </StyledList>
      )}
    </>
  );
};
