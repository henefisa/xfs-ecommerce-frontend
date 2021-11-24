export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordConfirm: string;
  phoneNumber: string;
}
