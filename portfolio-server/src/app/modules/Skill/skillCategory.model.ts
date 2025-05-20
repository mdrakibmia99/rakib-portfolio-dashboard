import { Schema, model, Model } from 'mongoose';
import { ISkillCategory } from './skill.interface';

const skillCategorySchema = new Schema<ISkillCategory>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false },
);

const SkillCategory: Model<ISkillCategory> = model<ISkillCategory>(
  'SkillCategory',
  skillCategorySchema,
);

export default SkillCategory;
