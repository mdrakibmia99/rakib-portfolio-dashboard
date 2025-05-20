import Image from "next/image";
import { format } from "date-fns";
import { IBlog } from "@/utils/globalTypes";

interface BlogDetailsProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    coverImage: string[];
    description: string;
    createdAt: string;
  };
}

export default function BlogDetails({ blog }: {blog:IBlog}) {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-cyan-600">{blog.title}</h1>

      {/* Date */}
      <p className="text-gray-500 mt-1">
        Published on {format(new Date(blog.createdAt as Date), "MMMM dd, yyyy")}
      </p>

      {/* Blog Images */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {blog.coverImage?.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-60 relative rounded-lg overflow-hidden shadow"
          >
            <Image
              src={img}
              alt={`Blog image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Short Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Short Description:</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{blog.description}</p>
      </div>

      {/* Blog Content (HTML) */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Full Content:</h3>
        <div
          className="text-gray-800 dark:text-gray-200 mt-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
