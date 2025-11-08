# Practicum - Learn by Doing

A full-stack web platform that helps STEM students bridge the gap between theory and practice through guided, step-by-step projects with integrated AI mentorship.

![Practicum Platform](https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=Practicum+-+Learn+by+Doing)

## 🎯 Features

### Core Functionality

- **Project Explorer** - Browse curated STEM projects with filtering by category, difficulty, and search
- **Step-by-Step Guidance** - Detailed project instructions with embedded videos, theory links, and checkpoints
- **AI Mentor Chat** - Context-aware AI assistant powered by GPT-4o or Claude 3.5 Sonnet
- **Progress Tracking** - Monitor your learning journey with completion percentages and badges
- **Learning Tracks** - Follow curated learning paths for progressive skill building
- **User Dashboard** - View in-progress and completed projects at a glance
- **Admin Panel** - Manage projects, steps, and content (curator interface)

### Project Categories

- **Electrical** - Circuit design, PCB layout, power systems
- **Mechanical** - CAD design, mechanisms, prototyping
- **Mechatronics** - Arduino, sensors, robotics, automation
- **Biomedical** - Medical devices, biosensors, health tech
- **IoT** - Connected devices, wireless communication
- **Software** - Embedded systems, firmware, applications

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - Authentication, database, and real-time features
- **PostgreSQL** - Relational database via Supabase

### AI Integration
- **OpenAI GPT-4o** - Advanced AI mentorship
- **Anthropic Claude 3.5 Sonnet** - Alternative AI provider
- Easily switchable based on API key configuration

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **Supabase account** (free tier works!)
- **OpenAI API key** OR **Anthropic API key** (optional, for AI mentor)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd edtech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # AI Mentor Configuration (Choose one or both)
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `lib/supabase/schema.sql`
   - Paste and run the SQL to create all necessary tables
   - Copy your project URL and anon key from Settings > API

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
edtech/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── mentor/              # AI mentor endpoint
│   ├── admin/                    # Admin/curator panel
│   ├── dashboard/                # User dashboard
│   ├── login/                    # Authentication page
│   ├── projects/                 # Project pages
│   │   ├── [id]/                # Dynamic project detail
│   │   └── page.tsx             # Project explorer
│   ├── tracks/                   # Learning tracks
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── Footer.tsx
│   ├── MentorChat.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── StepCard.tsx
├── lib/                         # Utilities and data
│   ├── data/
│   │   └── sampleData.ts       # Sample projects and steps
│   └── supabase/
│       ├── client.ts           # Supabase client
│       └── schema.sql          # Database schema
├── types/                       # TypeScript types
│   └── index.ts
├── .env.local.example          # Environment template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🗄️ Database Schema

### Tables

- **profiles** - User profiles (extends Supabase auth)
- **projects** - Project metadata and details
- **steps** - Individual project steps with content
- **progress** - User progress tracking per step
- **tracks** - Curated learning paths
- **user_track_progress** - User enrollment in tracks

See `lib/supabase/schema.sql` for complete schema with RLS policies.

## 🤖 AI Mentor Configuration

The AI mentor automatically detects which API key is configured:

### Using OpenAI (GPT-4o)
```env
OPENAI_API_KEY=sk-...
```

### Using Anthropic (Claude 3.5 Sonnet)
```env
ANTHROPIC_API_KEY=sk-ant-...
```

### Fallback Mode
If no API keys are configured, the mentor provides helpful guidance without AI responses.

## 📝 Sample Projects Included

1. **Build a Simple Arduino Temperature Monitor** (Beginner, Mechatronics)
   - 5 detailed steps
   - DHT22 sensor integration
   - LCD display programming
   - Theory: Temperature sensing, I2C protocol, Arduino libraries

2. **Design a Basic PCB for an LED Controller** (Intermediate, Electrical)
   - 4 detailed steps
   - 555 timer circuit design
   - KiCad PCB layout
   - Theory: PWM, schematic capture, trace width calculations

3. **Create a DC Motor Speed Controller** (Intermediate, Mechatronics)
   - 3 detailed steps
   - H-bridge motor control
   - L298N driver integration
   - Theory: PWM motor control, back-EMF protection, ADC

## 🎨 Customization

### Adding New Projects

1. **Via Admin Panel** (UI)
   - Navigate to `/admin`
   - Click "Add Project"
   - Fill in project details
   - (Currently saves to local state - integrate with Supabase for persistence)

2. **Via Code** (Development)
   - Edit `lib/data/sampleData.ts`
   - Add project to `sampleProjects` array
   - Add corresponding steps to `sampleSteps` object

### Styling

- Modify `tailwind.config.ts` for theme customization
- Edit `app/globals.css` for global styles
- Primary color can be changed in Tailwind config

## 🔒 Authentication Setup

The login page is ready but needs Supabase integration:

```typescript
// Example: app/login/page.tsx
import { supabase } from '@/lib/supabase/client';

const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});
```

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces
- Collapsible navigation on mobile

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Compatible with any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🧪 Development Workflow

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📊 Database Seeding

To populate your Supabase database with sample data:

1. Run the schema from `lib/supabase/schema.sql`
2. Insert sample projects using Supabase SQL editor or via Admin panel
3. Create test user account through login page

## 🛠️ Future Enhancements

### Planned Features
- [ ] Video upload and hosting
- [ ] Code sandbox for trying code snippets
- [ ] Community comments and discussions
- [ ] Peer review system
- [ ] Gamification with badges and leaderboards
- [ ] Mobile app (React Native)
- [ ] Offline mode with PWA
- [ ] Multi-language support
- [ ] Certificate generation
- [ ] Integration with LMS platforms

### Possible Integrations
- GitHub for code repositories
- Tinkercad for circuit simulation
- KiCad for PCB design collaboration
- Discord for community
- YouTube for video hosting

## 🤝 Contributing

This is a prototype/MVP. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for educational or commercial purposes.

## 🆘 Troubleshooting

### AI Mentor not responding
- Check API keys in `.env.local`
- Verify API key has credits/quota
- Check browser console for errors

### Database connection issues
- Verify Supabase URL and anon key
- Check RLS policies are correctly set
- Ensure database schema is up to date

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall
- Check Node.js version (18+)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check documentation
- Review sample code

---

**Built with ❤️ for STEM students everywhere**

Start building real projects, not just learning theory!
