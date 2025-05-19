import { ISkill } from "./skill.interface";
import Skill from "./skill.model";

const createSkill = async (payload: ISkill): Promise<ISkill> => {
  const result = await Skill.create(payload);
  return result;
};
const getAllSkill = async () => {
  const result = await Skill.find({}).sort({ createdAt: -1 });
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
};
