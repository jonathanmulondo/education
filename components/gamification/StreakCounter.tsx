'use client';

import { Flame, Calendar } from 'lucide-react';
import { calculateStreakBonus } from '@/lib/gamification/xp';

interface StreakCounterProps {
  streakDays: number;
  lastActivityDate?: string;
  compact?: boolean;
}

export default function StreakCounter({
  streakDays,
  lastActivityDate,
  compact = false,
}: StreakCounterProps) {
  const streakBonus = calculateStreakBonus(streakDays);
  const isActive = lastActivityDate
    ? new Date(lastActivityDate).toDateString() === new Date().toDateString()
    : false;

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <Flame
          className={`h-5 w-5 ${
            streakDays > 0 ? 'text-orange-500' : 'text-gray-400'
          }`}
        />
        <span className="font-bold text-gray-900 dark:text-white">
          {streakDays}
        </span>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame
            className={`h-6 w-6 ${
              streakDays > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-400'
            }`}
          />
          <h3 className="text-lg font-semibold">Daily Streak</h3>
        </div>
        {isActive && (
          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-semibold">
            Active Today
          </span>
        )}
      </div>

      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
          {streakDays}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {streakDays === 1 ? 'day' : 'days'} in a row
        </div>
      </div>

      {streakBonus > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="text-center text-sm">
            <span className="text-orange-700 dark:text-orange-300 font-semibold">
              Streak Bonus: +{streakBonus} XP per activity!
            </span>
          </div>
        </div>
      )}

      {/* Streak milestones */}
      <div className="mt-4 space-y-2">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Milestones
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[7, 14, 30, 100].map((milestone) => (
            <div
              key={milestone}
              className={`text-center p-2 rounded-lg ${
                streakDays >= milestone
                  ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500'
                  : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
              }`}
            >
              <div
                className={`text-lg font-bold ${
                  streakDays >= milestone
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-400'
                }`}
              >
                {milestone}
              </div>
              {streakDays >= milestone && (
                <div className="text-xs text-orange-600 dark:text-orange-400">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar preview (simple) */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>
            Keep learning daily to maintain your streak and earn bonus XP!
          </span>
        </div>
      </div>
    </div>
  );
}
