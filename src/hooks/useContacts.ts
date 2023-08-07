import { selectContacts, selectError, selectStatus } from '../redux/selectors';
import { useAppSelector } from './hooks';

export const useContacts = () => {
  const contacts = useAppSelector(selectContacts);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  return {
    contacts,
    status,
    error,
  };
};
