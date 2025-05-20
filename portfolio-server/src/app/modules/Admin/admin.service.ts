import User from '../user/user.model';
import QueryBuilder from '../../builder/queryBuilder';



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


export const adminService = {
  getUsers,
  updateUserRole,
  deleteUser,

};
