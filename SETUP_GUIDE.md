# Practicum Setup Guide

Complete step-by-step guide to get Practicum running locally and in production.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Supabase Configuration](#supabase-configuration)
3. [AI Mentor Setup](#ai-mentor-setup)
4. [Production Deployment](#production-deployment)
5. [Common Issues](#common-issues)

---

## Local Development Setup

### Step 1: Install Node.js

Make sure you have Node.js 18 or higher installed:

```bash
node --version  # Should be 18.0.0 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org)

### Step 2: Install Dependencies

```bash
cd edtech
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Supabase client
- OpenAI SDK
- Lucide icons

### Step 3: Environment Variables

Create `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

You'll fill in the values in the next sections.

### Step 4: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Supabase Configuration

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if you don't have one)
4. Click "New project"
5. Fill in:
   - **Name**: practicum (or your choice)
   - **Database Password**: Strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development

### Step 2: Get API Credentials

1. In your Supabase project, go to **Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Set Up Database

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **New query**
3. Open `lib/supabase/schema.sql` from your project
4. Copy the entire contents
5. Paste into the Supabase SQL editor
6. Click **Run** (or press Ctrl/Cmd + Enter)

You should see messages confirming tables were created.

### Step 4: Verify Tables

1. Click **Table Editor** in the sidebar
2. You should see these tables:
   - profiles
   - projects
   - steps
   - progress
   - tracks
   - user_track_progress

### Step 5: Update .env.local

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## AI Mentor Setup

You can use **OpenAI** or **Anthropic Claude** (or both!). The system automatically detects which one is configured.

### Option 1: OpenAI (GPT-4o)

#### Get API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Click your profile → **View API keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)

#### Add to .env.local

```env
OPENAI_API_KEY=sk-your-key-here
```

#### Pricing

- GPT-4o: ~$5 per 1M input tokens
- Budget: ~$0.01 per conversation
- Free tier: $5 credit for new accounts

### Option 2: Anthropic Claude

#### Get API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-`)

#### Add to .env.local

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

#### Pricing

- Claude 3.5 Sonnet: ~$3 per 1M input tokens
- Budget: ~$0.006 per conversation
- Free tier: $5 credit for new accounts

### Option 3: No AI (Development Only)

If you skip AI configuration, the mentor will still work with fallback responses.

---

## Production Deployment

### Deploy to Vercel (Recommended)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/practicum.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings

#### Step 3: Environment Variables

In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=sk-your-key (optional)
ANTHROPIC_API_KEY=sk-ant-your-key (optional)
```

#### Step 4: Deploy

Click **Deploy**. Your site will be live at `your-project.vercel.app`

### Deploy to Other Platforms

#### Netlify

```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

#### Railway

1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub**
3. Add environment variables in Railway dashboard

---

## Common Issues

### Issue: "Missing Supabase environment variables"

**Solution**: Verify `.env.local` has correct Supabase URL and key.

```bash
# Check if file exists
cat .env.local

# Should contain:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Issue: AI Mentor not responding

**Causes**:
1. API key not set or invalid
2. No credits on OpenAI/Anthropic account
3. Network/firewall blocking API calls

**Solution**:
1. Check `.env.local` has correct API key
2. Verify key works: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
3. Check browser console for errors

### Issue: Database query errors

**Causes**:
1. Schema not run in Supabase
2. RLS policies preventing access

**Solution**:
1. Re-run `lib/supabase/schema.sql` in Supabase SQL Editor
2. Check RLS is enabled on tables
3. Verify policies in Supabase dashboard

### Issue: Build fails with TypeScript errors

**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Styles not loading

**Solution**:
```bash
# Ensure Tailwind compiled
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

### Issue: 404 on project detail pages

**Cause**: Next.js dynamic routes not built

**Solution**:
```bash
# Restart dev server
npm run dev
```

---

## Testing Your Setup

### 1. Homepage

- [ ] Navigate to http://localhost:3000
- [ ] See hero section with "Learn by Doing"
- [ ] Category cards display correctly

### 2. Project Explorer

- [ ] Click "Start a Project" or go to `/projects`
- [ ] See 3 sample projects
- [ ] Filter by category works
- [ ] Search works

### 3. Project Detail

- [ ] Click any project
- [ ] See project steps
- [ ] Theory links expand correctly
- [ ] AI mentor chat appears on right

### 4. AI Mentor

- [ ] Type question in mentor chat
- [ ] Get response (if API key configured)
- [ ] Or see fallback message (if no API key)

### 5. Dashboard

- [ ] Navigate to `/dashboard`
- [ ] See stats and in-progress projects
- [ ] Progress bars display

### 6. Admin Panel

- [ ] Navigate to `/admin`
- [ ] Click "Add Project"
- [ ] Fill form and submit
- [ ] New project appears in list

---

## Next Steps

Once everything is working:

1. **Customize branding** - Update colors in `tailwind.config.ts`
2. **Add real projects** - Use admin panel or edit `sampleData.ts`
3. **Enable authentication** - Integrate Supabase auth in login page
4. **Deploy to production** - Follow deployment section above
5. **Add custom domain** - Configure in Vercel/Netlify settings

---

## Getting Help

If you encounter issues not covered here:

1. Check the main [README.md](README.md)
2. Review error messages in browser console
3. Check Supabase logs in dashboard
4. Verify all environment variables are set correctly

---

**You're all set! Start building amazing STEM projects!** 🚀
