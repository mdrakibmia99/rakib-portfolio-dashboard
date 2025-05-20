import { Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  details:string;
  techStack: string[];
  liveUrl?: string;
  serverLiveUrl?: string;
  frontendGithubRepoLink?: string;
  backendGithubRepoLink?: string;
  imageUrl: string[];
  createdAt: Date;
}