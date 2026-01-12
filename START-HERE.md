# Portfolio Project - Quick Start Guide

## Your Portfolio is Ready! Here's How to Run It

### ✅ What's Built
- **Backend**: Express + MongoDB with all your data (6 projects, 3 achievements, 2 experiences)
- **Frontend**: React app with beautiful Orbitron styling
- **Database**: MongoDB Atlas (cloud) configured

---

## 🚀 Step-by-Step: Run Your Portfolio

### Step 1: Start the Backend Server

Open PowerShell in your project folder and run:

```powershell
cd "C:\Users\SHASHANK KAKAD\Documents\projects\portfolio"
node server/server.js
```

**Expected Output:**
```
✓ MongoDB Connected
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

**If you see an error**, your MongoDB Atlas password might have changed. Update `.env` file line 2 with your current password.

**Keep this terminal window open!** The server needs to stay running.

---

### Step 2: Test the Backend (Optional but Recommended)

Open your browser and visit:
- **http://localhost:5000/api/projects** - See all your projects
- **http://localhost:5000/api/achievements** - See your publications and patent
- **http://localhost:5000/api/about** - See your info

OR double-click: `test-backend.html` in your portfolio folder

---

### Step 3: Start the Frontend

**Option A: If npm works** (Open a NEW PowerShell window):
```powershell
cd "C:\Users\SHASHANK KAKAD\Documents\projects\portfolio\client"
npm install
npm run dev
```

**Option B: If npm is broken** (Use this):
```powershell
cd "C:\Users\SHASHANK KAKAD\Documents\projects\portfolio\client"
npx vite
```

**Expected Output:**
```
VITE ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

### Step 4: Open Your Portfolio

Go to: **http://localhost:3000**

You should see:
- ✅ Home page with your name and stats
- ✅ Projects page with all 6 projects
- ✅ About page with skills and experience
- ✅ Contact page with your email/links

---

## 🔧 Troubleshooting

### Problem: "MongoDB Connection Error"

**Solution**: Check your `.env` file (line 2):
```env
MONGODB_URI=mongodb+srv://shashankkakad10_db_user:YOUR_PASSWORD@cluster0.ayuc956.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
```

Make sure `YOUR_PASSWORD` is your actual MongoDB Atlas password (no `<` or `>` brackets).

**To reset your password:**
1. Go to https://cloud.mongodb.com
2. Login → Database Access → Edit User → Reset Password
3. Update `.env` with new password

---

### Problem: "npm error spawn /bin/bash"

**Solution**: npm is broken. Use one of these:

**Option 1**: Reinstall Node.js
- Download from: https://nodejs.org (LTS version)
- Install and restart PowerShell

**Option 2**: Use `npx vite` directly
```powershell
cd client
npx vite
```

**Option 3**: Use the test page
- Just open `test-backend.html` in your browser
- Works without React!

---

### Problem: "Port 5000 already in use"

**Solution**: Kill the process using port 5000:
```powershell
# Find the process
netstat -ano | findstr :5000

# Kill it (replace PID with the number you see)
taskkill /PID <PID> /F
```

---

## 📝 Quick Commands Reference

```powershell
# Start backend (Terminal 1)
node server/server.js

# Start frontend (Terminal 2)
cd client
npx vite

# Seed database (if needed)
node server/seed.js

# Test API
# Open browser: http://localhost:5000/api/projects
```

---

## 🎯 What to Do Next

1. **Test all pages**: Home, Projects, About, Contact
2. **Verify data**: Check that all 6 projects show up
3. **Test responsive**: Resize browser window
4. **Deploy** (when ready):
   - Backend → Render.com or Railway.app
   - Frontend → Vercel.com or Netlify.com

---

## 💡 Tips

- **Backend must run first** before frontend
- **Keep backend terminal open** while using the site
- **MongoDB Atlas is free** - no credit card needed
- **Test page works** even without React frontend

---

## 🆘 Still Having Issues?

1. **Check MongoDB Atlas**:
   - Login at https://cloud.mongodb.com
   - Verify cluster is running
   - Check Network Access allows your IP

2. **Verify .env file**:
   - Password is correct
   - No extra spaces
   - No `<` or `>` brackets

3. **Use test page**:
   - Open `test-backend.html`
   - Works without npm/React

---

**Your portfolio is complete and ready to deploy!** 🎉

All your data is in MongoDB Atlas, backend is working, and the React frontend is built. Just need to get both running locally, then you can deploy to production.
