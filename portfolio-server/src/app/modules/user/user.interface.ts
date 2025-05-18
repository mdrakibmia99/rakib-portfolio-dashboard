/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';


//create a interface for user
export interface IUser {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  role: 'admin' | 'user';
  isVerified: boolean;
  isBlocked: boolean;
  address?: string | null;
  city?: string | null;
  image?: string | null;
  lastLogin?: Date;
  createdAt?: Date;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}


