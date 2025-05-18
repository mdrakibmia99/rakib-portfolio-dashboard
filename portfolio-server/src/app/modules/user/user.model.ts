import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import { createHashPassword } from '../../utils/createHashPassword';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { comparePassword } from '../../utils/comparePassword';
const userSchema = new Schema<IUser, UserModel>(
  {

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      default: 'anonymous',
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: null,
    },
    address: { type: String, default: null },
    city: { type: String, default: null },
    image: { type: String, default: null },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
   },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  this.password = await createHashPassword(
    this.password,
    config.bcrypt_salt_round as string,
  );

  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await comparePassword(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
  }

  if (!existingUser.isBlocked) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User is blocked by admin!');
  }

  return existingUser;
};
const User = model<IUser, UserModel>('User', userSchema);
export default User;
