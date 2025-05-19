import { Schema, Model, model } from 'mongoose';
import { IProject } from './project.interface';

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  liveUrl: { type: String },
  serverLiveUrl: { type: String },
  frontendGithubRepoLink: { type: String },
  backendGithubRepoLink: { type: String },
  imageUrl: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. Create the model
const Project: Model<IProject> = model<IProject>('Project', projectSchema);

export default Project;
