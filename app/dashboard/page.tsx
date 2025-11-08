'use client';

import { Award, BookOpen, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { sampleProjects } from '@/lib/data/sampleData';

export default function DashboardPage() {
  // Mock user data - in production, fetch from Supabase based on auth user
  const user = {
    name: 'Student Name',
    email: 'student@example.com',
  };

  // Mock progress data
  const inProgressProjects = [
    { ...sampleProjects[0], progress: 60 },
    { ...sampleProjects[2], progress: 30 },
  ];

  const completedProjects = [sampleProjects[1]];

  const stats = [
    {
      label: 'Projects In Progress',
      value: inProgressProjects.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Projects Completed',
      value: completedProjects.length,
      icon: Award,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900',
    },
    {
      label: 'Hours Learned',
      value: '12.5',
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      label: 'Skill Level',
      value: 'Beginner',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card">
                <div className="flex items-center space-x-4">
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* In Progress Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2>Continue Learning</h2>
            <Link href="/projects" className="text-primary-600 hover:text-primary-700">
              Browse More Projects
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressProjects.map((project) => (
              <ProjectCard key={project.id} project={project} progress={project.progress} />
            ))}
          </div>
        </div>

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2>Completed Projects</h2>
              <Link href="/projects" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} progress={100} />
              ))}
            </div>
          </div>
        )}

        {/* Learning Recommendations */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Complete your Arduino project
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You're 60% done with the Temperature Monitor project. Just 2 more steps to go!
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Award className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-1">
                  Earn your first badge
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Complete one more project to earn the "Embedded Systems Explorer" badge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
