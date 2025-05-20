import BlogDetails from "@/components/modules/Blog/BlogDetails";
import { getSpecificBlog } from "@/services/Blog";
import { IBlog } from "@/utils/globalTypes";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
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
