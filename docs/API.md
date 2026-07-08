# API Documentation

## 🌐 Base URL
```
Development: http://localhost:3000
Production: https://your-domain.com
```

## 🔐 Authentication

All protected endpoints require a valid JWT token sent via HTTP-only cookies.

### Authentication Flow
1. **Sign Up**: Create new account
2. **Sign In**: Get JWT token
3. **Use Token**: Automatic token inclusion in requests
4. **Sign Out**: Clear token

## 📋 API Endpoints

### 🔑 Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account.

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "User created successfully!"
}
```

**Error Responses**:
- `400` - Missing required fields
- `409` - Username or email already exists
- `500` - Server error

#### POST `/api/auth/signin`
Authenticate existing user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "profilePicture": "https://example.com/avatar.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses**:
- `404` - User not found
- `401` - Wrong credentials
- `500` - Server error

#### GET `/api/auth/signout`
Sign out current user.

**Response** (200):
```json
{
  "message": "User has been logged out!"
}
```

#### PUT `/api/auth/update/:id`
Update user profile information.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "username": "new_username",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "new_username",
  "email": "newemail@example.com",
  "profilePicture": "https://example.com/avatar.jpg",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses**:
- `401` - Unauthorized (can only update own account)
- `400` - Invalid input
- `500` - Server error

#### DELETE `/api/auth/delete/:id`
Delete user account.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (200):
```json
{
  "message": "User has been deleted!"
}
```

**Error Responses**:
- `401` - Unauthorized (can only delete own account)
- `404` - User not found
- `500` - Server error

### 🤝 Volunteering Endpoints

#### POST `/api/volunteer/apply`
Submit a volunteering application.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

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

**Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "eventName": "Food Distribution Drive",
  "eventDate": "2024-01-15T00:00:00.000Z",
  "eventLocation": "Central Park, New York",
  "eventDescription": "Help distribute food packages to families in need",
  "volunteerRole": "Distribution Helper",
  "status": "pending",
  "appliedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses**:
- `400` - Missing required fields
- `401` - Unauthorized
- `500` - Server error

#### GET `/api/volunteer/my-applications`
Get user's volunteering applications.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "eventName": "Food Distribution Drive",
    "eventDate": "2024-01-15T00:00:00.000Z",
    "eventLocation": "Central Park, New York",
    "eventDescription": "Help distribute food packages to families in need",
    "volunteerRole": "Distribution Helper",
    "status": "pending",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "eventName": "Children's Education Camp",
    "eventDate": "2024-01-20T00:00:00.000Z",
    "eventLocation": "Community Center, Brooklyn",
    "eventDescription": "Teach basic skills to underprivileged children",
    "volunteerRole": "Teacher",
    "status": "approved",
    "appliedAt": "2024-01-02T00:00:00.000Z"
  }
]
```

**Error Responses**:
- `401` - Unauthorized
- `500` - Server error

#### PUT `/api/volunteer/:volunteerId/status`
Update volunteering application status.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "status": "approved"
}
```

**Status Options**:
- `pending` - Application submitted
- `approved` - Application approved
- `rejected` - Application rejected
- `completed` - Event completed

**Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "status": "approved",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses**:
- `401` - Unauthorized
- `404` - Application not found
- `400` - Invalid status
- `500` - Server error

#### DELETE `/api/volunteer/:volunteerId`
Delete volunteering application.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (200):
```json
{
  "message": "Volunteer application has been deleted"
}
```

**Error Responses**:
- `401` - Unauthorized (can only delete own applications)
- `404` - Application not found
- `500` - Server error

### 🎁 Donation Endpoints

#### POST `/api/donate/:category`
Submit donation in specific category.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Categories**: `food`, `clothes`, `toys`, `electronics`, `stationary`, `money`

#### Food Donation
**Endpoint**: `POST /api/donate/food`

**Request Body**:
```json
{
  "foodType": "Canned Goods",
  "quantity": 10,
  "expiryDate": "2024-06-01",
  "isPackaged": true,
  "description": "Various canned vegetables"
}
```

**Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "foodType": "Canned Goods",
  "quantity": 10,
  "expiryDate": "2024-06-01T00:00:00.000Z",
  "isPackaged": true,
  "description": "Various canned vegetables",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Clothes Donation
**Endpoint**: `POST /api/donate/clothes`

**Request Body**:
```json
{
  "clothingType": "T-Shirts",
  "size": "M",
  "condition": "Good",
  "gender": "Unisex",
  "ageGroup": "Adult",
  "description": "Cotton t-shirts in good condition"
}
```

#### Toys Donation
**Endpoint**: `POST /api/donate/toys`

**Request Body**:
```json
{
  "toyType": "Educational",
  "ageRange": "5-10",
  "condition": "Excellent",
  "description": "Educational board games"
}
```

#### Electronics Donation
**Endpoint**: `POST /api/donate/electronics`

**Request Body**:
```json
{
  "deviceType": "Laptop",
  "brand": "Dell",
  "model": "Inspiron",
  "condition": "Good",
  "description": "Working laptop for students"
}
```

#### Stationary Donation
**Endpoint**: `POST /api/donate/stationary`

**Request Body**:
```json
{
  "itemType": "Notebooks",
  "quantity": 50,
  "description": "New notebooks for students"
}
```

#### Money Donation
**Endpoint**: `POST /api/donate/money`

**Request Body**:
```json
{
  "amount": 100,
  "currency": "USD",
  "paymentMethod": "Credit Card",
  "description": "Monetary donation for food drive"
}
```

#### GET `/api/donate/my-donations`
Get user's donation history.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (200):
```json
{
  "food": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "foodType": "Canned Goods",
      "quantity": 10,
      "expiryDate": "2024-06-01T00:00:00.000Z",
      "isPackaged": true,
      "description": "Various canned vegetables"
    }
  ],
  "clothes": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "clothingType": "T-Shirts",
      "size": "M",
      "condition": "Good",
      "gender": "Unisex",
      "ageGroup": "Adult",
      "description": "Cotton t-shirts"
    }
  ],
  "toys": [],
  "electronics": [],
  "stationary": [],
  "money": []
}
```

**Error Responses**:
- `401` - Unauthorized
- `500` - Server error

## 📊 Error Codes

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

### Error Response Format

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

## 🔒 Security

### Authentication
- JWT tokens stored in HTTP-only cookies
- Automatic token validation
- Secure token generation

### Input Validation
- Request body validation
- Data sanitization
- SQL injection prevention

### Rate Limiting
- API rate limiting (configurable)
- Request throttling
- Abuse prevention

## 📈 Response Headers

### Standard Headers
```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

### CORS Headers
```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 🧪 Testing

### Postman Collection
Import the following collection for API testing:

```json
{
  "info": {
    "name": "Daan API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Sign Up",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"test_user\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/api/auth/signup",
              "host": ["{{base_url}}"],
              "path": ["api", "auth", "signup"]
            }
          }
        }
      ]
    }
  ]
}
```

### Environment Variables
```
base_url: http://localhost:3000
```

## 📝 Examples

### Complete Authentication Flow

1. **Sign Up**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

2. **Sign In**
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }' \
  -c cookies.txt
```

3. **Submit Donation**
```bash
curl -X POST http://localhost:3000/api/donate/food \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "foodType": "Canned Goods",
    "quantity": 10,
    "expiryDate": "2024-06-01",
    "isPackaged": true,
    "description": "Various canned vegetables"
  }'
```

4. **Apply for Volunteering**
```bash
curl -X POST http://localhost:3000/api/volunteer/apply \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "eventName": "Food Distribution Drive",
    "eventDate": "2024-01-15",
    "eventLocation": "Central Park, New York",
    "eventDescription": "Help distribute food packages",
    "volunteerRole": "Distribution Helper"
  }'
```

## 🔄 WebSocket Support (Future)

### Real-time Features
- Live donation updates
- Volunteer application notifications
- Chat system for volunteers
- Real-time event updates

### WebSocket Events
```javascript
// Connect to WebSocket
const socket = io('http://localhost:3000');

// Listen for donation updates
socket.on('donation_update', (data) => {
  console.log('New donation:', data);
});

// Listen for volunteer notifications
socket.on('volunteer_notification', (data) => {
  console.log('Volunteer update:', data);
});
```

## 📚 Additional Resources

- [Postman Collection](https://documenter.getpostman.com/view/your-collection)
- [API Status Page](https://status.daan.org)
- [Rate Limiting Guide](https://docs.daan.org/rate-limiting)
- [Authentication Guide](https://docs.daan.org/auth) 