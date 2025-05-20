import ProjectDetails from "@/components/modules/Project/ProjectDetails";
import { getSpecificProject } from "@/services/Projects";
import { TProject } from "@/utils/globalTypes";


interface ProjectPageProps {
    params: Promise<{
      id: string;
    }>;
  }

const ProjectPage = async ({ params }:ProjectPageProps) => {
  const { id } =await params;
  const { data: project } = await getSpecificProject(id);

  return (
    <div>
      <div>
        <ProjectDetails project={project as TProject} />
      </div>
    </div>
  );
};

export default ProjectPage;
