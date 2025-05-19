import { IExperience } from "./experience.interface";
import Experience from "./experience.model";

// Create a new experience
const createExperience = async (payload: IExperience): Promise<IExperience> => {
  const result = await Experience.create(payload);
  return result;
};

// Get all experiences (latest first)
const getAllExperiences = async () => {
  const result = await Experience.find({}).sort({ createdAt: -1 });
  return result;
};

// Get single experience by ID
const getSingleExperience = async (id: string): Promise<IExperience | null> => {
  const result = await Experience.findById(id);
  return result;
};

// Update an experience
const updateExperience = async (
  id: string,
  payload: Partial<IExperience>,
): Promise<IExperience | null> => {
  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Delete an experience
const deleteExperience = async (id: string): Promise<IExperience | null> => {
  const result = await Experience.findByIdAndDelete(id);
  return result;
};

export const experienceService = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
