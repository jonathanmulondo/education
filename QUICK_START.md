# ⚡ Quick Start - Get Practicum Running in 5 Minutes

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

Wait for packages to install (~400 packages)...

## Step 2: Run the App (10 seconds)

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Ready in 2.3s
```

## Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

## 🎉 You're Done!

The app is now running with demo data. You can:

✅ Browse 3 sample projects
✅ View project steps with theory
✅ Test the UI and navigation
✅ Explore the dashboard
✅ Check out learning tracks
✅ Try the admin panel

---

## Optional: Enable Full Features

### Add AI Mentor (5 minutes)

1. **Get an API key** from [OpenAI](https://platform.openai.com) or [Anthropic](https://console.anthropic.com)

2. **Create `.env.local` file**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Edit `.env.local`** and add:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   # OR
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

4. **Restart the server**:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

5. **Test the mentor**: Go to any project and ask a question in the chat!

### Add Database (15 minutes)

1. **Create Supabase account** at [supabase.com](https://supabase.com)

2. **Create new project** and copy:
   - Project URL
   - Anon key

3. **Run database schema**:
   - Open Supabase SQL Editor
   - Copy content from `lib/supabase/schema.sql`
   - Paste and run

4. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Restart server** and you now have full persistence!

---

## 📖 Learn More

- **Full Setup Guide**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Features List**: See [FEATURES.md](FEATURES.md)
- **Complete Docs**: See [README.md](README.md)

---

## 🚀 Deploy to Production

### Fastest: Vercel (5 minutes)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Add environment variables
5. Deploy!

Your site is live! 🎉

---

## 🆘 Having Issues?

### App won't start
```bash
# Try clearing cache
rm -rf .next
npm run dev
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### AI Mentor not responding
- Make sure API key is in `.env.local`
- Restart server after adding keys
- Check browser console for errors

---

## 🎯 What to Try First

1. **Browse Projects** - Click "Start a Project" on homepage
2. **Open a Project** - Click "Build a Simple Arduino Temperature Monitor"
3. **Read Steps** - Scroll through the step-by-step instructions
4. **Try AI Mentor** - Ask "Why do we use a pull-up resistor?"
5. **Check Dashboard** - See your progress
6. **Admin Panel** - Try adding a project at `/admin`

---

## 📱 Pages to Explore

- `/` - Homepage with hero and categories
- `/projects` - Browse all projects with filters
- `/projects/1` - Arduino temperature project
- `/projects/2` - PCB design project
- `/projects/3` - Motor controller project
- `/dashboard` - Your learning dashboard
- `/tracks` - Learning path explorer
- `/admin` - Content management panel
- `/login` - Authentication interface

---

## 💡 Tips

- **Dark Mode**: Automatically follows system preference
- **Mobile**: Fully responsive, try on your phone!
- **Search**: Use search bar in Projects page
- **Filters**: Try filtering by category or difficulty
- **Progress**: Click "Mark as Complete" on project steps

---

## 🎓 Educational Content Included

### Project 1: Arduino Temperature Monitor
- Beginner level
- 5 detailed steps
- Theory: Sensors, I2C, Arduino programming
- Duration: 2-3 hours

### Project 2: PCB LED Controller
- Intermediate level
- 4 detailed steps
- Theory: 555 timer, PWM, PCB design
- Duration: 4-6 hours

### Project 3: DC Motor Controller
- Intermediate level
- 3 detailed steps
- Theory: H-bridge, PWM, motor control
- Duration: 3-4 hours

---

## ⚡ Build Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Run production build

# Linting
npm run lint         # Check code quality
```

---

## 🎨 Customization

Want to change colors? Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    600: '#your-color',  // Change this!
  }
}
```

Want to add projects? Edit `lib/data/sampleData.ts` or use `/admin` panel.

---

## 📊 Tech Stack at a Glance

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: TailwindCSS + Dark Mode
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o or Anthropic Claude
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

---

## 🌟 What Makes This Special

Unlike other learning platforms, Practicum:

✅ **Theory + Practice** - Learn concepts while building
✅ **AI Mentor** - Get help understanding "why"
✅ **Real Projects** - Arduino, PCB, motors, sensors
✅ **Self-Paced** - Learn at your own speed
✅ **Open Source** - Customize everything
✅ **Production Ready** - Deploy immediately

---

## 🔥 Next Steps

Now that it's running:

1. ✅ Explore the demo projects
2. ✅ Set up Supabase (optional)
3. ✅ Add AI keys (optional)
4. ✅ Customize branding
5. ✅ Add your own projects
6. ✅ Deploy to production
7. ✅ Share with students!

---

**Ready to bridge the theory-practice gap? Start exploring!** 🚀

Questions? Check the full [README.md](README.md) or [SETUP_GUIDE.md](SETUP_GUIDE.md)
