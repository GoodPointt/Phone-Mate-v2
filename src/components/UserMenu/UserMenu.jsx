import { LogoutBtn } from './LogoutBtn';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  return (
    <div className={css.usermenu}>
      <p>User Email</p>
      <LogoutBtn />
    </div>
  );
};
