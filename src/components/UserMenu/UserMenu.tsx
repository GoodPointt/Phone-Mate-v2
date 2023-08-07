import { useAuth } from '../../hooks/useAuth';
import { logOut } from '../../redux/auth/operations';
import { useAppDispatch } from '../../hooks/hooks';
import { LogoutBtn } from './LogoutBtn';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const handleLogout = () => dispatch(logOut());
  return (
    <div className={css.usermenu}>
      <p style={{ maxWidth: 100 }}>{user.email}</p>
      <LogoutBtn onClick={handleLogout} />
    </div>
  );
};
