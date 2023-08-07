import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from '../redux/selectors';
import { useAppSelector } from './hooks';

export const useAuth = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const user = useAppSelector(selectUser);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
