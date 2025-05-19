import { Schema, model, Model } from 'mongoose';
import { IExperience } from './experience.interface';

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company is required!'],
      trim: true,
    },

    position: {
      type: String,
      required: [true, 'Position is required!'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
    },

    images: {
      type: [String],
      required: [true, 'Images are required!'],
    },

    startDate: {
      type: Date,
      required: [true, 'Start date is required!'],
    },

    endDate: {
      type: Date,
      required: false, // Optional
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Experience: Model<IExperience> = model<IExperience>('Experience', experienceSchema);

export default Experience;
