

export type TTokenResponse = {
  name: string;
  email: string;
  role: string;
  userId: string;
  iat: number;
  exp: number;
};

export interface IAuth {
  email: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface IContactEmailPayload  {
  name: string;
  email: string;
  subjectLine: string;
  message: string;
};