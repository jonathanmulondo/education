'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { sampleProjects } from '@/lib/data/sampleData';
import type { Project, ProjectCategory, DifficultyLevel } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(sampleProjects);

  useEffect(() => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter((project) => project.difficulty === selectedDifficulty);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, projects]);

  const categories: (ProjectCategory | 'All')[] = [
    'All',
    'Electrical',
    'Mechanical',
    'Mechatronics',
    'Biomedical',
    'Physics',
    'Software',
    'IoT',
  ];

  const difficulties: (DifficultyLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Project Explorer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse hands-on STEM projects with step-by-step guidance
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | 'All')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'All')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="mt-4 text-primary-600 hover:text-primary-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
