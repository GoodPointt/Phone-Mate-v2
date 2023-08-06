import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import {
  StyledBtn,
  StyledCloseBtn,
  StyledContainer,
} from '../components/Styled.styled';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactsList } from '../components/ContactsList/ContactsList';
import { Modal } from '../components/Modal/Modal';
// import { Notification } from '../components/Notification/Notification';
import { fetchContacts } from '../redux/contacts/operations';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Loader } from '../components/Loader/Loader';
// import { onError } from '../common/toasts';
import { toggleModal } from '../redux/modal/modalSlice';
// import { GoTop } from '../components/GoTop/GoTop';
import { UserMenu } from '../components/UserMenu/UserMenu';

export const ContactsPage = () => {
  const { status, error } = useAppSelector(state => state.contacts);
  const { isModalOpen } = useAppSelector(state => state.isModalOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <StyledContainer>
      <UserMenu />
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
      {/* {status === 'rejected' && error && onError(error) && (
        <>
          <h2>Opps! some error occured😒 Try again later.</h2>
          <h4>{error}</h4>
        </>
      )} */}
      {/* <GoTop /> */}
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
      {/* <Notification /> */}
    </StyledContainer>
  );
};
