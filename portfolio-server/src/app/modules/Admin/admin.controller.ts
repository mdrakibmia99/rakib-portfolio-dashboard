import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { adminService } from './admin.service';
import sendResponse from '../../utils/sendResponse';


const getUsers = catchAsync(async (req, res) => {
  const queryData = req?.query;
  const result = await adminService.getUsers(queryData);
    sendResponse(
      res,
      StatusCodes.OK,
      'All users get successfully',
      result,
    );
});

const updateUserRole=catchAsync(async (req, res) => {
  const userId = req.params.id;
  const role=req.body.role;
  const result = await adminService.updateUserRole(userId,role);
  sendResponse(
    res,
    StatusCodes.OK,
    'updated user role  successfully',
    result,
  );

})
const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result= await adminService.deleteUser(userId);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User deleted successfully',
    statusCode: StatusCodes.OK,
    data:result
  });
});



export const adminController = {
  deleteUser,
  getUsers,
  updateUserRole,

};
