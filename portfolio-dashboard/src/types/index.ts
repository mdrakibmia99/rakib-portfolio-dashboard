export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt: string | null;
  image: string | null;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

};