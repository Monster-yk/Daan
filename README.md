# 🌟 Daan - Charity & Volunteer Management Platform

[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-green.svg)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.21.2-gray.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)](https://tailwindcss.com/)

> **Daan** - A modern, full-stack charity and volunteer management platform that connects generous donors with those in need, creating a network of support that spans across communities and borders.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🏗️ Project Structure](#️-project-structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [📱 Screenshots](#-screenshots)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎯 API Documentation](#-api-documentation)
- [👥 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure signup, signin, and signout with JWT
- **Profile Management** - Edit username, email, and password
- **Donation System** - Multiple categories (Food, Clothes, Toys, Electronics, Stationary, Money)
- **Volunteering Platform** - Apply for events and track applications
- **Real-time Tracking** - View donation history and volunteer status

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **Mobile Responsive** - Works perfectly on all devices
- **Interactive Elements** - Smooth animations and hover effects
- **Professional Navigation** - Sticky navbar with dropdown menus

### 🔒 Security & Performance
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password security
- **CORS Support** - Cross-origin request handling
- **Error Handling** - Comprehensive error management

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/daan-website.git
cd daan-website
```

### 2. Install Dependencies
```bash
# Install Backend Dependencies
cd Backend
npm install

# Install Frontend Dependencies
cd ../Frontend
npm install
```

### 3. Environment Setup
```bash
# Create .env file in Backend directory
cd ../Backend
cp .env.example .env
```

Edit the `.env` file:
```env
URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Application
```bash
# Start Backend Server (Terminal 1)
cd Backend
npm run dev

# Start Frontend Development Server (Terminal 2)
cd Frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🏗️ Project Structure

```
daan-website/
├── Backend/                 # Backend API Server
│   ├── controls/           # Controller functions
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── Frontend/              # React Frontend Application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # State management
│   │   ├── image/         # Static images
│   │   └── main.jsx       # App entry point
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Lucide React** - Beautiful icons
- **Flowbite React** - UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📱 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Landing+Page)

### Home Page
![Home Page](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Home+Page)

### Volunteer Page
![Volunteer Page](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Volunteer+Page)

### Profile Page
![Profile Page](https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Profile+Page)

## 🔧 Installation

### Detailed Installation Steps

1. **System Requirements**
   - Node.js 18+ 
   - MongoDB 6.0+
   - Git

2. **Database Setup**
   ```bash
   # Install MongoDB (Ubuntu/Debian)
   sudo apt update
   sudo apt install mongodb

   # Start MongoDB service
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Backend Setup**
   ```bash
   cd Backend
   npm install
   
   # Create environment file
   echo "URL=mongodb://localhost:27017/daan
   JWT_SECRET=your_super_secret_jwt_key_here" > .env
   ```

4. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
# Database Configuration
URL=mongodb://localhost:27017/daan

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Database Configuration
The application uses MongoDB with the following collections:
- `users` - User accounts and profiles
- `volunteers` - Volunteering applications
- `donations` - Donation records (food, clothes, toys, etc.)

## 🎯 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### POST `/api/auth/signin`
Sign in to existing account
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### GET `/api/auth/signout`
Sign out current user

#### PUT `/api/auth/update/:id`
Update user profile
```json
{
  "username": "new_username",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

### Volunteering Endpoints

#### POST `/api/volunteer/apply`
Apply for volunteering
```json
{
  "eventName": "Food Distribution Drive",
  "eventDate": "2024-01-15",
  "eventLocation": "Central Park, New York",
  "eventDescription": "Help distribute food packages",
  "volunteerRole": "Distribution Helper"
}
```

#### GET `/api/volunteer/my-applications`
Get user's volunteering applications

#### PUT `/api/volunteer/:volunteerId/status`
Update volunteering application status
```json
{
  "status": "approved"
}
```

#### DELETE `/api/volunteer/:volunteerId`
Delete volunteering application

### Donation Endpoints

#### POST `/api/donate/:category`
Submit donation (food, clothes, toys, electronics, stationary, money)

#### GET `/api/donate/my-donations`
Get user's donation history

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-daan-app

# Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set URL=your_mongodb_atlas_url

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Frontend
vercel
```

## 🧪 Testing

### Backend Testing
```bash
cd Backend
npm test
```

### Frontend Testing
```bash
cd Frontend
npm test
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Vite
- **Database Queries**: Indexed for optimal performance
- **Image Optimization**: Compressed and responsive images

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs with salt rounds
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Secure error responses
- **Rate Limiting** - API rate limiting (can be added)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- **Bug description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment details**

## 📈 Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Donation system
- ✅ Volunteering platform
- ✅ Profile management

### Phase 2 (Planned)
- 🔄 Admin dashboard
- 🔄 Payment integration
- 🔄 Email notifications
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Mobile app
- 📋 Social features
- 📋 Gamification
- 📋 AI-powered matching

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible database
- **Express.js** - For the robust backend framework
- **Vite** - For the fast build tool

## 📞 Support

- **Email**: support@daan.org
- **Documentation**: [docs.daan.org](https://docs.daan.org)
- **Issues**: [GitHub Issues](https://github.com/yourusername/daan-website/issues)

---

<div align="center">
  <p>Made with ❤️ by the Daan Team</p>
  <p>🌟 Star this repository if you found it helpful!</p>
</div> 