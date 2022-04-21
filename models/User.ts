export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string | null;
  birthday: string;
}

export interface AccountDetailsInput {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: Date;
}
