// Database Types
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  difficulty: DifficultyLevel;
  duration: string; // e.g., "2-3 hours"
  components_list: string[];
  learning_objectives: string[];
  image_url?: string;
  created_at: string;
}

export interface Step {
  id: string;
  project_id: string;
  step_number: number;
  title: string;
  content: string;
  video_url?: string;
  theory_links: TheoryLink[];
  checkpoint_quiz?: Quiz;
}

export interface TheoryLink {
  concept: string;
  description: string;
  formula?: string;
  external_link?: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface Progress {
  id: string;
  user_id: string;
  project_id: string;
  step_id: string;
  completed: boolean;
  notes?: string;
  uploaded_files?: string[];
  completed_at?: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  project_ids: string[];
  category: ProjectCategory;
}

export interface UserTrackProgress {
  id: string;
  user_id: string;
  track_id: string;
  current_project_index: number;
  started_at: string;
  completed_at?: string;
}

// Enums
export type ProjectCategory =
  | 'Electrical'
  | 'Mechanical'
  | 'Mechatronics'
  | 'Biomedical'
  | 'Physics'
  | 'Software'
  | 'IoT';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

// AI Mentor Types
export interface MentorMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface MentorContext {
  project_id: string;
  step_id?: string;
  user_query: string;
  conversation_history: MentorMessage[];
}

// Component Props
export interface ProjectCardProps {
  project: Project;
  progress?: number; // 0-100
}

export interface StepCardProps {
  step: Step;
  isCompleted: boolean;
  isActive: boolean;
  onComplete: () => void;
}
