import { Outlet } from 'react-router-dom';
import { onError } from '../common/toasts';
import { useAppSelector } from '../redux/hooks';
import { GoTop } from './GoTop/GoTop';
import { Notification } from './Notification/Notification';
import { StyledContainer } from './Styled.styled';

export const Layout = () => {
  const { status, error } = useAppSelector(state => state.contacts);

  return (
    <StyledContainer>
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
