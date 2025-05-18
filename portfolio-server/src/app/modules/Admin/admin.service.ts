import User from '../user/user.model';
import QueryBuilder from '../../builder/queryBuilder';
import { TTokenResponse } from '../Auth/auth.interface';
import Landlord from '../Landlord/landlord.model';

const getUsers = async (query: Record<string, unknown>) => {
  const searchableFields = ['name'];

  const userQuery = new QueryBuilder(
    User.find()
      .where('role')
      .in(['landlord', 'tenant'])
      .where('isBlocked')
      .equals(false),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateUserRole = async (userId: string, role: string) => {
  const result = await User.findByIdAndUpdate(userId, { role }, { new: true });
  return result;
};

const deleteUser = async (userId: string) => {
  console.log(userId);
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const adminGetAllLandLordListing = async (
  user: TTokenResponse,
  query: Record<string, unknown>,
) => {
  const searchableFields = ['location', 'description', 'bedrooms', 'amenities'];
  const landlordQuery = new QueryBuilder(
    Landlord.find(),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await landlordQuery.modelQuery;
  const meta = await landlordQuery.countTotal();
  return {
    meta,
    result,
  };
};

export const adminService = {
  getUsers,
  updateUserRole,
  deleteUser,
  adminGetAllLandLordListing
};
