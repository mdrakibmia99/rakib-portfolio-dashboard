import ProjectDetails from "@/components/modules/Project/ProjectDetails";
import { getSpecificProject } from "@/services/Projects";
import { TProject } from "@/utils/globalTypes";
import { FC } from "react";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage: FC<ProjectPageProps> = async ({ params }) => {
  const { id } = params;
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
