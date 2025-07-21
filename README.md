# 🗓️Smart Event Scheduler with AI Categorization & MongoDB

A professional full-stack event scheduling application built with **React**, **TypeScript**, **Express**, **MongoDB**, and **Tailwind CSS**. Features intelligent AI-powered event categorization, responsive design, and a robust backend.

## ✨ Features

- **📅 Complete CRUD Operations**: Create, read, update, and delete events
- **🤖 AI-Powered Categorization**: Automatic categorization as "Work," "Personal," or "Other"
- **🗄️ MongoDB Integration**: Persistent data storage with native MongoDB driver
- **🏷️ Smart Filtering**: Filter events by category with real-time counts
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **📦 Archive System**: Mark events as archived without deletion
- **⚡ Real-time Updates**: Instant UI updates after operations
- **🎨 Professional UI**: Modern design with Tailwind CSS
- **🛡️ Error Handling**: User-friendly error messages with retry options

## 🚀 Tech Stack

### Frontend (`/client`)
- **React 18** with TypeScript
- **Vite** for fast development and bundling
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons
- **SweetAlert2** for beautiful alerts
- **React Hot Toast** for notifications
- **Custom UI Components** (shadcn/ui style)

### Backend (`/server`)
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB Native Driver** for database interaction
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 📋 API Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/api/events` | Retrieve all events (sorted by date/time) | 200, 500 |
| `POST` | `/api/events` | Create new event with AI categorization | 201, 400, 500 |
| `PUT` | `/api/events/:id` | Update event (archive status) | 200, 400, 404, 500 |
| `DELETE` | `/api/events/:id` | Delete an event | 200, 404, 500 |
| `GET` | `/api/health` | Health check endpoint | 200 |

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js 18+**
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/event-scheduler.git
cd event-scheduler
\`\`\`

### 2. Install Dependencies
This project uses a monorepo-like structure with `client` and `server` directories.
\`\`\`bash
# Install client-side dependencies
cd client
npm install
cd ..

# Install server-side dependencies
cd server
npm install
cd ..
\`\`\`

### 3. MongoDB Setup

#### Option A: Local MongoDB
\`\`\`bash
# Install MongoDB locally (example for macOS)
brew install mongodb-community

# Start MongoDB service
sudo systemctl start mongod
\`\`\`

#### Option B: MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster.
3. Get your connection string.
4. Add it to your backend environment variables (`server/.env` for local, or Vercel environment variables for deployment).

### 4. Environment Setup

#### Backend Environment (`server/.env`)
\`\`\`bash
cd server
cp .env.example .env

#### Frontend Environment (`client/.env`)
\`\`\`bash
cd client
touch .env
\`\`\`
Edit the `.env` file. This is used by Vite for client-side environment variables for **local development**.
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 5. Run the Application Locally

#### Run Frontend and Backend Separately (Recommended for local dev)

**Terminal 1 - Backend:**
\`\`\`bash
cd server
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd client
npm run dev
\`\`\`

## 🤖 AI Categorization Logic

The application uses a simple keyword-based categorization:

### Work Category
**Keywords**: `meeting`, `project`, `client`, `work`, `conference`, `presentation`, `deadline`, `office`, `business`, `team`, `call`, `interview`, `training`, `workshop`, `seminar`

### Personal Category  
**Keywords**: `birthday`, `family`, `friend`, `vacation`, `dinner`, `party`, `wedding`, `anniversary`, `personal`, `doctor`, `appointment`, `gym`, `exercise`, `hobby`, `shopping`, `travel`

### Other Category
Default category for events that don't match work or personal keywords.

### Categorization Rules
1. **Case-insensitive** keyword matching
2. Searches both **title** and **notes** fields
3. **Work keywords** take precedence over personal keywords

## 🗄️ Database Schema

### Event Document Structure
\`\`\`json
{
  "_id": "ObjectId",
  "title": "String",
  "date": "String (YYYY-MM-DD)",
  "time": "String (HH:MM)",
  "notes": "String (optional)",
  "category": "String ('Work', 'Personal', 'Other')",
  "archived": "Boolean (default: false)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
\`\`\`

## 🌐 Deployment

This application is designed for deployment with **Vercel for the Backend API** and **Netlify for the Frontend**.

### Deploy Backend to Vercel

Vercel is an excellent platform for deploying Node.js Express applications as serverless functions.

1.  **Push your code to GitHub:** Ensure your `server` directory is part of a GitHub repository.
2.  **Sign up for Vercel:** Go to [Vercel.com](https://vercel.com/) and sign up (you can use your GitHub account).
3.  **Create a New Project:**
    *   Click "Add New..." -> "Project".
    *   Select the repository containing your backend code.
    *   **Important:** If your backend code is in a `server` subdirectory, configure the "Root Directory" in Vercel's project settings to `server/`.
    *   Vercel will automatically detect it's a Node.js project.
4.  **Configure Environment Variables:**
    *   Go to your Vercel project settings.
    *   Navigate to the "Environment Variables" tab.
    *   Add the following variables:
        *   `MONGODB_URI`: Your actual MongoDB Atlas connection string.
        *   `CLIENT_URL`: This is crucial for CORS. You will update this to your Netlify frontend's deployed domain (e.g., `https://your-netlify-app.netlify.app`) *after* your Netlify frontend is deployed.
5.  **Database Connection:** Ensure your `MONGODB_URI` is correct and your MongoDB Atlas cluster allows connections from "Anywhere" (0.0.0.0/0) or specifically from Vercel's IP addresses (check Vercel docs for their outbound IPs if you want more security).
6.  **Deploy:** Vercel will automatically build and deploy your application. You can monitor the logs in the Vercel dashboard. Once deployed, Vercel will provide you with a public domain for your backend API.

### Deploy Frontend to Netlify

Netlify is an excellent choice for deploying React applications.

1.  **Push your code to GitHub:** Ensure your `client` directory is part of a GitHub repository.
2.  **Sign up for Netlify:** Go to [Netlify.com](https://www.netlify.com/) and sign up (you can use your GitHub account).
3.  **Create a New Site:**
    *   Click "Add new site" -> "Import an existing project".
    *   Connect your GitHub account and select the repository containing your frontend code.
4.  **Configure Build Settings:**
    *   **Owner:** Your GitHub username/organization.
    *   **Repository:** Select your frontend repository.
    *   **Base directory:** If your frontend code is in a `client` subdirectory, set this to `client/`.
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist` (Vite's default output directory)
5.  **Set Environment Variables:**
    *   Before deploying, go to "Site settings" -> "Build & deploy" -> "Environment variables".
    *   Add a new variable:
        *   **Key:** `VITE_API_URL`
        *   **Value:** `https://your-vercel-backend-domain.vercel.app/api` (Replace with the actual domain Vercel gives you for your backend, plus `/api` as your Express app serves from that path).
6.  **Deploy Site:** Click "Deploy site". Netlify will build and deploy your React application. Once deployed, it will provide you with a public domain for your frontend.
7.  **Update Backend `CLIENT_URL`:** Once your Netlify frontend is deployed and you have its domain (e.g., `https://your-netlify-app.netlify.app`), go back to your Vercel backend project and update the `CLIENT_URL` environment variable to this Netlify frontend domain. This is crucial for CORS to work correctly.

## 🔮 Future Enhancements

- **🔐 User Authentication**: JWT-based auth with user-specific events
- **📅 Calendar View**: Visual calendar interface with drag-and-drop
- **🔔 Notifications**: Email/push notifications for upcoming events
- **🤖 Advanced AI**: Integration with OpenAI/LLM for better categorization
- **📤 Export/Import**: CSV/iCal export functionality
- **🔄 Recurring Events**: Support for repeating events
- **🌙 Dark Mode**: Theme switching capability
- **📊 Analytics**: Event statistics and insights dashboard
- **🔍 Search**: Full-text search across events
- **📱 Mobile App**: React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by [Rahima Kharun] as part of a Full-Stack Engineering Intern coding task.

---

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
\`\`\`bash
# Check if MongoDB is running locally
sudo systemctl status mongod

# Start MongoDB locally
sudo systemctl start mongod

# Check connection string in .env file (for local) or Vercel environment variables (for deployed)
\`\`\`

**Port Already in Use (Local Development):**
\`\`\`bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
\`\`\`

**CORS Issues (Deployed Application):**
- Ensure `CLIENT_URL` in Vercel backend environment variables matches your Netlify frontend URL exactly.
- Ensure `VITE_API_URL` in Netlify frontend environment variables matches your Vercel backend URL exactly (including `/api`).

**Build Errors:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
cd client && npm install && cd ..
cd server && npm install && cd ..
\`\`\`

**API Connection Issues (Deployed Application):**
- Verify backend is deployed and accessible via its Vercel URL.
- Check `VITE_API_URL` environment variable in Netlify.
- Ensure MongoDB is connected and accessible from your Vercel deployment.

### MongoDB Atlas Setup
1. Create cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for development, or specific Vercel IPs for production)
4. Get connection string and add to Vercel environment variables.

---

**⭐ If you found this project helpful, please give it a star!**

This project demonstrates professional full-stack development with modern technologies, proper database integration, AI features, and production-ready architecture. Perfect for showcasing your skills to potential employers!
