export type TProject = {
  _id: string;
  title: string;
  description: string; // HTML string
  details: string; // HTML string
  techStack: string[];
  liveUrl: string;
  serverLiveUrl?: string;
  frontendGithubRepoLink?: string;
  backendGithubRepoLink?: string;
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
};


export interface IBlog {
  id?: string;
  title: string;
  content: string;
  coverImage?: string[];
  description: string;
  createdAt?: Date | string;
}