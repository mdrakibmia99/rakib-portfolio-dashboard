import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    description: string;
    coverImage: string[];
  };
}

export default function BlogCart({ blog }: BlogCardProps) {
    console.log(blog);
  const { _id, title, description, coverImage } = blog;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full h-48">
        {coverImage?.[0] ? (
          <Image
            src={coverImage[0]}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        <div className="pt-2">
          <Link href={`/blogs/${_id}`}>
            <Button variant="outline">Read More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
