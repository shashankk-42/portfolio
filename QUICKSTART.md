# Quick Start Guide - Portfolio Website

## Issue: MongoDB Not Running

The application needs MongoDB to be running locally. Here's how to fix it:

### Option 1: Install and Run MongoDB Locally (Recommended for Development)

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Download the Windows installer
   - Install with default settings

2. **Start MongoDB**
   ```powershell
   # MongoDB should start automatically after installation
   # If not, run:
   net start MongoDB
   ```

3. **Verify MongoDB is running**
   ```powershell
   # Should connect without errors
   mongosh
   ```

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update `.env` file**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

---

## Running the Application

### Step 1: Seed the Database
```powershell
# Run from portfolio root directory
node server/seed.js
```

You should see:
```
✓ MongoDB Connected
🗑️  Cleared existing data
✓ Seeded 6 projects
✓ Seeded 3 achievements
✓ Seeded 2 experiences
✅ Database seeded successfully!
```

### Step 2: Start the Backend Server
```powershell
# In one terminal
nodemon server/server.js
# OR
node server/server.js
```

You should see:
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
💚 Environment: development
```

### Step 3: Install Client Dependencies (If Not Done)

**If npm is having issues, try these alternatives:**

#### Option A: Use Yarn
```powershell
# Install yarn globally if you don't have it
npm install -g yarn

# Navigate to client folder
cd client

# Install dependencies
yarn install

# Run dev server
yarn dev
```

#### Option B: Manual npm fix
```powershell
cd client

# Clear everything
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

#### Option C: Use the existing node_modules (if partially installed)
```powershell
cd client

# Just try running vite directly
npx vite
```

### Step 4: Start the Frontend
```powershell
# In client folder
npm run dev
# OR
yarn dev
# OR
npx vite
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

---

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

---

## Testing the API Manually

You can test the backend without the frontend:

```powershell
# Get all projects
curl http://localhost:5000/api/projects

# Get all achievements
curl http://localhost:5000/api/achievements

# Get about info
curl http://localhost:5000/api/about
```

Or open these URLs in your browser:
- http://localhost:5000/api/projects
- http://localhost:5000/api/achievements
- http://localhost:5000/api/experiences
- http://localhost:5000/api/about

---

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is installed and running
- Check if port 27017 is available
- Try using MongoDB Atlas (cloud) instead

### npm Install Errors
- Try using `yarn` instead of `npm`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Client Won't Start
- Make sure you're in the `client` folder
- Try `npx vite` directly
- Check if port 3000 is available

---

## Next Steps After Running

1. ✅ Verify all pages load (Home, Projects, About, Contact)
2. ✅ Test project filtering on Projects page
3. ✅ Check responsive design on mobile
4. ✅ Test contact form
5. 🎨 Customize content through admin panel (future)
6. 🚀 Deploy to production

---

## Quick Commands Reference

```powershell
# Seed database
node server/seed.js

# Run backend only
node server/server.js

# Run frontend only (from client folder)
cd client
npx vite

# Run both (if npm is working)
npm run dev
```

---

**Need Help?** Check the main [README.md](file:///c:/Users/SHASHANK%20KAKAD/Documents/projects/portfolio/README.md) for more details!
