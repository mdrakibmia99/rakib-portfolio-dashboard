import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { TProject } from "@/utils/globalTypes";


export default function ProjectDetails({ project }: { project: TProject }) {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-cyan-600">{project.title}</h1>

      {/* Project Images */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.imageUrl?.map((img, idx) => (
          <div key={idx} className="w-full h-60 relative rounded-lg overflow-hidden shadow">
            <Image
              src={img}
              alt={`Project image ${idx + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mt-6">
        {project.frontendGithubRepoLink && (
          <a
            href={project.frontendGithubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <Github className="w-5 h-5" />
            Frontend Repo
          </a>
        )}
        {project.backendGithubRepoLink && (
          <a
            href={project.backendGithubRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <Github className="w-5 h-5" />
            Backend Repo
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <ExternalLink className="w-5 h-5" />
            Live Demo
          </a>
        )}
      </div>

      {/* Tech Stack */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Tech Stack:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      {project.details && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Details:</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap">
            {project.details}
          </p>
        </div>
      )}

      {/* Description (HTML) */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Description:</h3>
        <div
          className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>
    </div>
  );
}
