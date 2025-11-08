-- Practicum Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Electrical', 'Mechanical', 'Mechatronics', 'Biomedical', 'Physics', 'Software', 'IoT')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  duration TEXT NOT NULL,
  components_list TEXT[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Steps table
CREATE TABLE steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  video_url TEXT,
  theory_links JSONB DEFAULT '[]',
  checkpoint_quiz JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(project_id, step_number)
);

-- User Progress table
CREATE TABLE progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  step_id UUID REFERENCES steps(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  uploaded_files TEXT[] DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, step_id)
);

-- Learning Tracks table
CREATE TABLE tracks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  project_ids UUID[] DEFAULT '{}',
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- User Track Progress
CREATE TABLE user_track_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  current_project_index INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, track_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_steps_project_id ON steps(project_id);
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_project_id ON progress(project_id);
CREATE INDEX idx_user_track_progress_user_id ON user_track_progress(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_track_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects: Public read, admin write
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (true);

-- Steps: Public read
CREATE POLICY "Anyone can view steps" ON steps
  FOR SELECT USING (true);

-- Progress: Users can only manage their own progress
CREATE POLICY "Users can view own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Tracks: Public read
CREATE POLICY "Anyone can view tracks" ON tracks
  FOR SELECT USING (true);

-- User Track Progress: Users manage their own track progress
CREATE POLICY "Users can view own track progress" ON user_track_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own track progress" ON user_track_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own track progress" ON user_track_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
