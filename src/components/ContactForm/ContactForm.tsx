import { toast } from 'react-toastify';
import { Formik, ErrorMessage, Form } from 'formik';

import { CONTACT_VALIDATION } from '../../common/formik';
import { isContactExist } from '../../common/utils';
import { IContact } from '../../common/models';

import { useAppDispatch } from '../../hooks/hooks';

import { changeFilter } from '../../redux/filter/filterSlice';
import { addContact } from '../../redux/contacts/operations';
import { toggleModal } from '../../redux/modal/modalSlice';
import { ErrorMsg, StyledFormInput } from './ContactForm.styled';
import { useContacts } from '../../hooks/useContacts';

export const ContactForm: React.FC = () => {
  const INITIAL_VALUES = {
    name: '',
    number: '',
  };

  const dispatch = useAppDispatch();

  const { contacts } = useContacts();

  const handleSubmit = (values: { name: string; number: string }) => {
    const newContact: IContact = {
      name: values.name.toString(),
      number: values.number.toString(),
    };
    if (isContactExist(newContact, contacts)) {
      toast.warn(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(newContact));
    dispatch(changeFilter({ filter: '' }));
    dispatch(toggleModal());
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CONTACT_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="user-box">
          <StyledFormInput type="text" name="name" autoFocus />
          <label className="submit__lable">Contact name</label>
          <ErrorMessage name="name" component={ErrorMsg} />
        </div>

        <div className="user-box">
          <StyledFormInput type="tel" name="number" />
          <ErrorMessage name="number" component={ErrorMsg} />
          <label className="submit__lable">Phone number</label>
        </div>

        <center>
          <button className="submit-btn" type="submit">
            Add contact<span></span>
          </button>
        </center>
      </Form>
    </Formik>
  );
};
