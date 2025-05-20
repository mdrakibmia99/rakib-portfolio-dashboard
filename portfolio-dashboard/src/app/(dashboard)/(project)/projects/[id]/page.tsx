import { FC } from "react";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage: FC<ProjectPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Project ID: {id}</h1>
    </div>
  );
};

export default ProjectPage;
