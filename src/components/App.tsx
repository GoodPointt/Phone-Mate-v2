import { ContactsPage } from '../pages/ContactsPage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ContactsPage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
