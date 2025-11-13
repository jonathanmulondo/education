'use client';

import Link from 'next/link';
import { ArrowUp, ArrowDown, MessageCircle, Eye, Share2, GitFork } from 'lucide-react';
import type { CommunityProject } from '@/types/enhanced';
import { formatDistanceToNow } from 'date-fns';

interface CommunityProjectCardProps {
  project: CommunityProject;
  onVote?: (voteType: 'up' | 'down') => void;
  userVote?: 'up' | 'down' | null;
  showActions?: boolean;
}

export default function CommunityProjectCard({
  project,
  onVote,
  userVote,
  showActions = true,
}: CommunityProjectCardProps) {
  const netVotes = project.upvotes - project.downvotes;

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start space-x-4">
        {/* Vote Section */}
        {showActions && (
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            <button
              onClick={() => onVote?.('up')}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                userVote === 'up' ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <span
              className={`font-bold text-sm ${
                netVotes > 0
                  ? 'text-green-600'
                  : netVotes < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {netVotes}
            </span>
            <button
              onClick={() => onVote?.('down')}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                userVote === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-grow min-w-0">
          {/* Author and metadata */}
          <div className="flex items-center space-x-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href={`/profile/${project.user_id}`}
              className="font-medium hover:text-primary-600"
            >
              {project.author?.bio || 'Anonymous'}
            </Link>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(project.created_at))} ago</span>
            {project.is_featured && (
              <>
                <span>•</span>
                <span className="text-yellow-600 font-semibold">⭐ Featured</span>
              </>
            )}
          </div>

          {/* Title */}
          <Link href={`/community/${project.id}`}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors mb-2">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Tags and metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                difficultyColors[project.difficulty]
              }`}
            >
              {project.difficulty}
            </span>
            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {project.category}
            </span>
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Images preview */}
          {project.images && project.images.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-2">
              {project.images.slice(0, 3).map((image, idx) => (
                <div
                  key={idx}
                  className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${project.title} preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          {showActions && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Comment</span>
              </button>

              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{project.views}</span>
              </div>

              {project.fork_count > 0 && (
                <div className="flex items-center space-x-1">
                  <GitFork className="h-4 w-4" />
                  <span>{project.fork_count}</span>
                </div>
              )}

              <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors ml-auto">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          )}

          {/* Links */}
          <div className="mt-3 flex items-center space-x-3 text-sm">
            {project.github_repo_url && (
              <a
                href={project.github_repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                View Code →
              </a>
            )}
            {project.schematic_url && (
              <a
                href={project.schematic_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Schematic →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
