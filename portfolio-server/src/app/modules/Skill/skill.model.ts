import { Schema, model, Model } from 'mongoose';
import { ISkill } from './skill.interface';

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'SkillCategory',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Skill: Model<ISkill> = model<ISkill>('Skill', skillSchema);
export default Skill;
