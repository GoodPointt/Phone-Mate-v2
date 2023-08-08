export interface IContact {
  id?: string;
  name: string;
  number: string;
}

export interface IUser {
  user?: null | any;
  id?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  token?: string | undefined | null;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null | undefined;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

export interface PrivateRouteProps {
  component: React.ComponentType<any>;
  redirectTo?: string;
}

export type ThandleChange = React.ChangeEvent<HTMLInputElement>;
