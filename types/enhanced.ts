// Enhanced types for new features

// ============================================================================
// COMMUNITY TYPES
// ============================================================================

export interface UserProfile {
  id: string;
  user_id: string;
  bio?: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  total_xp: number;
  level: number;
  streak_days: number;
  last_activity_date: string;
  badges: Badge[];
  reputation: number;
  created_at: string;
}

export interface CommunityProject {
  id: string;
  user_id: string;
  author?: UserProfile; // Populated via join
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  images: string[];
  schematic_url?: string;
  code_url?: string;
  github_repo_url?: string;
  components: Component[];
  tags: string[];
  upvotes: number;
  downvotes: number;
  views: number;
  fork_count: number;
  parent_project_id?: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Component {
  type: string;
  name: string;
  quantity: number;
  specs?: Record<string, any>;
}

export interface ProjectComment {
  id: string;
  project_id: string;
  user_id: string;
  author?: UserProfile;
  parent_comment_id?: string;
  content: string;
  upvotes: number;
  downvotes: number;
  replies?: ProjectComment[];
  created_at: string;
  updated_at: string;
}

export interface ProjectVote {
  id: string;
  project_id: string;
  user_id: string;
  vote_type: 'up' | 'down';
  created_at: string;
}

// ============================================================================
// GAMIFICATION TYPES
// ============================================================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon_url?: string;
  xp_reward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition_type: string;
  condition_data?: Record<string, any>;
  earned_at?: string; // If user has earned it
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  earned_at: string;
}

export interface DailyChallenge {
  id: string;
  challenge_type: string;
  title: string;
  description: string;
  xp_reward: number;
  date: string;
  requirements: Record<string, any>;
  is_completed?: boolean;
  created_at: string;
}

export interface XPHistory {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  source_id?: string;
  description?: string;
  created_at: string;
}

// ============================================================================
// COURSE TYPES
// ============================================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id?: string;
  instructor?: UserProfile;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_hours: number;
  thumbnail_url?: string;
  intro_video_url?: string;
  price: number;
  is_published: boolean;
  is_verified: boolean;
  rating: number;
  total_ratings: number;
  total_enrollments: number;
  tags: string[];
  modules?: CourseModule[];
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  module_number: number;
  title: string;
  description?: string;
  content_type: 'video' | 'text' | 'interactive' | 'quiz' | 'project';
  content_url?: string;
  content_data?: Record<string, any>;
  duration_minutes: number;
  is_free: boolean;
  is_completed?: boolean;
  quiz_score?: number;
  created_at: string;
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  course?: Course;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage: number;
  last_accessed_at: string;
}

export interface ModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  time_spent_minutes: number;
  quiz_score?: number;
  completed_at?: string;
  created_at: string;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string;
  author?: UserProfile;
  rating: number;
  review_text?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// CIRCUIT SIMULATOR TYPES
// ============================================================================

export interface CircuitComponent {
  id: string;
  type: 'arduino' | 'resistor' | 'led' | 'capacitor' | 'sensor' | 'motor' | 'transistor' | 'ic' | 'wire';
  position: { x: number; y: number };
  rotation: number;
  properties: Record<string, any>;
  connections: Connection[];
}

export interface Connection {
  from_component_id: string;
  from_pin: string;
  to_component_id: string;
  to_pin: string;
}

export interface Circuit {
  components: CircuitComponent[];
  wires: Connection[];
}

export interface SavedCircuit {
  id: string;
  user_id: string;
  project_id?: string;
  circuit_name: string;
  circuit_data: Circuit;
  generated_code?: string;
  language: string;
  simulation_results?: SimulationResult;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SimulationResult {
  success: boolean;
  output?: string;
  errors?: string[];
  warnings?: string[];
  voltage_readings?: Record<string, number>;
  current_readings?: Record<string, number>;
}

// ============================================================================
// EDUCATOR TYPES
// ============================================================================

export interface EducatorProfile {
  id: string;
  user_id: string;
  is_verified: boolean;
  bio?: string;
  credentials: string[];
  specializations: string[];
  total_students: number;
  total_revenue: number;
  commission_rate: number;
  verified_at?: string;
  created_at: string;
}

export interface EducatorPayout {
  id: string;
  educator_id: string;
  amount: number;
  period_start: string;
  period_end: string;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  payment_method?: string;
  transaction_id?: string;
  paid_at?: string;
  created_at: string;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  activity_data?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface ContentInteraction {
  id: string;
  user_id: string;
  content_type: string;
  content_id: string;
  interaction_type: 'view' | 'like' | 'share' | 'complete' | 'bookmark';
  interaction_data?: Record<string, any>;
  created_at: string;
}

// ============================================================================
// AI ENHANCED TYPES
// ============================================================================

export interface CodeDebugRequest {
  code: string;
  language: 'cpp' | 'python' | 'javascript';
  context?: string;
  error_message?: string;
}

export interface CodeDebugResponse {
  has_errors: boolean;
  errors: CodeError[];
  suggestions: CodeSuggestion[];
  fixed_code?: string;
  explanation: string;
}

export interface CodeError {
  line: number;
  column?: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  type: 'syntax' | 'logic' | 'runtime' | 'style';
}

export interface CodeSuggestion {
  title: string;
  description: string;
  code_snippet?: string;
  line?: number;
}

export interface CircuitAnalysisRequest {
  circuit: Circuit;
  analysis_type: 'validate' | 'optimize' | 'explain';
}

export interface CircuitAnalysisResponse {
  is_valid: boolean;
  issues: CircuitIssue[];
  suggestions: string[];
  explanation: string;
  optimization_tips?: string[];
}

export interface CircuitIssue {
  component_id: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  fix_suggestion?: string;
}

export interface LearningPathSuggestion {
  path: ProjectSuggestion[];
  reasoning: string;
  estimated_time: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
}

export interface ProjectSuggestion {
  project_id: string;
  reason: string;
  estimated_time: string;
  skills_learned: string[];
  prerequisites?: string[];
}

// ============================================================================
// UI COMPONENT PROPS
// ============================================================================

export interface CommunityProjectCardProps {
  project: CommunityProject;
  onVote?: (voteType: 'up' | 'down') => void;
  showActions?: boolean;
}

export interface CommentThreadProps {
  comments: ProjectComment[];
  projectId: string;
  onReply?: (commentId: string, content: string) => void;
  onVote?: (commentId: string, voteType: 'up' | 'down') => void;
}

export interface CircuitCanvasProps {
  circuit?: Circuit;
  onChange?: (circuit: Circuit) => void;
  mode?: 'edit' | 'view' | 'simulate';
}

export interface CodeEditorProps {
  code: string;
  language: 'cpp' | 'python' | 'javascript';
  onChange?: (code: string) => void;
  onRun?: () => void;
  readOnly?: boolean;
}

export interface CoursePlayerProps {
  course: Course;
  currentModuleId: string;
  onModuleComplete?: (moduleId: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface LeaderboardProps {
  users: UserProfile[];
  currentUserId?: string;
  period?: 'day' | 'week' | 'month' | 'all';
}

export interface AchievementToastProps {
  achievement: Achievement;
  onClose?: () => void;
}

export interface XPProgressBarProps {
  currentXP: number;
  level: number;
  showDetails?: boolean;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface CreateCommunityProjectRequest {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  components: Component[];
  tags: string[];
  images?: string[];
  schematic_url?: string;
  code_url?: string;
  github_repo_url?: string;
}

export interface UpdateCommunityProjectRequest extends Partial<CreateCommunityProjectRequest> {
  is_published?: boolean;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_hours: number;
  price?: number;
  tags: string[];
}

export interface EnrollCourseRequest {
  course_id: string;
}

export interface CompleteModuleRequest {
  module_id: string;
  time_spent_minutes: number;
  quiz_score?: number;
}

export interface FeedFilters {
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  sort_by?: 'recent' | 'popular' | 'trending';
  time_range?: 'day' | 'week' | 'month' | 'all';
}

export interface PaginationParams {
  skip?: number;
  take?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  skip: number;
  take: number;
  has_more: boolean;
}
