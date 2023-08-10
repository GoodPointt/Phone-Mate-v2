import { useState, FormEvent } from 'react';
import { EditBtn, StyledEditInput } from '../Contact/ContactsItem.styled';
import { editContact } from '../../redux/contacts/operations';
import { useAppDispatch } from '../../hooks/hooks';
import { IContact } from '../../common/models';
import { ReactComponent as Person } from '../../img/svg/person.svg';
import { ReactComponent as Phone } from '../../img/svg/phone.svg';

interface IEditForm {
  toggleEditMode: () => void;
  contact: IContact;
}

export const EditContactForm: React.FC<IEditForm> = ({
  toggleEditMode,
  contact,
}) => {
  const [editedName, setEditedName] = useState(contact.name);
  const [editedNumber, setEditedNumber] = useState(contact.number);

  const dispatch = useAppDispatch();

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedContact = {
      id: contact.id,
      name: editedName,
      number: editedNumber,
    };

    dispatch(editContact(editedContact));
    toggleEditMode();
  };

  return (
    <form style={{ margin: 'auto' }} onSubmit={handleEdit}>
      <div className="inputBox">
        <div className="inputIcon">
          <Person />
        </div>
        <StyledEditInput
          type="text"
          value={editedName}
          onChange={e => setEditedName(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="inputBox">
        <div className="inputIcon">
          <Phone />
        </div>
        <StyledEditInput
          type="text"
          value={editedNumber}
          onChange={e => setEditedNumber(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 50,
        }}
      >
        <EditBtn className="edit" type="submit">
          Confirm
        </EditBtn>
        <EditBtn className="cancel" type="button" onClick={toggleEditMode}>
          Cancel
        </EditBtn>
      </div>
    </form>
  );
};
