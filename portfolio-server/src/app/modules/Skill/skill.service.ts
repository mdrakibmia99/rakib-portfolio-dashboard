import { ISkill, ISkillCategory } from "./skill.interface";
import Skill from "./skill.model";
import SkillCategory from "./skillCategory.model";

const createSkill = async (payload: ISkill): Promise<ISkill> => {
  console.log(payload,"test");
  const result = await Skill.create(payload);
  return result;
};
const createSkillCategory = async (payload: ISkillCategory): Promise<ISkillCategory> => {
  const result = await SkillCategory.create(payload);
  return result;
};
const getAllSkill = async () => {
   const result = await Skill.aggregate([
    {
      $lookup: {
        from: 'skillcategories', // collection name (lowercase plural of model)
        localField: 'category',
        foreignField: '_id',
        as: 'categoryData',
      },
    },
    { $unwind: '$categoryData' },
    {
      $group: {
        _id: '$categoryData._id',
        title: { $first: '$categoryData.title' },
        icon: { $first: '$categoryData.icon' },
        items: {
          $push: {
            _id: '$_id',
            name: '$name',
            icon: '$icon',
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        icon: 1,
        items: 1,
      },
    },
  ]);
   const order = ["Frontend", "Backend", "Database", "Programming", "Tools", "Creative"];
  const orderedResult = order.map(title => result.find(item => item.title === title)).filter(Boolean);

  return orderedResult;
};
const getAllSkillCategory = async () => {
  const result = await SkillCategory.find({}).sort({ createdAt: -1 });
  return result;
};
const getSingleSkill = async (id: string) => {
  const result = await Skill.findById(id);
  return result;
};
const updateSkill = async (
  id: string,
  payload: Partial<ISkill>,
): Promise<ISkill | null> => {
  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteSkill = async (id: string): Promise<ISkill | null> => {
  const result = await Skill.findByIdAndDelete(id);
  return result;
};
export const skillService = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
  createSkillCategory,
  getAllSkillCategory
};
