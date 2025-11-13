# 🚀 Practicum Evolution Plan
## From MVP to Global STEM Learning Platform

---

## 📊 Executive Summary

### Current State (What You Have)
✅ Working Next.js application with 7 pages
✅ 3 sample projects with step-by-step instructions
✅ Basic AI mentor chat
✅ User dashboard and progress tracking
✅ Admin panel for content management
✅ Deployed on Vercel with GitHub integration

### Target State (What You Want)
🎯 **Duolingo-style** interactive learning with gamification
🎯 **GitHub/Reddit-style** community with project sharing
🎯 **Coursera-style** structured courses with educator portal
🎯 **Circuit simulation** and visual programming
🎯 **Advanced AI tutor** with debugging capabilities
🎯 **Global scaling** with monetization

---

## 🔄 Gap Analysis

### What Needs to Be Added

#### 1. Community Features (NEW)
- [ ] User profiles with portfolios
- [ ] Project posting and sharing
- [ ] Comments and discussions
- [ ] Upvote/downvote system
- [ ] Reddit-style feeds
- [ ] Project forking/remixing

#### 2. Gamification System (ENHANCE)
- [ ] XP points system
- [ ] Badges and achievements
- [ ] Streak tracking
- [ ] Leaderboards
- [ ] Daily challenges
- [ ] Level progression

#### 3. Course System (ENHANCE)
- [ ] Multi-module courses
- [ ] Video/animation support
- [ ] Auto-generated quizzes
- [ ] Progress tracking per course
- [ ] Certificates
- [ ] Course ratings

#### 4. Circuit Simulation (NEW)
- [ ] Interactive circuit builder
- [ ] Component library (Arduino, sensors, etc.)
- [ ] Visual wiring diagrams
- [ ] Code generation from circuits
- [ ] Real-time simulation
- [ ] Fritzing/TinkerCAD integration

#### 5. Advanced AI Features (ENHANCE)
- [ ] Code debugging assistance
- [ ] Circuit analysis
- [ ] Component suggestions
- [ ] Error explanations
- [ ] Design optimization
- [ ] Personalized learning paths

#### 6. Educator Portal (NEW)
- [ ] Content creation tools
- [ ] Student analytics
- [ ] AI-assisted content generation
- [ ] Course management
- [ ] Revenue sharing
- [ ] Verification system

#### 7. Enhanced Code Editor (NEW)
- [ ] Monaco/CodeMirror integration
- [ ] Syntax highlighting for Arduino C++/Python
- [ ] Real-time error checking
- [ ] Code completion
- [ ] Integrated serial monitor
- [ ] Hardware simulation

#### 8. Backend Infrastructure (UPGRADE)
- [ ] WebSocket for real-time updates
- [ ] GraphQL API
- [ ] Recommendation engine
- [ ] Analytics system
- [ ] CDN for global content
- [ ] Caching layer

---

## 🏗️ System Architecture Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
│                      (Next.js 14 + React)                       │
├─────────────────────────────────────────────────────────────────┤
│  Home  │ Learn │ Projects │ Community │ Courses │ Profile │ AI │
│  Page  │ Path  │ Builder  │   Feed    │  View   │  Page   │Chat│
└────────┴───────┴──────────┴───────────┴─────────┴─────────┴────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API GATEWAY                            │
│                    (GraphQL + REST APIs)                        │
├─────────────────────────────────────────────────────────────────┤
│  Auth  │  Content  │ Community │  AI    │ Simulation │ Payment │
│  API   │   API     │    API    │  API   │    API     │   API   │
└────────┴───────────┴───────────┴────────┴────────────┴─────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │    Redis     │  │   File Storage   │
│   (Main DB)      │  │   (Cache)    │  │   (S3/Cloudinary)│
│                  │  │              │  │                  │
│ • Users          │  │ • Sessions   │  │ • Videos         │
│ • Projects       │  │ • Real-time  │  │ • Images         │
│ • Courses        │  │ • Leaderboard│  │ • Schematics     │
│ • Comments       │  │              │  │ • User uploads   │
│ • Progress       │  │              │  │                  │
└──────────────────┘  └──────────────┘  └──────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│ OpenAI API  │ Circuit Sim │ Video CDN │ Payment  │ Email/SMS  │
│  (AI Tutor) │  (Fritzing) │ (Bunny)   │ (Stripe) │  (SendGrid)│
└─────────────┴─────────────┴───────────┴──────────┴────────────┘
```

---

## 💾 Enhanced Database Schema

### New Tables Needed

```sql
-- COMMUNITY FEATURES

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  bio TEXT,
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity TIMESTAMP,
  badges JSONB DEFAULT '[]',
  reputation INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE community_projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT,
  images TEXT[],
  schematic_url TEXT,
  code_url TEXT,
  components JSONB,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  fork_count INTEGER DEFAULT 0,
  parent_project_id UUID REFERENCES community_projects(id),
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project_comments (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES community_projects(id),
  user_id UUID REFERENCES profiles(id),
  parent_comment_id UUID REFERENCES project_comments(id),
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project_votes (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES community_projects(id),
  user_id UUID REFERENCES profiles(id),
  vote_type TEXT CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- GAMIFICATION

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  achievement_id TEXT NOT NULL,
  earned_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  xp_reward INTEGER DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY,
  challenge_type TEXT,
  description TEXT,
  xp_reward INTEGER,
  date DATE NOT NULL,
  requirements JSONB
);

CREATE TABLE user_challenge_completions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  challenge_id UUID REFERENCES daily_challenges(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- ENHANCED COURSES

CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES profiles(id),
  category TEXT,
  difficulty TEXT,
  estimated_hours INTEGER,
  thumbnail_url TEXT,
  intro_video_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  total_enrollments INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE course_modules (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  module_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT CHECK (content_type IN ('video', 'text', 'interactive', 'quiz')),
  content_url TEXT,
  duration_minutes INTEGER,
  UNIQUE(course_id, module_number)
);

CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

CREATE TABLE module_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  module_id UUID REFERENCES course_modules(id),
  completed BOOLEAN DEFAULT FALSE,
  time_spent_minutes INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  UNIQUE(user_id, module_id)
);

CREATE TABLE course_reviews (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  user_id UUID REFERENCES profiles(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- CIRCUIT BUILDER

CREATE TABLE saved_circuits (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  project_id UUID REFERENCES projects(id),
  circuit_name TEXT,
  circuit_data JSONB, -- stores component positions, connections
  generated_code TEXT,
  simulation_results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- EDUCATOR FEATURES

CREATE TABLE educator_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  is_verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  credentials TEXT[],
  total_students INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE educator_payouts (
  id UUID PRIMARY KEY,
  educator_id UUID REFERENCES educator_profiles(id),
  amount DECIMAL(10,2),
  period_start DATE,
  period_end DATE,
  status TEXT CHECK (status IN ('pending', 'processing', 'paid')),
  paid_at TIMESTAMP
);

-- ANALYTICS

CREATE TABLE user_activity_log (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  activity_type TEXT,
  activity_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE content_interactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  content_type TEXT,
  content_id UUID,
  interaction_type TEXT CHECK (interaction_type IN ('view', 'like', 'share', 'complete')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 Frontend Component Structure

### New Pages/Routes

```
app/
├── (auth)/
│   ├── login/
│   ├── signup/
│   └── forgot-password/
├── (platform)/
│   ├── layout.tsx              # Main authenticated layout
│   ├── home/                   # Dashboard/Feed
│   ├── learn/
│   │   ├── page.tsx           # Learning path overview
│   │   ├── [pathId]/          # Specific learning path
│   │   └── interactive/       # Interactive lessons
│   ├── projects/
│   │   ├── page.tsx           # Project explorer (existing)
│   │   ├── [id]/              # Project detail (existing)
│   │   ├── new/               # Create new project
│   │   └── builder/           # Circuit builder
│   ├── community/
│   │   ├── page.tsx           # Community feed (Reddit-style)
│   │   ├── [projectId]/       # Community project detail
│   │   └── trending/          # Trending projects
│   ├── courses/
│   │   ├── page.tsx           # Course catalog
│   │   ├── [courseId]/        # Course detail
│   │   └── learn/[courseId]/  # Course player
│   ├── profile/
│   │   ├── [userId]/          # User profile
│   │   ├── edit/              # Edit profile
│   │   └── portfolio/         # User's projects
│   ├── leaderboard/           # Global leaderboard
│   ├── challenges/            # Daily challenges
│   ├── simulator/             # Circuit simulator
│   └── ai-tutor/              # Standalone AI chat
├── (educator)/
│   ├── dashboard/             # Educator dashboard
│   ├── courses/
│   │   ├── create/            # Create course
│   │   ├── edit/[id]/         # Edit course
│   │   └── analytics/[id]/    # Course analytics
│   └── earnings/              # Revenue tracking
└── api/
    ├── auth/
    ├── graphql/               # GraphQL endpoint
    ├── community/
    ├── courses/
    ├── ai/
    ├── simulator/
    └── webhooks/
```

### Key New Components

```typescript
// Community Components
components/community/
├── ProjectCard.tsx           // Community project card
├── ProjectFeed.tsx           // Reddit-style feed
├── CommentThread.tsx         // Nested comments
├── VoteButtons.tsx           // Upvote/downvote
├── ProjectFilters.tsx        // Filter and sort
└── ShareModal.tsx            // Share project

// Circuit Builder Components
components/simulator/
├── CircuitCanvas.tsx         // Drag-drop canvas
├── ComponentLibrary.tsx      // Component palette
├── WiringTool.tsx            // Connection tool
├── CodeGenerator.tsx         // Auto-code generation
├── SimulationPanel.tsx       // Run simulation
└── ExportOptions.tsx         // Export schematic

// Gamification Components
components/gamification/
├── XPProgressBar.tsx         // XP and level display
├── BadgeShowcase.tsx         // Earned badges
├── StreakCounter.tsx         // Daily streak
├── DailyChallenge.tsx        // Challenge card
├── Leaderboard.tsx           // Rankings
└── AchievementToast.tsx      // Popup on earn

// Course Components
components/courses/
├── CourseCard.tsx            // Course listing card
├── CoursePlayer.tsx          // Video/content player
├── ModuleList.tsx            // Course outline
├── QuizInterface.tsx         // Interactive quiz
├── ProgressTracker.tsx       // Course progress
└── CertificateGenerator.tsx  // Completion cert

// Enhanced AI Components
components/ai/
├── AITutorPanel.tsx          // Enhanced chat
├── CodeDebugger.tsx          // Code analysis
├── CircuitAnalyzer.tsx       // Circuit feedback
├── ComponentSuggester.tsx    // Smart suggestions
└── LearningPathGenerator.tsx // Personalized path

// Code Editor Components
components/editor/
├── CodeEditor.tsx            // Monaco editor
├── SerialMonitor.tsx         // Output console
├── ErrorPanel.tsx            // Error display
├── CodeTemplates.tsx         // Starter code
└── SyntaxHelper.tsx          // Hints and docs
```

---

## 🔌 Backend API Design

### GraphQL Schema

```graphql
# User & Auth
type User {
  id: ID!
  email: String!
  profile: UserProfile!
  projects: [CommunityProject!]!
  enrolledCourses: [CourseEnrollment!]!
  achievements: [Achievement!]!
  reputation: Int!
  level: Int!
  xp: Int!
}

type UserProfile {
  id: ID!
  bio: String
  avatarUrl: String
  githubUrl: String
  linkedinUrl: String
  totalXP: Int!
  level: Int!
  streakDays: Int!
  badges: [Badge!]!
  reputation: Int!
}

# Community
type CommunityProject {
  id: ID!
  title: String!
  description: String!
  author: User!
  category: ProjectCategory!
  difficulty: DifficultyLevel!
  images: [String!]!
  schematicUrl: String
  codeUrl: String
  components: [Component!]!
  upvotes: Int!
  downvotes: Int!
  views: Int!
  forkCount: Int!
  comments: [Comment!]!
  tags: [String!]!
  isFeatured: Boolean!
  createdAt: DateTime!
}

type Comment {
  id: ID!
  content: String!
  author: User!
  upvotes: Int!
  replies: [Comment!]!
  createdAt: DateTime!
}

# Courses
type Course {
  id: ID!
  title: String!
  description: String!
  instructor: User!
  category: String!
  difficulty: DifficultyLevel!
  estimatedHours: Int!
  thumbnailUrl: String
  introVideoUrl: String
  price: Float!
  isPublished: Boolean!
  isVerified: Boolean!
  rating: Float!
  totalEnrollments: Int!
  modules: [CourseModule!]!
  reviews: [CourseReview!]!
}

type CourseModule {
  id: ID!
  moduleNumber: Int!
  title: String!
  description: String!
  contentType: ContentType!
  contentUrl: String
  durationMinutes: Int
}

# Gamification
type Achievement {
  id: String!
  name: String!
  description: String!
  iconUrl: String
  xpReward: Int!
  rarity: AchievementRarity!
  earnedAt: DateTime
}

type DailyChallenge {
  id: ID!
  challengeType: String!
  description: String!
  xpReward: Int!
  date: Date!
  requirements: JSON!
  isCompleted: Boolean!
}

# Queries
type Query {
  # User
  me: User
  user(id: ID!): User
  leaderboard(limit: Int = 100): [User!]!

  # Community
  communityFeed(
    sortBy: FeedSortType
    category: ProjectCategory
    skip: Int
    take: Int
  ): [CommunityProject!]!
  communityProject(id: ID!): CommunityProject
  trendingProjects(limit: Int = 10): [CommunityProject!]!

  # Courses
  courses(
    category: String
    difficulty: DifficultyLevel
    minRating: Float
    skip: Int
    take: Int
  ): [Course!]!
  course(id: ID!): Course
  myCourses: [CourseEnrollment!]!

  # Challenges
  dailyChallenges: [DailyChallenge!]!
  myAchievements: [Achievement!]!

  # AI
  getRecommendations(limit: Int = 10): RecommendationResult!
}

# Mutations
type Mutation {
  # Community
  createCommunityProject(input: CreateProjectInput!): CommunityProject!
  updateCommunityProject(id: ID!, input: UpdateProjectInput!): CommunityProject!
  deleteProject(id: ID!): Boolean!
  voteProject(projectId: ID!, voteType: VoteType!): CommunityProject!
  forkProject(projectId: ID!): CommunityProject!
  addComment(projectId: ID!, content: String!, parentId: ID): Comment!

  # Courses
  enrollCourse(courseId: ID!): CourseEnrollment!
  completeModule(moduleId: ID!): ModuleProgress!
  rateCourse(courseId: ID!, rating: Int!, review: String): CourseReview!

  # Gamification
  completeDailyChallenge(challengeId: ID!): DailyChallenge!

  # AI
  sendChatMessage(message: String!, context: ChatContext!): AIResponse!
  debugCode(code: String!, language: String!): DebugResult!
  analyzeCircuit(circuitData: JSON!): CircuitAnalysisResult!

  # Circuit Builder
  saveCircuit(input: SaveCircuitInput!): SavedCircuit!
  generateCodeFromCircuit(circuitId: ID!): CodeGenerationResult!
}

# Subscriptions (WebSocket)
type Subscription {
  projectCommented(projectId: ID!): Comment!
  newDailyChallenge: DailyChallenge!
  leaderboardUpdated: [User!]!
}
```

### REST API Endpoints (Fallback/Legacy)

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/community/feed
POST   /api/community/projects
GET    /api/community/projects/:id
PUT    /api/community/projects/:id
DELETE /api/community/projects/:id
POST   /api/community/projects/:id/vote
POST   /api/community/projects/:id/comment
POST   /api/community/projects/:id/fork

GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
POST   /api/courses/:id/enroll
POST   /api/courses/:id/modules/:moduleId/complete

GET    /api/leaderboard
GET    /api/challenges/daily
POST   /api/challenges/:id/complete

POST   /api/ai/chat
POST   /api/ai/debug
POST   /api/ai/analyze-circuit
POST   /api/ai/suggest-components

GET    /api/simulator/components
POST   /api/simulator/simulate
POST   /api/simulator/save

GET    /api/profile/:userId
PUT    /api/profile
GET    /api/profile/:userId/achievements

POST   /api/payments/create-checkout
POST   /api/webhooks/stripe
```

---

## 🤖 AI Integration Strategy

### AI Tutor System Prompts

```typescript
const AI_TUTOR_PROMPTS = {
  codeDebugger: `You are an expert Arduino and embedded systems debugger.

When analyzing code:
1. Identify syntax errors
2. Explain logical issues
3. Suggest fixes with explanations
4. Point out best practices
5. Warn about hardware safety

Always be encouraging and educational.`,

  circuitAnalyzer: `You are an expert electrical engineer.

When analyzing circuits:
1. Check for correct component values
2. Verify power requirements
3. Identify potential shorts or issues
4. Suggest improvements
5. Explain the circuit's operation

Use simple language for beginners.`,

  componentSuggester: `You are a helpful electronics mentor.

When suggesting components:
1. Consider project requirements
2. Suggest appropriate alternatives
3. Explain why each component is needed
4. Provide typical values/ratings
5. Warn about compatibility issues

Be practical and cost-conscious.`,

  learningPathGenerator: `You are a personalized learning advisor.

Create learning paths by:
1. Assessing current skill level
2. Identifying knowledge gaps
3. Suggesting progressive projects
4. Recommending resources
5. Setting achievable milestones

Encourage hands-on practice.`
};
```

### AI Service Architecture

```typescript
// lib/ai/services.ts

export class AITutorService {
  private openai: OpenAI;

  async debugCode(code: string, language: string, context: string) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: AI_TUTOR_PROMPTS.codeDebugger },
        {
          role: "user",
          content: `Debug this ${language} code:\n\n${code}\n\nContext: ${context}`
        }
      ],
      temperature: 0.3
    });

    return this.parseDebugResponse(response);
  }

  async analyzeCircuit(circuitData: CircuitData) {
    // Convert circuit data to descriptive text
    const description = this.describeCircuit(circuitData);

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: AI_TUTOR_PROMPTS.circuitAnalyzer },
        { role: "user", content: description }
      ]
    });

    return this.parseCircuitAnalysis(response);
  }

  async generateLearningPath(userProfile: UserProfile) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: AI_TUTOR_PROMPTS.learningPathGenerator },
        {
          role: "user",
          content: `User level: ${userProfile.level}, Completed: ${userProfile.completedProjects.join(', ')}`
        }
      ],
      functions: [
        {
          name: "generate_learning_path",
          description: "Generate a personalized learning path",
          parameters: {
            type: "object",
            properties: {
              path: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    projectId: { type: "string" },
                    reason: { type: "string" },
                    estimatedTime: { type: "string" }
                  }
                }
              }
            }
          }
        }
      ],
      function_call: { name: "generate_learning_path" }
    });

    return this.parseLearningPath(response);
  }
}
```

---

## ⚡ Circuit Simulator Integration

### Option 1: Custom React-based Simulator

```typescript
// components/simulator/CircuitCanvas.tsx

interface Component {
  id: string;
  type: 'arduino' | 'resistor' | 'led' | 'sensor' | 'wire';
  position: { x: number; y: number };
  rotation: number;
  properties: Record<string, any>;
  connections: string[]; // IDs of connected components
}

interface Circuit {
  components: Component[];
  wires: Wire[];
}

export function CircuitCanvas() {
  const [circuit, setCircuit] = useState<Circuit>({ components: [], wires: [] });
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrop = (e: DragEvent, componentType: string) => {
    const newComponent: Component = {
      id: generateId(),
      type: componentType,
      position: { x: e.clientX, y: e.clientY },
      rotation: 0,
      properties: getDefaultProperties(componentType),
      connections: []
    };

    setCircuit(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  };

  const simulateCircuit = async () => {
    const result = await fetch('/api/simulator/simulate', {
      method: 'POST',
      body: JSON.stringify({ circuit })
    });

    const simulation = await result.json();
    visualizeResults(simulation);
  };

  const generateCode = async () => {
    const result = await fetch('/api/simulator/generate-code', {
      method: 'POST',
      body: JSON.stringify({ circuit })
    });

    const { code } = await result.json();
    return code;
  };

  return (
    <div className="flex h-screen">
      <ComponentLibrary onDragStart={handleDragStart} />
      <canvas
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex-1"
      />
      <PropertiesPanel
        component={selectedComponent}
        onUpdate={updateComponentProperties}
      />
      <div className="flex flex-col gap-2 p-4">
        <button onClick={simulateCircuit} className="btn-primary">
          Run Simulation
        </button>
        <button onClick={generateCode} className="btn-secondary">
          Generate Code
        </button>
      </div>
    </div>
  );
}
```

### Option 2: Fritzing API Integration

```typescript
// lib/simulator/fritzing.ts

export class FritzingService {
  async generateDiagram(circuit: Circuit): Promise<string> {
    // Convert internal format to Fritzing format
    const fritzingData = this.toFritzingFormat(circuit);

    // Call Fritzing API or use fritzing-cli
    const response = await fetch('https://fritzing-api.example.com/generate', {
      method: 'POST',
      body: JSON.stringify(fritzingData)
    });

    const { imageUrl } = await response.json();
    return imageUrl;
  }

  async exportPCB(circuit: Circuit): Promise<Blob> {
    // Generate PCB layout from circuit
    const pcbData = await this.generatePCBLayout(circuit);
    return new Blob([pcbData], { type: 'application/octet-stream' });
  }
}
```

---

## 🎮 Gamification System Design

### XP Calculation

```typescript
// lib/gamification/xp.ts

export const XP_REWARDS = {
  COMPLETE_LESSON: 50,
  COMPLETE_PROJECT: 200,
  COMPLETE_COURSE: 1000,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 5, // per day
  UPLOAD_PROJECT: 100,
  COMMENT_HELPFUL: 20,
  PROJECT_UPVOTED: 5,
  FEATURED_PROJECT: 500,
  HELP_OTHER_USER: 30,
  PASS_QUIZ: 50,
  PERFECT_QUIZ: 100,
  COMPLETE_DAILY_CHALLENGE: 150
};

export function calculateLevel(totalXP: number): number {
  // Formula: Level = floor(sqrt(XP / 100))
  return Math.floor(Math.sqrt(totalXP / 100));
}

export function xpForNextLevel(currentLevel: number): number {
  // XP needed for next level
  return (currentLevel + 1) ** 2 * 100;
}

export function calculateStreak(lastActivity: Date, currentDate: Date): number {
  const daysDiff = Math.floor(
    (currentDate.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 1) {
    return 1; // Continue streak
  } else if (daysDiff === 0) {
    return 0; // Same day
  } else {
    return -1; // Streak broken
  }
}
```

### Achievement System

```typescript
// lib/gamification/achievements.ts

export const ACHIEVEMENTS = {
  FIRST_PROJECT: {
    id: 'first_project',
    name: 'First Steps',
    description: 'Complete your first project',
    xpReward: 100,
    rarity: 'common',
    icon: '🎯'
  },

  WEEK_STREAK: {
    id: 'week_streak',
    name: 'Dedicated Learner',
    description: 'Maintain a 7-day learning streak',
    xpReward: 250,
    rarity: 'rare',
    icon: '🔥'
  },

  HELP_OTHERS: {
    id: 'help_others_10',
    name: 'Community Helper',
    description: 'Help 10 other students with their projects',
    xpReward: 500,
    rarity: 'epic',
    icon: '🤝'
  },

  MASTER_ARDUINO: {
    id: 'master_arduino',
    name: 'Arduino Master',
    description: 'Complete 20 Arduino projects',
    xpReward: 1000,
    rarity: 'legendary',
    icon: '⚡'
  },

  PERFECT_SCORE: {
    id: 'perfect_score_5',
    name: 'Perfectionist',
    description: 'Get 100% on 5 different quizzes',
    xpReward: 300,
    rarity: 'rare',
    icon: '💯'
  }
};

export async function checkAchievements(userId: string): Promise<Achievement[]> {
  const newAchievements: Achievement[] = [];

  // Check each achievement condition
  for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
    const hasAchievement = await userHasAchievement(userId, achievement.id);
    if (hasAchievement) continue;

    const meetsCondition = await checkCondition(userId, achievement.id);
    if (meetsCondition) {
      await awardAchievement(userId, achievement.id);
      await addXP(userId, achievement.xpReward);
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}
```

### Daily Challenge Generator

```typescript
// lib/gamification/challenges.ts

export async function generateDailyChallenge(date: Date): Promise<DailyChallenge> {
  const challengeTypes = [
    'build_circuit',
    'debug_code',
    'complete_lesson',
    'help_community',
    'quiz_challenge'
  ];

  const type = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];

  const challenge: DailyChallenge = {
    id: generateId(),
    challengeType: type,
    description: getChallengeDescription(type),
    xpReward: 150 + Math.floor(Math.random() * 100),
    date: date,
    requirements: getChallengeRequirements(type)
  };

  return challenge;
}

function getChallengeDescription(type: string): string {
  const descriptions = {
    build_circuit: 'Build a simple LED circuit with Arduino',
    debug_code: 'Debug 3 broken Arduino sketches',
    complete_lesson: 'Complete any 2 lessons today',
    help_community: 'Comment on 3 community projects',
    quiz_challenge: 'Score 80% or higher on any quiz'
  };

  return descriptions[type];
}
```

---

## 📚 Course Management System

### Course Creation Flow

```typescript
// app/(educator)/courses/create/page.tsx

export default function CreateCoursePage() {
  const [course, setCourse] = useState<CourseInput>({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    modules: []
  });

  const [currentModule, setCurrentModule] = useState(0);

  const addModule = () => {
    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, {
        title: '',
        contentType: 'video',
        content: ''
      }]
    }));
  };

  const generateWithAI = async () => {
    const response = await fetch('/api/ai/generate-course', {
      method: 'POST',
      body: JSON.stringify({
        topic: course.title,
        difficulty: course.difficulty,
        moduleCount: 10
      })
    });

    const { modules } = await response.json();
    setCourse(prev => ({ ...prev, modules }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1>Create New Course</h1>

      <div className="space-y-6">
        <input
          placeholder="Course Title"
          value={course.title}
          onChange={e => setCourse({ ...course, title: e.target.value })}
          className="input-field"
        />

        <textarea
          placeholder="Course Description"
          value={course.description}
          onChange={e => setCourse({ ...course, description: e.target.value })}
          className="input-field"
          rows={4}
        />

        <div className="flex gap-4">
          <select
            value={course.category}
            onChange={e => setCourse({ ...course, category: e.target.value })}
            className="input-field"
          >
            <option value="">Select Category</option>
            <option value="arduino">Arduino</option>
            <option value="pcb">PCB Design</option>
            <option value="sensors">Sensors</option>
          </select>

          <select
            value={course.difficulty}
            onChange={e => setCourse({ ...course, difficulty: e.target.value })}
            className="input-field"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button onClick={generateWithAI} className="btn-secondary">
          Generate Course Outline with AI
        </button>

        <div className="space-y-4">
          <h2>Course Modules</h2>
          {course.modules.map((module, index) => (
            <ModuleEditor
              key={index}
              module={module}
              onChange={updatedModule => updateModule(index, updatedModule)}
            />
          ))}
          <button onClick={addModule} className="btn-secondary">
            Add Module
          </button>
        </div>

        <button onClick={saveCourse} className="btn-primary">
          Publish Course
        </button>
      </div>
    </div>
  );
}
```

---

_This plan is getting very long. I'll continue with the remaining sections..._

Would you like me to:
1. Continue with the remaining sections (User Flows, MVP Roadmap, Cost Estimates)?
2. Focus on specific sections in more detail?
3. Start implementing certain features?

Let me know which direction you'd prefer!
