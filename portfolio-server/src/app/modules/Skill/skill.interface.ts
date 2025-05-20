import { Schema } from "mongoose";

// export interface ISkill {
//   id: string;
//   name: string;
//   icon: string;
//   category: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface ISkillCategory {
  title: string;
  icon: string;
}


export interface ISkill {
  name: string;
  icon: string;
  category: Schema.Types.ObjectId; 
}
