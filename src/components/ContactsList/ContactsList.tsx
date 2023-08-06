import { StyledList, StyledText } from './ContactsList.styled';

import { useAppSelector } from '../../redux/hooks';
import { IContact } from '../../common/models';

import { Filter } from '../Filter/Filter';
import { ContactsItem } from '../Contact/ContactsItem';

export const ContactsList = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const filter = useAppSelector(state => state.filter.filter);
  const sort = useAppSelector(state => state.sort.sort);

  const filteredContacts: IContact[] =
    contacts.filter(
      contact =>
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

      {sort === 'all' && contacts.length > 0 && <Filter />}
      {sort === 'all' && filter !== '' ? (
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
          {contacts?.map(contact => (
            <ContactsItem key={contact.id} contact={contact} />
          ))}
        </StyledList>
      )}
    </>
  );
};
