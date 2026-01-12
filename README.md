<<<<<<< HEAD
# Shashank Kakad - Portfolio Website

A modern, full-stack portfolio website built with the MERN stack, featuring a clean design with Orbitron font and cyan/purple color scheme.

## 🚀 Features

- **Full-Stack MERN Application**: MongoDB, Express, React, Node.js
- **Modern UI**: Orbitron font with cyan (#06B6D4) and purple (#8B5CF6) accents
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dynamic Content**: All content managed through MongoDB
- **Admin Panel Ready**: JWT-based authentication for content management
- **Project Showcase**: 6 detailed projects with filtering
- **Achievements**: Publications and patents display
- **Experience Timeline**: Professional experience showcase
- **Contact Form**: Get in touch functionality

## 📁 Project Structure

```
portfolio/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── config/            # Database config
│   ├── seed.js            # Database seeder
│   └── server.js          # Entry point
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # Global styles
│   │   ├── App.jsx       # Main app
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   └── vite.config.js
│
└── package.json           # Root package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and other settings:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_secret_key
   ADMIN_EMAIL=shashankkakad10@gmail.com
   ADMIN_PASSWORD=your_password
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both server and client)
   npm run dev

   # Or run separately:
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📡 API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/achievements` - Get all achievements
- `GET /api/experiences` - Get all experiences
- `GET /api/about` - Get about information

### Protected Routes (Admin)
- `POST /api/auth/login` - Admin login
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- (Similar CRUD for achievements and experiences)

## 🎨 Design System

### Colors
- **Primary Accent**: `#06B6D4` (Cyan)
- **Secondary Accent**: `#8B5CF6` (Purple)
- **Background**: `#F5F7FA` (Light Gray)
- **Text**: `#1E293B` (Dark Slate)
- **Cards**: `#FFFFFF` (White)

### Typography
- **Font**: Orbitron (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800, 900

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables
2. Deploy from GitHub
3. Ensure MongoDB connection string is set

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder
3. Set API proxy in production

## 📝 Admin Access

Default admin credentials (change in production):
- Email: shashankkakad10@gmail.com
- Password: admin123

## 🔧 Scripts

- `npm run dev` - Run both server and client
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run seed` - Seed database with initial data

## 📄 License

ISC

## 👤 Author

**Shashank Kakad**
- Email: shashankkakad10@gmail.com
- GitHub: [@shashankk-42](https://github.com/shashankk-42)
- LinkedIn: [Shashank Kakad](https://www.linkedin.com/in/shashank-kakad/)

---

Built with ❤️ using MERN Stack
=======
# portfolio

Portfolio website of Shashank Kakad — showcasing projects, ventures, and a journey in building impactful tech.
>>>>>>> 611e688b44bbecb9b7938de124f6025f2c778aaa
