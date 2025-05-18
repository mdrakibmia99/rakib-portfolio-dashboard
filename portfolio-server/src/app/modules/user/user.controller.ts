import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, StatusCodes.CREATED, 'User created successfully', {
    accessToken,
    refreshToken,
  });
});

const authMe = catchAsync(async (req, res) => {
  console.log('auth me')
  const userId = req?.user?.userId;
  const result = await userService.authMe(userId as string);
  sendResponse(
    res,
    StatusCodes.OK,
    'User Information getting successfully',
    result,
  );
});
// update profile
const profileUpdate = catchAsync(async (req, res) => {
  const userId = req?.user?.userId as string;
  const payload = req.body;
  const result = await userService.profileUpdate(userId, payload);
  sendResponse(res, StatusCodes.OK, 'Update profile Successful', result);
});

export const userController = {
  createUser,
  authMe,
  profileUpdate,
};
