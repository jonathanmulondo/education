'use client';

import { useState, useEffect } from 'react';
import { Plus, TrendingUp, Clock, Award, Filter } from 'lucide-react';
import Link from 'next/link';
import CommunityProjectCard from '@/components/community/CommunityProjectCard';
import type { CommunityProject } from '@/types/enhanced';

export default function CommunityFeedPage() {
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all',
    'Arduino',
    'PCB',
    'Sensors',
    'Robotics',
    'IoT',
    'Power',
    'Audio',
  ];

  useEffect(() => {
    fetchProjects();
  }, [sortBy, selectedCategory]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sort: sortBy,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
      });

      const response = await fetch(`/api/community/feed?${params}`);
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (projectId: string, voteType: 'up' | 'down') => {
    try {
      await fetch('/api/community/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, vote_type: voteType }),
      });

      // Refresh projects
      fetchProjects();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2 text-white">Community Projects</h1>
            <p className="text-gray-400">
              Share your creations and discover what others are building
            </p>
          </div>

          <Link href="/community/share" className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Share Project</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-300">
                Sort by:
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSortBy('hot')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === 'hot'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Hot</span>
                  </div>
                </button>
                <button
                  onClick={() => setSortBy('new')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === 'new'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>New</span>
                  </div>
                </button>
                <button
                  onClick={() => setSortBy('top')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === 'top'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Top</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">
                Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading projects...
                </p>
              </div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <CommunityProjectCard
                  key={project.id}
                  project={project}
                  onVote={(type) => handleVote(project.id, type)}
                />
              ))
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No projects found
                </p>
                <Link href="/community/share" className="btn-primary inline-block">
                  Be the first to share!
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['arduino', 'led', 'sensor', 'esp32', 'raspberry-pi', '3d-printing'].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      #{tag}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Share complete project documentation</li>
                <li>• Include schematics and code</li>
                <li>• Be respectful and helpful</li>
                <li>• Give credit where due</li>
                <li>• Learn and teach together</li>
              </ul>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Top Contributors</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((rank) => (
                  <div key={rank} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm">
                      {rank}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-sm text-white">User {rank}</div>
                      <div className="text-xs text-gray-400">
                        {100 - rank * 10} projects
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/leaderboard"
                className="block text-center text-sm text-yellow-500 hover:text-yellow-400 mt-4"
              >
                View Full Leaderboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
