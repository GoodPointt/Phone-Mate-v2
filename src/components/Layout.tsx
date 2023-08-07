import { Outlet } from 'react-router-dom';
import { onError } from '../common/toasts';
import { GoTop } from './GoTop/GoTop';
import { Notification } from './Notification/Notification';
import { StyledContainer } from './Styled.styled';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from './UserMenu/UserMenu';
import { useContacts } from '../hooks/useContacts';

export const Layout = () => {
  const { status, error } = useContacts();
  const { isLoggedIn } = useAuth();

  return (
    <StyledContainer>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <p>Wellcome to PHONE MATE APP, we care about your contacts</p>
      )}
      <Outlet />
      {status === 'rejected' && error && onError(error) && (
        <>
          <h2>Opps! some error occured😒 Try again later.</h2>
          <h4>{error}</h4>
        </>
      )}
      <GoTop />

      <Notification />
    </StyledContainer>
  );
};
