'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  calculateLevel,
  xpForNextLevel,
  xpToNextLevel,
  levelProgress,
  getLevelTitle,
  getLevelColor,
} from '@/lib/gamification/xp';

interface XPProgressBarProps {
  currentXP: number;
  showDetails?: boolean;
  animated?: boolean;
}

export default function XPProgressBar({
  currentXP,
  showDetails = true,
  animated = true,
}: XPProgressBarProps) {
  const [displayXP, setDisplayXP] = useState(currentXP);
  const level = calculateLevel(currentXP);
  const progress = levelProgress(currentXP);
  const xpNeeded = xpToNextLevel(currentXP);
  const nextLevelXP = xpForNextLevel(level);
  const currentLevelXP = level * level * 100;
  const xpIntoLevel = currentXP - currentLevelXP;
  const levelTitle = getLevelTitle(level);
  const levelColorClass = getLevelColor(level);

  // Animate XP count up
  useEffect(() => {
    if (!animated) {
      setDisplayXP(currentXP);
      return;
    }

    const duration = 1000; // 1 second
    const steps = 60;
    const increment = (currentXP - displayXP) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayXP(currentXP);
        clearInterval(timer);
      } else {
        setDisplayXP((prev) => prev + increment);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [currentXP, animated]);

  return (
    <div className="space-y-2">
      {/* Level and Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-lg`}
          >
            {level}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Level {level}
            </div>
            <div className={`text-xs ${levelColorClass} font-semibold`}>
              {levelTitle}
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {Math.floor(displayXP).toLocaleString()} XP
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {xpNeeded.toLocaleString()} to level {level + 1}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out flex items-center justify-end pr-2"
            style={{ width: `${progress}%` }}
          >
            {progress > 15 && (
              <span className="text-xs font-bold text-white">
                {progress}%
              </span>
            )}
          </div>
        </div>

        {/* XP range below bar */}
        {showDetails && (
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{currentLevelXP.toLocaleString()}</span>
            <span className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{nextLevelXP.toLocaleString()}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
