import { toast } from 'react-toastify';

export const onAddSucces = (contactName: string) =>
  toast.success(`${contactName} was added to your contacts`);

export const onRemoveSucces = (contactName: string) => {
  toast.info(`${contactName} was removed from your contacts`);
};

export const onError = (errorMsg: string) => {
  return toast.error(`Opps! Some error occured😒 ${errorMsg}`);
};

export const onLoginError = (errorMsg: string) => {
  return toast.error(`User not found or password wrong.  (${errorMsg})`);
};
