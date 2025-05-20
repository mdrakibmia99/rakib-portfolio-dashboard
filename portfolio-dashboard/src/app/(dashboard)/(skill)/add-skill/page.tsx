import SkillForm from "@/components/modules/Project/SkillForm";
import { getAllSkillCategories } from "@/services/Skill";

export default async function AdminSkillPage() {
  const { data: categories } = await getAllSkillCategories();
  console.log(categories,'categories');

  return <SkillForm categories={categories} />;
}
