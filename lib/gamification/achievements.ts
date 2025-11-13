import type { Achievement } from '@/types/enhanced';

// Achievement definitions
export const ACHIEVEMENTS: Record<string, Omit<Achievement, 'earned_at'>> = {
  // Beginner Achievements
  first_project: {
    id: 'first_project',
    name: 'First Steps',
    description: 'Complete your first project',
    icon_url: '🎯',
    xp_reward: 100,
    rarity: 'common',
    condition_type: 'project_count',
    condition_data: { count: 1 },
  },

  first_upload: {
    id: 'first_upload',
    name: 'Creator',
    description: 'Share your first project with the community',
    icon_url: '📤',
    xp_reward: 150,
    rarity: 'common',
    condition_type: 'uploaded_projects',
    condition_data: { count: 1 },
  },

  first_comment: {
    id: 'first_comment',
    name: 'Voice Heard',
    description: 'Post your first comment',
    icon_url: '💬',
    xp_reward: 50,
    rarity: 'common',
    condition_type: 'comments_posted',
    condition_data: { count: 1 },
  },

  course_complete: {
    id: 'course_complete',
    name: 'Graduate',
    description: 'Complete your first course',
    icon_url: '🎓',
    xp_reward: 200,
    rarity: 'common',
    condition_type: 'courses_completed',
    condition_data: { count: 1 },
  },

  // Streak Achievements
  week_streak: {
    id: 'week_streak',
    name: 'Dedicated Learner',
    description: 'Maintain a 7-day learning streak',
    icon_url: '🔥',
    xp_reward: 250,
    rarity: 'rare',
    condition_type: 'streak_days',
    condition_data: { days: 7 },
  },

  month_streak: {
    id: 'month_streak',
    name: 'Unstoppable',
    description: 'Maintain a 30-day learning streak',
    icon_url: '⚡',
    xp_reward: 1000,
    rarity: 'epic',
    condition_type: 'streak_days',
    condition_data: { days: 30 },
  },

  hundred_day_streak: {
    id: 'hundred_day_streak',
    name: 'Legendary Persistence',
    description: 'Maintain a 100-day learning streak',
    icon_url: '👑',
    xp_reward: 5000,
    rarity: 'legendary',
    condition_type: 'streak_days',
    condition_data: { days: 100 },
  },

  // Community Achievements
  help_others_10: {
    id: 'help_others_10',
    name: 'Community Helper',
    description: 'Help 10 other students with their projects',
    icon_url: '🤝',
    xp_reward: 500,
    rarity: 'epic',
    condition_type: 'helpful_comments',
    condition_data: { count: 10 },
  },

  popular_project: {
    id: 'popular_project',
    name: 'Influencer',
    description: 'Get 100 upvotes on a single project',
    icon_url: '⭐',
    xp_reward: 500,
    rarity: 'epic',
    condition_type: 'project_upvotes',
    condition_data: { upvotes: 100 },
  },

  viral_project: {
    id: 'viral_project',
    name: 'Viral Creator',
    description: 'Get 1000 upvotes on a single project',
    icon_url: '🚀',
    xp_reward: 2000,
    rarity: 'legendary',
    condition_type: 'project_upvotes',
    condition_data: { upvotes: 1000 },
  },

  // Expertise Achievements
  master_arduino: {
    id: 'master_arduino',
    name: 'Arduino Master',
    description: 'Complete 20 Arduino projects',
    icon_url: '⚡',
    xp_reward: 1000,
    rarity: 'legendary',
    condition_type: 'category_projects',
    condition_data: { category: 'Arduino', count: 20 },
  },

  pcb_expert: {
    id: 'pcb_expert',
    name: 'PCB Expert',
    description: 'Complete 15 PCB design projects',
    icon_url: '🔌',
    xp_reward: 1000,
    rarity: 'legendary',
    condition_type: 'category_projects',
    condition_data: { category: 'PCB', count: 15 },
  },

  sensor_specialist: {
    id: 'sensor_specialist',
    name: 'Sensor Specialist',
    description: 'Complete 10 sensor-based projects',
    icon_url: '📡',
    xp_reward: 800,
    rarity: 'epic',
    condition_type: 'category_projects',
    condition_data: { category: 'Sensors', count: 10 },
  },

  // Quiz Achievements
  perfect_score_5: {
    id: 'perfect_score_5',
    name: 'Perfectionist',
    description: 'Get 100% on 5 different quizzes',
    icon_url: '💯',
    xp_reward: 300,
    rarity: 'rare',
    condition_type: 'perfect_quizzes',
    condition_data: { count: 5 },
  },

  quiz_master: {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Get 100% on 25 different quizzes',
    icon_url: '🧠',
    xp_reward: 1500,
    rarity: 'legendary',
    condition_type: 'perfect_quizzes',
    condition_data: { count: 25 },
  },

  // Time-based Achievements
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete a challenge before 8 AM',
    icon_url: '🌅',
    xp_reward: 100,
    rarity: 'rare',
    condition_type: 'early_challenge',
    condition_data: {},
  },

  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete a challenge after 10 PM',
    icon_url: '🦉',
    xp_reward: 100,
    rarity: 'rare',
    condition_type: 'late_challenge',
    condition_data: {},
  },

  // Milestone Achievements
  level_10: {
    id: 'level_10',
    name: 'Rising Star',
    description: 'Reach level 10',
    icon_url: '🌟',
    xp_reward: 500,
    rarity: 'rare',
    condition_type: 'level_reached',
    condition_data: { level: 10 },
  },

  level_25: {
    id: 'level_25',
    name: 'Expert Engineer',
    description: 'Reach level 25',
    icon_url: '💎',
    xp_reward: 1500,
    rarity: 'epic',
    condition_type: 'level_reached',
    condition_data: { level: 25 },
  },

  level_50: {
    id: 'level_50',
    name: 'Master Builder',
    description: 'Reach level 50',
    icon_url: '🏆',
    xp_reward: 5000,
    rarity: 'legendary',
    condition_type: 'level_reached',
    condition_data: { level: 50 },
  },

  // Special Achievements
  code_debugger: {
    id: 'code_debugger',
    name: 'Bug Hunter',
    description: 'Successfully debug 50 code errors',
    icon_url: '🐛',
    xp_reward: 600,
    rarity: 'epic',
    condition_type: 'bugs_fixed',
    condition_data: { count: 50 },
  },

  circuit_designer: {
    id: 'circuit_designer',
    name: 'Circuit Designer',
    description: 'Create and save 25 circuits',
    icon_url: '🔧',
    xp_reward: 700,
    rarity: 'epic',
    condition_type: 'circuits_saved',
    condition_data: { count: 25 },
  },

  mentor: {
    id: 'mentor',
    name: 'Mentor',
    description: 'Receive 100 upvotes on your comments',
    icon_url: '👨‍🏫',
    xp_reward: 800,
    rarity: 'epic',
    condition_type: 'comment_upvotes',
    condition_data: { upvotes: 100 },
  },
};

// Achievement checker functions
export interface AchievementCheckContext {
  userId: string;
  userStats: {
    projectsCompleted: number;
    coursesCompleted: number;
    streakDays: number;
    level: number;
    uploadedProjects: number;
    commentsPosted: number;
    helpfulComments: number;
    perfectQuizzes: number;
    bugsFixed: number;
    circuitsSaved: number;
    commentUpvotes: number;
    categoryProjects: Record<string, number>;
  };
  currentActivity?: {
    type: string;
    data: any;
  };
}

/**
 * Check if user meets achievement conditions
 */
export async function checkAchievementCondition(
  achievement: Achievement,
  context: AchievementCheckContext
): Promise<boolean> {
  const { condition_type, condition_data } = achievement;
  const { userStats, currentActivity } = context;

  switch (condition_type) {
    case 'project_count':
      return userStats.projectsCompleted >= (condition_data?.count || 0);

    case 'uploaded_projects':
      return userStats.uploadedProjects >= (condition_data?.count || 0);

    case 'courses_completed':
      return userStats.coursesCompleted >= (condition_data?.count || 0);

    case 'comments_posted':
      return userStats.commentsPosted >= (condition_data?.count || 0);

    case 'streak_days':
      return userStats.streakDays >= (condition_data?.days || 0);

    case 'helpful_comments':
      return userStats.helpfulComments >= (condition_data?.count || 0);

    case 'project_upvotes':
      // Check if any project has enough upvotes
      // This would need to query the database
      return false; // Placeholder - implement with DB query

    case 'category_projects':
      const category = condition_data?.category || '';
      const count = condition_data?.count || 0;
      return (userStats.categoryProjects[category] || 0) >= count;

    case 'perfect_quizzes':
      return userStats.perfectQuizzes >= (condition_data?.count || 0);

    case 'level_reached':
      return userStats.level >= (condition_data?.level || 0);

    case 'bugs_fixed':
      return userStats.bugsFixed >= (condition_data?.count || 0);

    case 'circuits_saved':
      return userStats.circuitsSaved >= (condition_data?.count || 0);

    case 'comment_upvotes':
      return userStats.commentUpvotes >= (condition_data?.upvotes || 0);

    case 'early_challenge':
      if (currentActivity?.type === 'challenge_complete') {
        const hour = new Date(currentActivity.data.completedAt).getHours();
        return hour < 8;
      }
      return false;

    case 'late_challenge':
      if (currentActivity?.type === 'challenge_complete') {
        const hour = new Date(currentActivity.data.completedAt).getHours();
        return hour >= 22;
      }
      return false;

    default:
      return false;
  }
}

/**
 * Get all achievements user should have based on their stats
 */
export async function checkAllAchievements(
  context: AchievementCheckContext
): Promise<Achievement[]> {
  const newAchievements: Achievement[] = [];

  for (const achievement of Object.values(ACHIEVEMENTS)) {
    const meetsCondition = await checkAchievementCondition(achievement, context);
    if (meetsCondition) {
      newAchievements.push(achievement as Achievement);
    }
  }

  return newAchievements;
}

/**
 * Get rarity color for UI
 */
export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-600 bg-gray-100 border-gray-300';
    case 'rare':
      return 'text-blue-600 bg-blue-100 border-blue-300';
    case 'epic':
      return 'text-purple-600 bg-purple-100 border-purple-300';
    case 'legendary':
      return 'text-yellow-600 bg-yellow-100 border-yellow-300';
  }
}

/**
 * Get rarity badge emoji
 */
export function getRarityBadge(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return '🥉';
    case 'rare':
      return '🥈';
    case 'epic':
      return '🥇';
    case 'legendary':
      return '👑';
  }
}
