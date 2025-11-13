-- ENHANCED PRACTICUM SCHEMA
-- Run this after the base schema to add new features

-- ============================================================================
-- COMMUNITY FEATURES
-- ============================================================================

-- User Profiles (Enhanced)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  badges JSONB DEFAULT '[]',
  reputation INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Projects (User-shared projects)
CREATE TABLE community_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  images TEXT[] DEFAULT '{}',
  schematic_url TEXT,
  code_url TEXT,
  github_repo_url TEXT,
  components JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  fork_count INTEGER DEFAULT 0,
  parent_project_id UUID REFERENCES community_projects(id),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Comments
CREATE TABLE project_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES community_projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parent_comment_id UUID REFERENCES project_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Votes
CREATE TABLE project_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES community_projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Comment Votes
CREATE TABLE comment_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID REFERENCES project_comments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- ============================================================================
-- GAMIFICATION SYSTEM
-- ============================================================================

-- Achievements Definition
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  xp_reward INTEGER DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')) DEFAULT 'common',
  condition_type TEXT NOT NULL,
  condition_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT REFERENCES achievements(id) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Daily Challenges
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 150,
  date DATE NOT NULL UNIQUE,
  requirements JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Challenge Completions
CREATE TABLE user_challenge_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES daily_challenges(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- XP History (for tracking XP gains)
CREATE TABLE xp_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  source_id UUID,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ENHANCED COURSE SYSTEM
-- ============================================================================

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Beginner',
  estimated_hours INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  intro_video_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  total_enrollments INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course Modules
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  module_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT CHECK (content_type IN ('video', 'text', 'interactive', 'quiz', 'project')) NOT NULL,
  content_url TEXT,
  content_data JSONB,
  duration_minutes INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, module_number)
);

-- Course Enrollments
CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Module Progress
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  time_spent_minutes INTEGER DEFAULT 0,
  quiz_score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Course Reviews
CREATE TABLE course_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- ============================================================================
-- CIRCUIT BUILDER & SIMULATOR
-- ============================================================================

-- Saved Circuits
CREATE TABLE saved_circuits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  circuit_name TEXT NOT NULL,
  circuit_data JSONB NOT NULL,
  generated_code TEXT,
  language TEXT DEFAULT 'cpp',
  simulation_results JSONB,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- EDUCATOR FEATURES
-- ============================================================================

-- Educator Profiles
CREATE TABLE educator_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  credentials TEXT[] DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',
  total_students INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  commission_rate DECIMAL(5,2) DEFAULT 70.00,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Educator Payouts
CREATE TABLE educator_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  educator_id UUID REFERENCES educator_profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'paid', 'failed')) DEFAULT 'pending',
  payment_method TEXT,
  transaction_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- ANALYTICS & ACTIVITY
-- ============================================================================

-- User Activity Log
CREATE TABLE user_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_user_date ON user_activity_log(user_id, created_at DESC);

-- Content Interactions
CREATE TABLE content_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  interaction_type TEXT CHECK (interaction_type IN ('view', 'like', 'share', 'complete', 'bookmark')) NOT NULL,
  interaction_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_interactions_content ON content_interactions(content_type, content_id);
CREATE INDEX idx_interactions_user ON content_interactions(user_id, created_at DESC);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Community Projects
CREATE INDEX idx_community_projects_user ON community_projects(user_id);
CREATE INDEX idx_community_projects_category ON community_projects(category);
CREATE INDEX idx_community_projects_published ON community_projects(is_published, published_at DESC);
CREATE INDEX idx_community_projects_featured ON community_projects(is_featured, published_at DESC);
CREATE INDEX idx_community_projects_votes ON community_projects(upvotes DESC);

-- Comments
CREATE INDEX idx_comments_project ON project_comments(project_id, created_at DESC);
CREATE INDEX idx_comments_user ON project_comments(user_id);
CREATE INDEX idx_comments_parent ON project_comments(parent_comment_id);

-- Courses
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_published ON courses(is_published, created_at DESC);
CREATE INDEX idx_courses_rating ON courses(rating DESC, total_ratings DESC);

-- Gamification
CREATE INDEX idx_user_profiles_xp ON user_profiles(total_xp DESC);
CREATE INDEX idx_user_profiles_level ON user_profiles(level DESC);
CREATE INDEX idx_xp_history_user ON xp_history(user_id, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- User Profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Community Projects
ALTER TABLE community_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published projects are viewable by everyone"
  ON community_projects FOR SELECT
  USING (is_published = true OR user_id = auth.uid());

CREATE POLICY "Users can create own projects"
  ON community_projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON community_projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON community_projects FOR DELETE
  USING (auth.uid() = user_id);

-- Project Comments
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON project_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON project_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON project_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON project_comments FOR DELETE
  USING (auth.uid() = user_id);

-- Votes
ALTER TABLE project_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Votes are viewable by everyone"
  ON project_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own votes"
  ON project_votes FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Comment votes are viewable by everyone"
  ON comment_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own comment votes"
  ON comment_votes FOR ALL
  USING (auth.uid() = user_id);

-- Courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by everyone"
  ON courses FOR SELECT
  USING (is_published = true OR instructor_id = auth.uid());

CREATE POLICY "Instructors can create courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = instructor_id);

-- Course Enrollments
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Module Progress
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can track own progress"
  ON module_progress FOR ALL
  USING (auth.uid() = user_id);

-- Saved Circuits
ALTER TABLE saved_circuits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own circuits and public circuits"
  ON saved_circuits FOR SELECT
  USING (user_id = auth.uid() OR is_public = true);

CREATE POLICY "Users can manage own circuits"
  ON saved_circuits FOR ALL
  USING (auth.uid() = user_id);

-- User Profiles (XP/Achievements)
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "XP history viewable by owner"
  ON xp_history FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update project vote counts
CREATE OR REPLACE FUNCTION update_project_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE community_projects SET upvotes = upvotes + 1 WHERE id = NEW.project_id;
    ELSE
      UPDATE community_projects SET downvotes = downvotes + 1 WHERE id = NEW.project_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE community_projects SET upvotes = upvotes - 1 WHERE id = OLD.project_id;
    ELSE
      UPDATE community_projects SET downvotes = downvotes - 1 WHERE id = OLD.project_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE community_projects SET upvotes = upvotes - 1 WHERE id = OLD.project_id;
    ELSE
      UPDATE community_projects SET downvotes = downvotes - 1 WHERE id = OLD.project_id;
    END IF;
    IF NEW.vote_type = 'up' THEN
      UPDATE community_projects SET upvotes = upvotes + 1 WHERE id = NEW.project_id;
    ELSE
      UPDATE community_projects SET downvotes = downvotes + 1 WHERE id = NEW.project_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER project_vote_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON project_votes
FOR EACH ROW EXECUTE FUNCTION update_project_vote_count();

-- Function to update user XP and level
CREATE OR REPLACE FUNCTION add_user_xp(p_user_id UUID, p_amount INTEGER, p_source TEXT, p_source_id UUID DEFAULT NULL, p_description TEXT DEFAULT NULL)
RETURNS void AS $$
DECLARE
  v_new_total INTEGER;
  v_new_level INTEGER;
BEGIN
  -- Add XP to user profile
  UPDATE user_profiles
  SET total_xp = total_xp + p_amount
  WHERE user_id = p_user_id
  RETURNING total_xp INTO v_new_total;

  -- Calculate new level
  v_new_level := FLOOR(SQRT(v_new_total / 100.0));

  -- Update level
  UPDATE user_profiles
  SET level = v_new_level
  WHERE user_id = p_user_id;

  -- Log XP gain
  INSERT INTO xp_history (user_id, amount, source, source_id, description)
  VALUES (p_user_id, p_amount, source, p_source_id, p_description);
END;
$$ LANGUAGE plpgsql;

-- Function to update course rating
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE courses
  SET
    rating = (SELECT AVG(rating) FROM course_reviews WHERE course_id = NEW.course_id),
    total_ratings = (SELECT COUNT(*) FROM course_reviews WHERE course_id = NEW.course_id)
  WHERE id = NEW.course_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER course_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON course_reviews
FOR EACH ROW EXECUTE FUNCTION update_course_rating();

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
AFTER INSERT ON profiles
FOR EACH ROW EXECUTE FUNCTION create_user_profile_on_signup();

-- ============================================================================
-- SEED ACHIEVEMENTS
-- ============================================================================

INSERT INTO achievements (id, name, description, xp_reward, rarity, condition_type, condition_data) VALUES
('first_project', 'First Steps', 'Complete your first project', 100, 'common', 'project_count', '{"count": 1}'),
('week_streak', 'Dedicated Learner', 'Maintain a 7-day learning streak', 250, 'rare', 'streak_days', '{"days": 7}'),
('month_streak', 'Unstoppable', 'Maintain a 30-day learning streak', 1000, 'epic', 'streak_days', '{"days": 30}'),
('help_others_10', 'Community Helper', 'Help 10 other students', 500, 'epic', 'helpful_comments', '{"count": 10}'),
('master_arduino', 'Arduino Master', 'Complete 20 Arduino projects', 1000, 'legendary', 'category_projects', '{"category": "Arduino", "count": 20}'),
('perfect_score_5', 'Perfectionist', 'Get 100% on 5 quizzes', 300, 'rare', 'perfect_quizzes', '{"count": 5}'),
('first_upload', 'Creator', 'Share your first project', 150, 'common', 'uploaded_projects', '{"count": 1}'),
('popular_project', 'Influencer', 'Get 100 upvotes on a project', 500, 'epic', 'project_upvotes', '{"upvotes": 100}'),
('course_complete', 'Graduate', 'Complete your first course', 200, 'common', 'courses_completed', '{"count": 1}'),
('early_bird', 'Early Bird', 'Complete a challenge before 8 AM', 100, 'rare', 'early_challenge', '{}')
ON CONFLICT (id) DO NOTHING;
