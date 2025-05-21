import BlogCart from "@/components/modules/Blog/BlogCart";
import { getAllBlog } from "@/services/Blog";

export default async function BlogPage() {
  const {data} = await getAllBlog();

  return (
    <div className=" py-8">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-12 px-2">
          {data?.map((blog:any, index:number) => (
            <BlogCart key={index} blog={blog} />
          ))}
        </div>
    </div>
  );
}

