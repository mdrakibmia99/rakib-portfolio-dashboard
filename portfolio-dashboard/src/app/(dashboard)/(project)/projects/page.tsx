import ProjectCard from "@/components/modules/Project/ProjectCart";
import { getAllProject } from "@/services/Projects";

export default async function ProjectPage() {
  const {data} = await getAllProject();

  return (
    <div className=" py-8">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-12 px-2">
          {data?.map((project:any, index:number) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
    </div>
  );
}
