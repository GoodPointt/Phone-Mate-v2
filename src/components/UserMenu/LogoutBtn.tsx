import { ReactComponent as LogoutSvg } from '../../img/svg/logout.svg';
import css from './UserMenu.module.css';

interface LogoutBtnProps {
  onClick: () => void;
}

export const LogoutBtn: React.FC<LogoutBtnProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.Btn}>
      <div className={css.sign}>
        <LogoutSvg />
      </div>
      <div className={css.text}>Logout</div>
    </button>
  );
};
