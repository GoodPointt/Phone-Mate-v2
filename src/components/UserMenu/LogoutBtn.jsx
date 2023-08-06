import { ReactComponent as LogoutSvg } from '../../img/svg/logout.svg';
import css from './UserMenu.module.css';

export const LogoutBtn = () => {
  return (
    <button className={css.Btn}>
      <div className={css.sign}>
        <LogoutSvg />
      </div>
      <div className={css.text}>Logout</div>
    </button>
  );
};
