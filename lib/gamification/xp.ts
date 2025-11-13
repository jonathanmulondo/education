// XP and Level System

export const XP_REWARDS = {
  // Learning Activities
  COMPLETE_LESSON: 50,
  COMPLETE_PROJECT: 200,
  COMPLETE_COURSE: 1000,
  COMPLETE_MODULE: 75,
  PERFECT_QUIZ: 100,
  PASS_QUIZ: 50,

  // Daily Engagement
  DAILY_LOGIN: 10,
  STREAK_BONUS: 5, // Multiplied by streak days
  COMPLETE_DAILY_CHALLENGE: 150,

  // Community Contribution
  UPLOAD_PROJECT: 100,
  PROJECT_UPVOTED: 5,
  COMMENT_HELPFUL: 20,
  HELP_OTHER_USER: 30,
  FEATURED_PROJECT: 500,

  // Code & Circuit Activities
  SAVE_CIRCUIT: 25,
  RUN_SIMULATION: 15,
  DEBUG_CODE: 40,
  SHARE_CODE: 35,
} as const;

/**
 * Calculate user level based on total XP
 * Formula: Level = floor(sqrt(XP / 100))
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100));
}

/**
 * Calculate XP needed to reach next level
 */
export function xpForNextLevel(currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  return nextLevel * nextLevel * 100;
}

/**
 * Calculate XP needed from current XP to next level
 */
export function xpToNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const nextLevelXP = xpForNextLevel(currentLevel);
  return nextLevelXP - currentXP;
}

/**
 * Calculate progress percentage to next level
 */
export function levelProgress(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const currentLevelXP = currentLevel * currentLevel * 100;
  const nextLevelXP = xpForNextLevel(currentLevel);
  const xpIntoLevel = currentXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;

  return Math.floor((xpIntoLevel / xpNeededForLevel) * 100);
}

/**
 * Calculate streak bonus XP
 */
export function calculateStreakBonus(streakDays: number): number {
  if (streakDays === 0) return 0;
  // Bonus increases with streak: 5 XP per day, capped at 100 XP
  return Math.min(streakDays * XP_REWARDS.STREAK_BONUS, 100);
}

/**
 * Update or calculate streak
 * Returns: [newStreakDays, xpBonus]
 */
export function updateStreak(
  lastActivityDate: Date,
  currentDate: Date,
  currentStreak: number
): [number, number] {
  const daysDiff = Math.floor(
    (currentDate.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0) {
    // Same day - no change
    return [currentStreak, 0];
  } else if (daysDiff === 1) {
    // Next day - continue streak
    const newStreak = currentStreak + 1;
    const bonus = calculateStreakBonus(newStreak);
    return [newStreak, bonus];
  } else {
    // Streak broken - reset to 1
    return [1, 0];
  }
}

/**
 * Get level title based on level number
 */
export function getLevelTitle(level: number): string {
  if (level < 5) return 'Beginner';
  if (level < 10) return 'Apprentice';
  if (level < 20) return 'Maker';
  if (level < 30) return 'Engineer';
  if (level < 50) return 'Expert';
  if (level < 75) return 'Master';
  return 'Legend';
}

/**
 * Get level color for UI
 */
export function getLevelColor(level: number): string {
  if (level < 5) return 'text-gray-600';
  if (level < 10) return 'text-green-600';
  if (level < 20) return 'text-blue-600';
  if (level < 30) return 'text-purple-600';
  if (level < 50) return 'text-orange-600';
  if (level < 75) return 'text-red-600';
  return 'text-yellow-600';
}

/**
 * Calculate reputation score from various factors
 */
export function calculateReputation(stats: {
  upvotesReceived: number;
  helpfulComments: number;
  projectsFeatured: number;
  coursesCompleted: number;
}): number {
  return (
    stats.upvotesReceived * 2 +
    stats.helpfulComments * 10 +
    stats.projectsFeatured * 50 +
    stats.coursesCompleted * 25
  );
}
