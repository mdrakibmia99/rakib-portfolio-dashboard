import { Model, model, Schema } from 'mongoose';
import { ISkill } from './skill.interface';

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      unique: [true, 'Name is already used!!!'],
      required: [true, 'Name is required!!'],
      trim: true,
    },

    icon: {
      type: String,
      required: [true, 'Icon is required!'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'category is required!'],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Skill: Model<ISkill> = model<ISkill>('Skill', skillSchema);

export default Skill;
