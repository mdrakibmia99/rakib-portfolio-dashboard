
import SkillHighlights from "@/components/modules/Skill/SkillHighlights";
import { getAllSkill } from "@/services/Skill";

export default async function BlogPage() {
  const {data:skills} = await getAllSkill();

  return (
    <div className=" py-8">
       <SkillHighlights skills={skills as any}/>
    </div>
  );
}

