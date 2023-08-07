import { useAppDispatch } from '../../hooks/hooks';
import { IContact } from '../../common/models';
import { removeContact } from '../../redux/contacts/operations';
import { StyledItem } from './ContactsItem.styled';
import { ReactComponent as CallSvg } from '../../img/svg/call.svg';
import { useState } from 'react';
import { EditContactForm } from '../EditContactForm/EditContactForm';

export interface IContactsItem {
  contact: IContact;
}

export const ContactsItem: React.FC<IContactsItem> = ({ contact }) => {
  const { id, number, name } = contact;

  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const toggleEditMode = () => setIsEditMode(state => !state);

  const handleDelete = () => {
    id && dispatch(removeContact(id));
  };

  return (
    <StyledItem key={id}>
      <div className="card">
        {isEditMode ? (
          <EditContactForm toggleEditMode={toggleEditMode} contact={contact} />
        ) : (
          <>
            <div onClick={toggleEditMode} className="card__name">
              <p className="p1">{name}</p>
              <p className="p2">{number}</p>
            </div>

            <div className="card__buttons-wrap">
              <a href={`tel:${number}`} id="call" className="card__button">
                <CallSvg />
              </a>

              <span id="delete" className="card__button" onClick={handleDelete}>
                &times;
              </span>
            </div>
          </>
        )}
      </div>
    </StyledItem>
  );
};
