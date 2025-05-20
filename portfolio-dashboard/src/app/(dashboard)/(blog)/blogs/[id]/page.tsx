import BlogDetails from "@/components/modules/Blog/BlogDetails";
import { getSpecificBlog } from "@/services/Blog";
import { IBlog } from "@/utils/globalTypes";
import { FC } from "react";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const BlogPage: FC<ProjectPageProps> = async ({ params }) => {
  const { id } = params;
  const { data: blog } = await getSpecificBlog(id);

  return (
    <div>
      <div>
        <BlogDetails blog={blog as IBlog} />
      </div>
    </div>
  );
};

export default BlogPage;
