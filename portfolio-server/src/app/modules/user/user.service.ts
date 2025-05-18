import mongoose from 'mongoose';
import { IUser, UserRole } from './user.interface';
import User from './user.model';
import { createToken } from '../Auth/auth.utills';
import config from '../../config';
import { IJwtPayload } from '../Auth/auth.interface';
// type UserPayload = {
//   _id: Types.ObjectId;
//   name: string;
//   email: string;
// };
const createUser = async (payload: IUser) => {
   const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  const result = await User.create(payload);
  const jwtPayload: IJwtPayload = {
    userId: result._id as unknown as string,
    name: result.name as string,
    email: result.email as string,
    isBlocked: result.isBlocked,
    role: result?.role as UserRole,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );


   await User.findByIdAndUpdate(
    result._id,
    { lastLogin: Date.now() },
    { new: true, session },
  );
  return {
    refreshToken,
    accessToken,
  };
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
};

const authMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  return user;
};
const profileUpdate = async (
  userId: string,
  payload: Record<string, unknown>,
) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
};

export const userService = {
  createUser,
  authMe,
  profileUpdate
};
