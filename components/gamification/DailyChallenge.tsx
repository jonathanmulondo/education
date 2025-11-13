'use client';

import { useState } from 'react';
import { Calendar, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { DailyChallenge as DailyChallengeType } from '@/types/enhanced';

interface DailyChallengeProps {
  challenge: DailyChallengeType;
  onComplete?: (challengeId: string) => void;
}

export default function DailyChallenge({ challenge, onComplete }: DailyChallengeProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete?.(challenge.id);
    } catch (error) {
      console.error('Error completing challenge:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const getChallengIcon = (type: string) => {
    switch (type) {
      case 'build_circuit':
        return '⚡';
      case 'debug_code':
        return '🐛';
      case 'complete_lesson':
        return '📚';
      case 'help_community':
        return '🤝';
      case 'quiz_challenge':
        return '🎯';
      default:
        return '✨';
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'build_circuit':
        return 'from-yellow-400 to-orange-500';
      case 'debug_code':
        return 'from-red-400 to-pink-500';
      case 'complete_lesson':
        return 'from-blue-400 to-cyan-500';
      case 'help_community':
        return 'from-green-400 to-emerald-500';
      case 'quiz_challenge':
        return 'from-purple-400 to-indigo-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const icon = getChallengIcon(challenge.challenge_type);
  const colorGradient = getChallengeColor(challenge.challenge_type);

  return (
    <div className={`card relative overflow-hidden ${challenge.is_completed ? 'opacity-75' : ''}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colorGradient} opacity-5`} />

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{icon}</div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {challenge.title}
                </h3>
                {challenge.is_completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="h-3 w-3" />
                <span>Daily Challenge</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 rounded-full">
            <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="font-bold text-sm text-primary-600 dark:text-primary-400">
              +{challenge.xp_reward} XP
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {challenge.description}
        </p>

        {/* Requirements */}
        {challenge.requirements && Object.keys(challenge.requirements).length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Requirements
            </div>
            <ul className="space-y-1">
              {Object.entries(challenge.requirements).map(([key, value]) => (
                <li key={key} className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                  <span className="text-primary-600">•</span>
                  <span>{key.replace(/_/g, ' ')}: {String(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action button */}
        {!challenge.is_completed ? (
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompleting ? 'Completing...' : 'Mark as Complete'}
          </button>
        ) : (
          <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="font-semibold text-green-700 dark:text-green-300">
              Completed! Come back tomorrow for a new challenge.
            </span>
          </div>
        )}

        {/* Expires info */}
        <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Resets in {formatDistanceToNow(new Date(new Date(challenge.date).getTime() + 24 * 60 * 60 * 1000))}</span>
        </div>
      </div>
    </div>
  );
}
