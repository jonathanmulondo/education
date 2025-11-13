'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { Achievement } from '@/types/enhanced';
import { getRarityColor, getRarityBadge } from '@/lib/gamification/achievements';

interface AchievementToastProps {
  achievement: Achievement;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function AchievementToast({
  achievement,
  onClose,
  autoClose = true,
  duration = 5000,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger confetti
    const colors = {
      common: ['#6B7280', '#9CA3AF'],
      rare: ['#3B82F6', '#60A5FA'],
      epic: ['#8B5CF6', '#A78BFA'],
      legendary: ['#EAB308', '#FCD34D'],
    };

    confetti({
      particleCount: achievement.rarity === 'legendary' ? 150 : 100,
      spread: achievement.rarity === 'legendary' ? 180 : 70,
      origin: { y: 0.6 },
      colors: colors[achievement.rarity],
      disableForReducedMotion: true,
    });

    // Auto close
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [achievement, autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const rarityColor = getRarityColor(achievement.rarity);
  const rarityBadge = getRarityBadge(achievement.rarity);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50 max-w-md"
        >
          <div
            className={`card border-2 ${rarityColor} shadow-2xl relative overflow-hidden`}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="relative">
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="text-5xl animate-bounce">
                    {achievement.icon_url || rarityBadge}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Achievement Unlocked!
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {achievement.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold uppercase ${rarityColor}`}
                      >
                        {achievement.rarity}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-primary-600 font-bold">
                      <Sparkles className="h-4 w-4" />
                      <span>+{achievement.xp_reward} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
