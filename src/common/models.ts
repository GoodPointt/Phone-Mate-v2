export interface IContact {
  id?: string;
  name: string;
  number: string;
}

export interface IUser {
  id?: string | null;
  name: string | null;
  email: string | null;
  password?: string | null;
}

export type ThandleChange = React.ChangeEvent<HTMLInputElement>;
