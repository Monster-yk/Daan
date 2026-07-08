# Backend Documentation

## 📁 Project Structure

```
Backend/
├── controls/               # Controller functions
│   ├── auth.controller.js  # Authentication logic
│   ├── donate.controller.js # Donation handling
│   └── volunteer.controller.js # Volunteering logic
├── models/                 # MongoDB schemas
│   ├── user.model.js       # User schema
│   ├── volunteer.model.js  # Volunteer schema
│   ├── clothes.model.js    # Clothing donations
│   ├── electronic.model.js # Electronics donations
│   ├── food.model.js       # Food donations
│   ├── stationary.model.js # Stationary donations
│   └── toys.model.js       # Toys donations
├── routes/                 # API routes
│   ├── auth.route.js       # Authentication routes
│   ├── donation.route.js   # Donation routes
│   └── volunteer.route.js  # Volunteering routes
├── utils/                  # Utility functions
│   ├── error.js           # Error handling
│   └── verifyUser.js      # JWT verification
├── index.js               # Main server file
└── package.json           # Dependencies
```

## 🚀 Server Configuration

### Main Server (`index.js`)

**Purpose**: Express server setup with middleware and route configuration.

**Key Features**:
- CORS configuration for cross-origin requests
- JSON body parsing
- Route mounting
- Error handling middleware

**Configuration**:
```javascript
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/donate', donationRoute);
app.use('/api/volunteer', volunteerRoute);
```

## 🗄️ Database Models

### User Model (`models/user.model.js`)

**Purpose**: User account and profile information.

**Schema**:
```javascript
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'default-avatar-url',
    },
}, { timestamps: true });
```

**Fields**:
- `username`: Unique username for the user
- `email`: Unique email address
- `password`: Hashed password using bcryptjs
- `profilePicture`: URL to user's profile picture
- `timestamps`: Automatic createdAt and updatedAt fields

### Volunteer Model (`models/volunteer.model.js`)

**Purpose**: Volunteering applications and event management.

**Schema**:
```javascript
const volunteerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    volunteerRole: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
```

**Fields**:
- `userId`: Reference to User model
- `eventName`: Name of the volunteering event
- `eventDate`: Date of the event
- `eventLocation`: Location of the event
- `eventDescription`: Detailed description
- `volunteerRole`: Role applied for
- `status`: Application status
- `appliedAt`: Application timestamp

### Donation Models

#### Food Model (`models/food.model.js`)
```javascript
const foodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodType: String,
    quantity: Number,
    expiryDate: Date,
    isPackaged: Boolean,
    description: String
}, { timestamps: true });
```

#### Clothes Model (`models/clothes.model.js`)
```javascript
const clothesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clothingType: String,
    size: String,
    condition: String,
    gender: String,
    ageGroup: String,
    description: String
}, { timestamps: true });
```

## 🔐 Authentication System

### JWT Configuration

**Purpose**: Secure token-based authentication.

**Implementation**:
```javascript
import jwt from 'jsonwebtoken';

// Token generation
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// Token verification
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

**Security Features**:
- HTTP-only cookies for token storage
- Secure token generation with secret key
- Token expiration handling
- Automatic token refresh

### Password Hashing

**Purpose**: Secure password storage using bcryptjs.

**Implementation**:
```javascript
import bcryptjs from 'bcryptjs';

// Hash password
const hashedPassword = bcryptjs.hashSync(password, 10);

// Verify password
const isValid = bcryptjs.compareSync(password, hashedPassword);
```

## 🛣️ API Routes

### Authentication Routes (`routes/auth.route.js`)

#### POST `/api/auth/signup`
**Purpose**: Create new user account.

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User created successfully!"
}
```

#### POST `/api/auth/signin`
**Purpose**: Authenticate existing user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "_id": "user_id",
  "username": "john_doe",
  "email": "john@example.com",
  "profilePicture": "avatar_url",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT `/api/auth/update/:id`
**Purpose**: Update user profile information.

**Request Body**:
```json
{
  "username": "new_username",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

#### DELETE `/api/auth/delete/:id`
**Purpose**: Delete user account.

### Volunteering Routes (`routes/volunteer.route.js`)

#### POST `/api/volunteer/apply`
**Purpose**: Submit volunteering application.

**Request Body**:
```json
{
  "eventName": "Food Distribution Drive",
  "eventDate": "2024-01-15",
  "eventLocation": "Central Park, New York",
  "eventDescription": "Help distribute food packages to families in need",
  "volunteerRole": "Distribution Helper"
}
```

#### GET `/api/volunteer/my-applications`
**Purpose**: Get user's volunteering applications.

**Response**:
```json
[
  {
    "_id": "volunteer_id",
    "eventName": "Food Distribution Drive",
    "eventDate": "2024-01-15T00:00:00.000Z",
    "eventLocation": "Central Park, New York",
    "eventDescription": "Help distribute food packages",
    "volunteerRole": "Distribution Helper",
    "status": "pending",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### PUT `/api/volunteer/:volunteerId/status`
**Purpose**: Update volunteering application status.

**Request Body**:
```json
{
  "status": "approved"
}
```

#### DELETE `/api/volunteer/:volunteerId`
**Purpose**: Delete volunteering application.

### Donation Routes (`routes/donation.route.js`)

#### POST `/api/donate/:category`
**Purpose**: Submit donation in specific category.

**Categories**: `food`, `clothes`, `toys`, `electronics`, `stationary`, `money`

**Example Request** (Food):
```json
{
  "foodType": "Canned Goods",
  "quantity": 10,
  "expiryDate": "2024-06-01",
  "isPackaged": true,
  "description": "Various canned vegetables"
}
```

#### GET `/api/donate/my-donations`
**Purpose**: Get user's donation history.

**Response**:
```json
{
  "food": [
    {
      "_id": "donation_id",
      "foodType": "Canned Goods",
      "quantity": 10,
      "expiryDate": "2024-06-01T00:00:00.000Z",
      "isPackaged": true,
      "description": "Various canned vegetables"
    }
  ],
  "clothes": [],
  "toys": []
}
```

## 🔧 Controllers

### Auth Controller (`controls/auth.controller.js`)

**Functions**:
- `signup()` - User registration
- `signin()` - User authentication
- `google()` - Google OAuth integration
- `signOut()` - User logout
- `updateUser()` - Profile updates
- `deleteUser()` - Account deletion

**Error Handling**:
```javascript
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }
        
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }
        
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        
        res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json(rest);
    } catch (error) {
        next(error);
    }
};
```

### Volunteer Controller (`controls/volunteer.controller.js`)

**Functions**:
- `applyForVolunteering()` - Submit application
- `getUserVolunteering()` - Get user applications
- `updateVolunteerStatus()` - Update application status
- `deleteVolunteerApplication()` - Delete application

### Donation Controller (`controls/donate.controller.js`)

**Functions**:
- `createDonation()` - Create donation record
- `getUserDonations()` - Get user donation history

## 🛡️ Security Features

### CORS Configuration
```javascript
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

### Error Handling
```javascript
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
```

### Input Validation
- Request body validation
- User input sanitization
- SQL injection prevention
- XSS protection

## 🔍 Database Operations

### MongoDB Connection
```javascript
mongoose.connect(process.env.URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
```

### Query Optimization
- Indexed fields for faster queries
- Efficient aggregation pipelines
- Connection pooling
- Query caching

## 📊 Performance Optimization

### Database Indexing
```javascript
// User model indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Volunteer model indexes
volunteerSchema.index({ userId: 1 });
volunteerSchema.index({ status: 1 });
```

### Caching Strategy
- Redis for session storage (future)
- Query result caching
- Static asset caching

## 🧪 Testing

### Unit Testing
```bash
npm test
```

### API Testing
- Postman collections
- Automated API tests
- Load testing

### Database Testing
- Connection testing
- Query performance testing
- Data integrity testing

## 📈 Monitoring & Logging

### Error Logging
```javascript
// Error logging middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Log to external service
    next(err);
});
```

### Performance Monitoring
- Response time tracking
- Database query monitoring
- Memory usage tracking
- Error rate monitoring

## 🚀 Deployment

### Environment Variables
```env
# Database
URL=mongodb://localhost:27017/daan

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Server
PORT=3000
NODE_ENV=production
```

### Production Setup
```bash
# Install dependencies
npm install --production

# Start server
npm start

# PM2 for process management
pm2 start index.js --name "daan-backend"
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Development Guidelines

### Code Style
- ESLint configuration
- Consistent naming conventions
- JSDoc documentation
- Error handling patterns

### Git Workflow
- Feature branch development
- Commit message conventions
- Code review process
- Automated testing

### Security Best Practices
- Regular dependency updates
- Security audits
- Input validation
- Rate limiting

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Issues
**Problem**: Cannot connect to MongoDB
**Solution**: Check connection string and network connectivity

#### JWT Token Issues
**Problem**: Authentication failures
**Solution**: Verify JWT_SECRET and token expiration

#### CORS Errors
**Problem**: Cross-origin request blocked
**Solution**: Update CORS configuration with correct origins

#### Memory Leaks
**Problem**: High memory usage
**Solution**: Monitor connection pooling and query optimization

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT Documentation](https://jwt.io/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js/) 