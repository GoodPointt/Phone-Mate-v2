import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { StyledBtn, StyledCloseBtn } from '../components/Styled.styled';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactsList } from '../components/ContactsList/ContactsList';
import { Modal } from '../components/Modal/Modal';
import { fetchContacts } from '../redux/contacts/operations';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Loader } from '../components/Loader/Loader';
import { toggleModal } from '../redux/modal/modalSlice';
import { useContacts } from '../hooks/useContacts';

export const ContactsPage = () => {
  const { status, error } = useContacts();
  const { isModalOpen } = useAppSelector(state => state.isModalOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <h1>Phone Mate</h1>
      <StyledBtn
        className="add"
        type="button"
        onClick={() => dispatch(toggleModal())}
      >
        Add new contact
      </StyledBtn>
      {status === 'loading' && !error && <Loader />}
      {status === 'resolved' && <ContactsList />}

      {isModalOpen && (
        <Modal>
          <StyledCloseBtn type="button" onClick={() => dispatch(toggleModal())}>
            <span className="X"></span>
            <span className="Y"></span>
            <div className="close">Close</div>
          </StyledCloseBtn>
          <ContactForm />
        </Modal>
      )}
    </>
  );
};
