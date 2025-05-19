export interface IExperience {
  company: string;
  position: string;
  description: string;
  images: string[];
  startDate: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
