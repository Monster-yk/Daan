# Frontend Documentation

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── Footer.jsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── home.jsx        # Home page
│   │   ├── landingpage.jsx # Landing page
│   │   ├── volunteer.jsx   # Volunteering page
│   │   ├── profile.jsx     # User profile page
│   │   ├── signin.jsx      # Sign in page
│   │   ├── signup.jsx      # Sign up page
│   │   └── donation/       # Donation pages
│   ├── redux/              # State management
│   │   ├── store.js        # Redux store configuration
│   │   └── user/           # User slice
│   ├── image/              # Static images
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Public assets
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🎨 Components Documentation

### Navbar Component (`src/components/Navbar.jsx`)

**Purpose**: Main navigation component with user authentication state management.

**Features**:
- Responsive design with mobile hamburger menu
- User authentication state display
- Profile dropdown with quick actions
- Sticky positioning

**Props**: None (uses Redux state)

**Usage**:
```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Other components */}
    </div>
  );
}
```

**Key Features**:
- **Authentication State**: Displays login/signup buttons or user avatar
- **Mobile Responsive**: Hamburger menu for mobile devices
- **Profile Dropdown**: Quick access to profile and sign out
- **Active Navigation**: Visual feedback for current page

### Footer Component (`src/components/Footer.jsx`)

**Purpose**: Site footer with links, contact information, and social media.

**Features**:
- Company information
- Quick links to main pages
- Donation categories
- Contact information
- Social media links

**Usage**:
```jsx
import Footer from './components/Footer';

function App() {
  return (
    <div>
      {/* Main content */}
      <Footer />
    </div>
  );
}
```

## 📄 Pages Documentation

### Landing Page (`src/pages/landingpage.jsx`)

**Purpose**: Welcome page for new visitors with call-to-action buttons.

**Features**:
- Hero section with compelling messaging
- Feature highlights
- How it works section
- Testimonials
- Statistics display

**Key Sections**:
1. **Hero Section**: Main call-to-action
2. **Features**: Why choose Daan
3. **How It Works**: Step-by-step process
4. **CTA Section**: Final call-to-action
5. **Testimonials**: Social proof

**Navigation**:
- "Get Started" → `/signup`
- "Learn More" → `/home`
- "Become a Volunteer" → `/volunteer`

### Home Page (`src/pages/home.jsx`)

**Purpose**: Main dashboard with donation and volunteering options.

**Features**:
- Hero section with background image
- Statistics display
- Donation categories
- Volunteering opportunities
- Gallery section

**Interactive Elements**:
- Donation cards with hover effects
- Volunteer application buttons
- Fundraising options
- Partner showcase

### Volunteer Page (`src/pages/volunteer.jsx`)

**Purpose**: Volunteering application form and event showcase.

**Features**:
- Application form for volunteering
- Upcoming events display
- Role selection
- Event details and descriptions

**Form Fields**:
- Event Name
- Event Date
- Event Location
- Event Description
- Preferred Role

**API Integration**:
- POST `/api/volunteer/apply` - Submit application
- Form validation and error handling
- Success feedback

### Profile Page (`src/pages/profile.jsx`)

**Purpose**: User profile management and activity tracking.

**Features**:
- Profile information display
- Edit profile functionality
- Donation history
- Volunteering applications
- Tabbed interface

**Tabs**:
1. **Profile**: User information and edit form
2. **Donations**: Donation history by category
3. **Volunteering**: Volunteering applications and status

**API Integration**:
- GET `/api/donate/my-donations` - Fetch donations
- GET `/api/volunteer/my-applications` - Fetch volunteering
- PUT `/api/auth/update/:id` - Update profile
- DELETE `/api/volunteer/:volunteerId` - Delete application

## 🔧 State Management (Redux)

### Store Configuration (`src/redux/store.js`)

**Purpose**: Redux store setup with user slice.

**Configuration**:
```javascript
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```

### User Slice (`src/redux/user/userSlice.js`)

**Purpose**: User authentication state management.

**State Structure**:
```javascript
{
  currentUser: null,
  error: null,
  loading: false
}
```

**Actions**:
- `signInStart` - Start sign in process
- `signInSuccess` - Sign in successful
- `signInFailure` - Sign in failed
- `updateUserStart` - Start user update
- `updateUserSuccess` - User update successful
- `updateUserFailure` - User update failed
- `deleteUserStart` - Start user deletion
- `deleteUserSuccess` - User deletion successful
- `deleteUserFailure` - User deletion failed
- `signOut` - Sign out user

## 🎨 Styling & Design System

### Tailwind CSS Configuration

**Custom Colors**:
```javascript
colors: {
  green: {
    50: '#f0fdf4',
    600: '#16a34a',
    700: '#15803d',
  },
  blue: {
    50: '#eff6ff',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

**Custom Components**:
- Gradient backgrounds
- Card designs
- Button styles
- Form inputs

### Design Principles

1. **Consistency**: Uniform spacing, typography, and colors
2. **Accessibility**: High contrast ratios and keyboard navigation
3. **Responsiveness**: Mobile-first design approach
4. **Performance**: Optimized images and lazy loading

## 🚀 Performance Optimization

### Code Splitting
- Route-based code splitting with React Router
- Lazy loading for heavy components

### Image Optimization
- Compressed images in `src/image/`
- Responsive image sizing
- Lazy loading for gallery images

### Bundle Optimization
- Vite for fast builds
- Tree shaking for unused code
- CSS purging with Tailwind

## 🔒 Security Considerations

### Authentication
- JWT token storage in HTTP-only cookies
- Automatic token refresh
- Secure logout functionality

### Input Validation
- Client-side form validation
- API error handling
- XSS prevention

### Data Protection
- Secure API calls with credentials
- CORS configuration
- HTTPS enforcement

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Features
- Hamburger navigation menu
- Touch-friendly buttons
- Optimized form inputs
- Swipe gestures (future)

## 🧪 Testing Strategy

### Component Testing
- Unit tests for utility functions
- Integration tests for forms
- E2E tests for user flows

### Testing Tools
- Jest for unit testing
- React Testing Library
- Cypress for E2E testing

## 📦 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production Build
- Optimized bundle size
- Minified CSS and JavaScript
- Compressed images
- Service worker for caching

### Deployment
- Vercel for frontend hosting
- Environment variable configuration
- CDN for static assets

## 🔧 Development Guidelines

### Code Style
- ESLint configuration
- Prettier formatting
- Consistent naming conventions
- Component documentation

### Git Workflow
- Feature branch development
- Meaningful commit messages
- Pull request reviews
- Semantic versioning

### Performance Monitoring
- Lighthouse audits
- Bundle size monitoring
- Core Web Vitals tracking
- Error tracking

## 🐛 Common Issues & Solutions

### CORS Errors
**Issue**: Cross-origin request blocked
**Solution**: Ensure backend CORS configuration matches frontend origin

### Authentication Issues
**Issue**: User not staying logged in
**Solution**: Check JWT token storage and refresh logic

### Mobile Responsiveness
**Issue**: Layout breaks on mobile
**Solution**: Use Tailwind responsive classes and test on real devices

### Build Errors
**Issue**: Vite build fails
**Solution**: Check for missing dependencies and import errors

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/docs/en/v6) 