'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Calendar } from 'lucide-react';
import { calculateLevel, getLevelTitle } from '@/lib/gamification/xp';
import type { UserProfile } from '@/types/enhanced';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'all'>('all');
  const [category, setCategory] = useState<'xp' | 'streak' | 'projects' | 'reputation'>('xp');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [period, category]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leaderboard?period=${period}&category=${category}`);
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: '🥇', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' };
      case 2:
        return { icon: '🥈', color: 'text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800' };
      case 3:
        return { icon: '🥉', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' };
      default:
        return { icon: rank.toString(), color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-800' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1>Leaderboard</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Top performers in the Practicum community
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rank by:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCategory('xp')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === 'xp'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>XP</span>
                  </div>
                </button>
                <button
                  onClick={() => setCategory('streak')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === 'streak'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Streak
                </button>
                <button
                  onClick={() => setCategory('reputation')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === 'reputation'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Reputation
                </button>
              </div>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Period:
              </label>
              <div className="flex space-x-2">
                {['day', 'week', 'month', 'all'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      period === p
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {p === 'all' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {users.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-2xl mb-3">
                2
              </div>
              <h3 className="font-semibold text-center mb-1">{users[1]?.bio || 'User'}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Level {calculateLevel(users[1]?.total_xp || 0)}
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                {category === 'xp' && `${users[1]?.total_xp?.toLocaleString()} XP`}
                {category === 'streak' && `${users[1]?.streak_days} days`}
                {category === 'reputation' && `${users[1]?.reputation} pts`}
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">👑</div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-3xl mb-3 ring-4 ring-yellow-300">
                1
              </div>
              <h3 className="font-bold text-lg text-center mb-1">{users[0]?.bio || 'User'}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Level {calculateLevel(users[0]?.total_xp || 0)} • {getLevelTitle(calculateLevel(users[0]?.total_xp || 0))}
              </div>
              <div className="text-2xl font-bold text-primary-600 mt-2">
                {category === 'xp' && `${users[0]?.total_xp?.toLocaleString()} XP`}
                {category === 'streak' && `${users[0]?.streak_days} days`}
                {category === 'reputation' && `${users[0]?.reputation} pts`}
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-3">
                3
              </div>
              <h3 className="font-semibold text-center mb-1">{users[2]?.bio || 'User'}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Level {calculateLevel(users[2]?.total_xp || 0)}
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                {category === 'xp' && `${users[2]?.total_xp?.toLocaleString()} XP`}
                {category === 'streak' && `${users[2]?.streak_days} days`}
                {category === 'reputation' && `${users[2]?.reputation} pts`}
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Rankings</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
            </div>
          ) : users.length > 0 ? (
            <div className="space-y-2">
              {users.map((user, index) => {
                const rank = index + 1;
                const medal = getRankMedal(rank);
                const level = calculateLevel(user.total_xp);

                return (
                  <div
                    key={user.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      rank <= 3 ? medal.bgColor : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {/* Rank */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${medal.bgColor} flex items-center justify-center font-bold text-lg ${medal.color}`}>
                      {medal.icon}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      {user.bio?.[0]?.toUpperCase() || 'U'}
                    </div>

                    {/* User Info */}
                    <div className="flex-grow">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {user.bio || `User ${rank}`}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Level {level} • {getLevelTitle(level)}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {category === 'xp' && `${user.total_xp?.toLocaleString()} XP`}
                        {category === 'streak' && `${user.streak_days} days`}
                        {category === 'reputation' && `${user.reputation} pts`}
                      </div>
                      {category === 'xp' && (
                        <div className="text-xs text-gray-500">
                          {user.badges?.length || 0} badges
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No data available for this period
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
