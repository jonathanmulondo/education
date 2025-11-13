'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, Zap, Users, Target, Flame, Star, TrendingUp, Award, Code } from 'lucide-react';
import type { CommunityProject, UserProfile } from '@/types/enhanced';

export default function Home() {
  const [topProjects, setTopProjects] = useState<CommunityProject[]>([]);
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch top community projects
      const projectsRes = await fetch('/api/community/feed?sort=top&limit=3');
      const projectsData = await projectsRes.json();
      setTopProjects(projectsData.projects || []);

      // Fetch top leaderboard users
      const leaderboardRes = await fetch('/api/leaderboard?period=week&category=xp&limit=5');
      const leaderboardData = await leaderboardRes.json();
      setLeaderboard(leaderboardData.users || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Dark with Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 px-4">
        {/* Animated gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-transparent blur-3xl rounded-full animate-pulse" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">Level Up Your Skills</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent">
            Welcome.
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            Master STEM Through Gamified Projects
          </p>

          <p className="text-lg mb-10 max-w-3xl mx-auto text-gray-400">
            Build Arduino circuits, design PCBs, create IoT devices. Earn XP, unlock achievements,
            compete on leaderboards, and join a global community of makers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2 shadow-lg shadow-yellow-500/50"
            >
              <span>Start Building</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/community"
              className="bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Join Community</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-black">2,500+</div>
            <div className="text-sm text-black/70">Active Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black">150+</div>
            <div className="text-sm text-black/70">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black">50K+</div>
            <div className="text-sm text-black/70">XP Earned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black">1,200+</div>
            <div className="text-sm text-black/70">Achievements</div>
          </div>
        </div>
      </section>

      {/* Gamification Features */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Level Up While You Learn</h2>
            <p className="text-gray-400 text-lg">Every project completed gets you closer to mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* XP System */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-all">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Earn XP</h3>
              <p className="text-gray-400 text-sm">
                Complete projects, help others, and maintain streaks to gain experience points
              </p>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Unlock Badges</h3>
              <p className="text-gray-400 text-sm">
                Collect 25+ unique achievements from common to legendary rarity
              </p>
            </div>

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Compete</h3>
              <p className="text-gray-400 text-sm">
                Climb the leaderboard and compete with makers worldwide
              </p>
            </div>

            {/* Streaks */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Daily Streaks</h3>
              <p className="text-gray-400 text-sm">
                Build consistency with daily challenges and bonus XP rewards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Top Makers This Week</h2>
              <p className="text-gray-400">Compete for the top spot and earn exclusive rewards</p>
            </div>
            <Link
              href="/leaderboard"
              className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center space-x-1"
            >
              <span>View Full Leaderboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto" />
            </div>
          ) : leaderboard.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {leaderboard.map((user, index) => (
                <div
                  key={user.id}
                  className={`bg-gradient-to-br ${
                    index === 0
                      ? 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/50'
                      : index === 1
                      ? 'from-gray-400/20 to-gray-500/10 border-gray-400/50'
                      : index === 2
                      ? 'from-orange-500/20 to-orange-600/10 border-orange-500/50'
                      : 'from-gray-800 to-gray-900 border-gray-700'
                  } border rounded-xl p-4 text-center`}
                >
                  <div className="text-2xl font-bold mb-2">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    {user.bio?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">
                    {user.bio || `User ${index + 1}`}
                  </div>
                  <div className="text-yellow-400 text-xs font-bold">
                    {user.total_xp?.toLocaleString() || 0} XP
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
              <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Be the first to join the leaderboard!</p>
            </div>
          )}
        </div>
      </section>

      {/* Community Projects */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Trending Projects</h2>
              <p className="text-gray-400">See what the community is building</p>
            </div>
            <Link
              href="/community"
              className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center space-x-1"
            >
              <span>Explore Community</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto" />
            </div>
          ) : topProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/community/${project.id}`}
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all group"
                >
                  {project.images && project.images.length > 0 && (
                    <div className="aspect-video bg-gray-700 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{project.upvotes || 0}</span>
                        </span>
                        <span>{project.views || 0} views</span>
                      </div>
                      {project.difficulty && (
                        <span className={`px-2 py-1 rounded ${
                          project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                          project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {project.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <Code className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No projects yet. Be the first to share!</p>
              <Link href="/community/share" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Share Your Project →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Daily Challenge CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <Target className="h-16 w-16 text-black mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-black">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-black/80">
            Complete your first project today and earn 200 XP
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-black text-yellow-400 px-8 py-4 rounded-lg font-bold hover:bg-gray-900 transition-colors inline-flex items-center space-x-2"
            >
              <span>Browse Projects</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-800 transition-colors inline-flex items-center justify-center"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
