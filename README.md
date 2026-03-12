# 🎵 Hyrup - Music Streaming & Upload Platform

A backend API service for a music streaming and uploading platform. This application handles user authentication, artist management, and secure song file uploads with cloud storage integration.

## ✨ Features

- **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **Artist Management** - Create and manage artist profiles
- **Song Uploads** - Upload and manage songs with cloud storage integration
- **Cloud Storage** - ImageKit integration for reliable file hosting
- **MongoDB Integration** - NoSQL database for flexible data storage
- **File Validation** - Comprehensive file upload validation using Multer
- **Error Handling** - Centralized error handling middleware
- **RESTful API** - Clean and intuitive API endpoints

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** Bcrypt
- **File Upload:** Multer
- **Cloud Storage:** ImageKit
- **Development:** Nodemon

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)
- ImageKit account (for cloud file storage)

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hyrup.git
cd hyrup/demo_task

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_ACCESS_SECRET=your_jwt_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

**Note:** Replace all placeholder values with your actual credentials:
- `MONGO_URL`: MongoDB connection string
- `JWT_ACCESS_SECRET`: Your secret key for JWT signing
- `IMAGEKIT_*`: Your ImageKit API credentials

### 3. Running the Application

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
hyrup/demo_task/
├── src/
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # Server entry point
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── imagekit.js           # ImageKit configuration
│   ├── controllers/
│   │   ├── authcontroller.js     # Authentication logic
│   │   └── uploadcontroller.js   # Upload & artist validation
│   ├── middleware/
│   │   ├── authmiddleware.js     # JWT verification
│   │   ├── artistmiddleware.js   # Artist validation
│   │   └── errormiddleware.js    # Error handling
│   ├── model/
│   │   ├── user.js               # User database schema
│   │   ├── artist.js             # Artist database schema
│   │   └── songs.js              # Songs database schema
│   ├── routes/
│   │   ├── authroute.js          # Authentication endpoints
│   │   └── uploadroute.js        # Upload endpoints
│   └── utils/
│       ├── multer.js             # Multer file upload config
│       ├── tokengen.js           # JWT token generation
│       ├── useridgen.js          # User ID generation utility
│       └── uploadtoimgkit.js     # ImageKit upload utility
├── public/
│   └── audiofiles/               # Local audio storage directory
├── .env                          # Environment variables (not in repo)
├── package.json                  # Project dependencies
├── README.md                      # This file
└── documentaion.md               # Detailed documentation
```

## 📚 Database Models

### User Model
Stores user account information and credentials.

```javascript
{
  name: String,           // User's full name
  userID: String,         // Unique user identifier
  email: String,          // User's email (unique)
  password: String,       // Hashed password
  createdAt: Date
}
```

### Artist Model
Manages artist profiles and metadata.

```javascript
{
  artistID: String,       // Unique artist identifier
  artistName: String,     // Artist name
  bio: String,            // Artist biography
  email: String,          // Artist contact email
  userID: String,         // Reference to user
  createdAt: Date
}
```

### Songs Model
Stores song information and metadata.

```javascript
{
  songID: String,         // Unique song identifier
  songName: String,       // Title of the song
  artist: String,         // Artist name
  audioURL: String,       // CloudURL to audio file
  imageURL: String,       // URL to song cover image
  artistID: String,       // Reference to artist
  createdAt: Date
}
```

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth`) & (`/api/v1/login`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create new user account |
| POST | `/login` | Authenticate user & get JWT token |

### Upload Routes (`/api/v1/upload`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/artist-check` | Verify and check artist status |
| POST | `/create-artist` | Create new artist profile |
| POST | `/song` | Upload a new song |
| GET | `/songs` | Retrieve all available songs |
| GET | `/artist-songs/:artistID` | Get songs by specific artist |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are generated during login and expire based on your configuration.

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.2.4 | MongoDB ODM |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| bcrypt | ^6.0.0 | Password hashing |
| multer | ^2.1.1 | File upload handling |
| imagekit | ^6.0.0 | Cloud file storage |
| dotenv | ^17.3.1 | Environment variables |
| nodemon | ^3.1.14 | Development tool (devDependency) |

## 🎯 Usage Example

### 1. Register a new user
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/login/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### 3. Create Artist Profile
```bash
curl -X POST http://localhost:5000/api/v1/upload/create-artist \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "artistName": "The Weeknd",
    "bio": "Music producer and singer"
  }'
```

## 🐛 Error Handling

The API includes comprehensive error handling with proper HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 👨‍💻 Author

Created by Muthu

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## 🗺️ Roadmap

- [ ] Add comprehensive test suite
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement caching layer
- [ ] Add email verification
- [ ] Support for multiple audio formats
- [ ] Analytics and statistics
- [ ] Playlist functionality

---

**Happy coding! 🎉**
