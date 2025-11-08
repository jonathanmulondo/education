import Link from 'next/link';
import { Clock, TrendingUp, Tag } from 'lucide-react';
import type { ProjectCardProps } from '@/types';

export default function ProjectCard({ project, progress = 0 }: ProjectCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        {/* Project Image/Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-lg -mt-6 -mx-6 mb-4">
          <div className="flex items-center justify-center h-full text-white text-6xl font-bold">
            {project.title.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-grow">
              {project.title}
            </h3>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                difficultyColors[project.difficulty]
              }`}
            >
              {project.difficulty}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Meta Information */}
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{project.duration}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar (if user has started) */}
        {progress > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-primary-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
