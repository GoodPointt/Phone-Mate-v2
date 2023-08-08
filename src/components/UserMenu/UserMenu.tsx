import { useAuth } from '../../hooks/useAuth';
import { logOut } from '../../redux/auth/operations';
import { useAppDispatch } from '../../hooks/hooks';
import { LogoutBtn } from './LogoutBtn';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { user, isRefreshing } = useAuth();
  const handleLogout = () => dispatch(logOut());

  if (isRefreshing || !user) {
    return null;
  }

  return (
    <div className={css.usermenu}>
      <p style={{ maxWidth: 100 }}>{user.email}</p>
      <LogoutBtn onClick={handleLogout} />
    </div>
  );
};
