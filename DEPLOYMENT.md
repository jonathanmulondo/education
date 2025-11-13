# 🚀 Deployment Instructions

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `practicum` (or your choice)
   - **Description**: "STEM learning platform - Learn by doing with guided projects and AI mentorship"
   - **Visibility**: Public or Private
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**

### Option B: Using GitHub CLI (If installed)

```bash
gh repo create practicum --public --source=. --remote=origin --push
```

---

## Step 2: Push Code to GitHub

After creating the repository on GitHub, you'll see commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/practicum.git

# Push the code
git branch -M main
git push -u origin main
```

**Your code is now on GitHub!** 🎉

---

## Step 3: Deploy to Vercel

### Quick Deploy (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** or **Log In** (use your GitHub account)
3. Click **Add New...** → **Project**
4. Click **Import Git Repository**
5. Find your `practicum` repository and click **Import**
6. Vercel auto-detects Next.js settings ✅
7. Click **Deploy**

**That's it!** Your site will be live in ~60 seconds at:
```
https://practicum-[random].vercel.app
```

---

## Step 4: Add Environment Variables (Optional but Recommended)

For full AI mentor functionality:

1. In Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add these variables:

### For Supabase (Database)
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase project URL
- **Environment**: Production, Preview, Development

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon key
- **Environment**: Production, Preview, Development

### For AI Mentor (Choose one)
- **Name**: `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`)
- **Value**: Your API key
- **Environment**: Production, Preview, Development

3. Click **Save**
4. Go to **Deployments** tab
5. Click **⋯** on latest deployment → **Redeploy**

---

## Step 5: Custom Domain (Optional)

1. In Vercel project → **Settings** → **Domains**
2. Add your domain (e.g., `practicum.yourdomain.com`)
3. Follow DNS configuration instructions
4. SSL certificate auto-generated ✅

---

## Alternative: Deploy to Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Railway

1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository
4. Add environment variables
5. Deploy!

---

## Quick Commands Reference

```bash
# Your local repository is ready at:
# C:\Users\mulon\Desktop\edtech

# To create GitHub repo and push:
git remote add origin https://github.com/YOUR_USERNAME/practicum.git
git branch -M main
git push -u origin main

# To make changes later:
git add .
git commit -m "Your changes"
git push

# Vercel will auto-deploy on every push! 🚀
```

---

## What You'll Get

### Live URLs
- **Production**: `https://practicum.vercel.app`
- **Preview**: Auto-generated for each PR
- **Development**: `http://localhost:3000`

### Features Enabled
✅ All 7 pages working
✅ Sample projects browsable
✅ AI mentor (if API keys added)
✅ Database (if Supabase configured)
✅ Auto SSL/HTTPS
✅ Global CDN
✅ Auto-deployments on push

---

## Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Verify Node.js version (18+)
- Ensure all dependencies in package.json

### Environment variables not working
- Make sure to redeploy after adding them
- Check variable names match exactly
- Verify values don't have extra spaces

### 404 on dynamic routes
- Vercel handles this automatically
- If issue persists, check `next.config.js`

---

## Next Steps After Deployment

1. ✅ Share your live URL with students
2. ✅ Set up Supabase for persistence
3. ✅ Add AI API keys for mentor
4. ✅ Customize branding
5. ✅ Add more projects via admin panel
6. ✅ Monitor usage in Vercel analytics

---

## 🎉 Congratulations!

Your Practicum platform is now:
- ✅ Version controlled on GitHub
- ✅ Live on the internet (Vercel)
- ✅ Auto-deploying on updates
- ✅ SSL secured
- ✅ Globally distributed

**Live URL**: Check your Vercel dashboard for the exact URL!

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Docs**: [docs.github.com](https://docs.github.com)
- **Platform Docs**: See [README.md](README.md)

Happy teaching! 🚀
