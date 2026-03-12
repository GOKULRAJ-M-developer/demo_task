# HYRUP - Music Streaming & Upload Platform

## Project Overview
Demo is a backend application for a music streaming and uploading platform. It provides APIs for user authentication, artist management, and song file uploads. The application is built with Node.js, Express, MongoDB, and ImageKit for cloud storage.

---

## Table of Contents
1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [Project Structure](#project-structure)
4. [Database Models](#database-models)
5. [API Endpoints](#api-endpoints)
6. [Utilities & Helper Functions](#utilities--helper-functions)
7. [How to Run](#how-to-run)
8. [Dependencies](#dependencies)

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)
- ImageKit account (for cloud file storage)

### Steps
```bash
# Clone or navigate to project directory
cd hyrup/demo_task

# Install dependencies
npm install
```

---

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_ACCESS_SECRET=your_jwt_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

**Note:** Replace placeholder values with your actual credentials.

---

## Project Structure

```
hyrup/demo_task/
├── config/
│   ├── db.js                 # Database connection configuration
│   └── imagekit.js           # ImageKit configuration
├── controllers/
│   ├── authcontroller.js     # Authentication logic
│   └── uploadcontroller.js   # Upload and artist validation logic
├── middleware/               # Express middleware (currently empty)
├── model/
│   ├── user.js              # User schema
│   ├── artist.js            # Artist schema
│   └── songs.js             # Songs schema
├── routes/
│   └── uploadroute.js       # Upload routes
├── utils/
│   ├── multer.js            # Multer configuration for file uploads
│   ├── tokengen.js          # JWT token generation
│   ├── useridgen.js         # User ID generation
│   └── uploadtoimgkit.js    # ImageKit upload utility
├── public/
│   └── audiofiles/          # Default audio file storage directory
├── server.js                # Main application entry point
├── package.json             # Project dependencies
└── documentaion.md          # This file
```

---

## Database Models

### 1. User Model
**Collection:** `users`

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  userID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["listener", "artist"],
    default: "listener"
  },
  timestamps: true
}
```

**Purpose:** Stores user account information and authentication credentials.
- `name`: User's full name
- `email`: Unique email for authentication
- `password`: Bcrypt hashed password
- `userID`: Unique identifier for tracking user activity
- `type`: Differentiates between regular listeners and artists

---

### 2. Artist Model
**Collection:** `artists`

```javascript
{
  artistid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  timestamps: true
}
```

**Purpose:** Stores artist profile information.
- `artistid`: Unique identifier (linked to user ID when artist registers)
- `name`: Artist's display name
- **Note:** Future enhancement - add `country` field for artist location tracking

---

### 3. Songs Model
**Collection:** `songs`

```javascript
{
  songid: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  fileurl: {
    type: String,
    required: true
  },
  artistid: {
    type: String,
    required: true
  },
  timestamps: true
}
```

**Purpose:** Stores song metadata and file references.
- `songid`: Unique identifier for each song
- `title`: Song title
- `fileurl`: URL/path to the audio file (stored in ImageKit or local storage)
- `artistid`: Reference to the artist who uploaded the song

---

## API Endpoints

### Authentication Routes
*Future Implementation* - Currently defined in `authcontroller.js`

#### Register User
```
POST /api/v1/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "type": "listener" or "artist"
}

Response: 
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN"
}
```

**Logic:**
- Validates all required fields
- Checks if user already exists
- Hashes password using bcrypt (salt rounds: 10)
- Generates unique user ID
- If type is "artist", creates corresponding artist profile
- Generates JWT token with 30-day expiration

---

### Upload Routes
*Currently Active*

#### Upload Song
```
POST /api/v1/upload/song
Content-Type: multipart/form-data

Parameters:
- song: [audio file]

Response:
{
  "message": "uploaded successfully",
  "file": {
    "fieldname": "song",
    "originalname": "mysong.mp3",
    "filename": "randomhexname.mp3",
    "path": "/public/audiofiles/randomhexname.mp3",
    "size": 5242880
  }
}
```

**Logic:**
- Accepts audio files via Multer
- Generates random filename using crypto
- Stores in `public/audiofiles/` directory
- *Future:* Validate artist status before upload

---

## Utilities & Helper Functions

### 1. Multer Configuration (`utils/multer.js`)
- **Purpose:** Handles file uploads with disk storage
- **Storage Location:** `public/audiofiles/`
- **Filename:** Generated using crypto.randomBytes() + original extension
- **Features:**
  - Disk storage with custom naming
  - Preserves original file extension

### 2. JWT Token Generation (`utils/tokengen.js`)
- **Function:** `generateAccessToken(id, email, type)`
- **Purpose:** Creates JWT tokens for authenticated sessions
- **Format:** Contains user id, email, and type (listener/artist)
- **Expiration:** 30 days
- **Secret Key:** Uses `process.env.JWT_ACCESS_SECRET`

### 3. User ID Generation (`utils/useridgen.js`)
- **Function:** `generateUserId()`
- **Purpose:** Creates unique user identifiers
- **Implementation:** *To be verified in actual file*

### 4. ImageKit Upload (`utils/uploadtoimgkit.js`)
- **Purpose:** Uploads files to ImageKit cloud storage
- **Configuration:** Uses credentials from `.env` file
- **Status:** Ready for integration with upload endpoints

---

## How to Run

### Development Mode
```bash
npm run dev
```
- Runs with Nodemon for auto-restart on file changes
- Server listens on PORT defined in `.env`

### Production Mode
```bash
npm start
```
- Starts the server normally
- Server listens on PORT defined in `.env`

### Verify Server
```
GET http://localhost:5000/
Expected Response: "success !!!"
```

---

## Dependencies

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework for Node.js |
| mongoose | ^9.2.4 | MongoDB object mapping |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| bcrypt | ^6.0.0 | Password hashing and verification |
| multer | ^2.1.1 | File upload middleware |
| dotenv | ^17.3.1 | Environment variable management |
| imagekit | ^6.0.0 | Cloud image/file storage service |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| nodemon | ^3.1.14 | Auto-restart server during development |

---

## Architecture Overview

### Flow: User Registration
1. User provides credentials (name, email, password, type)
2. Password is hashed using bcrypt
3. Unique user ID is generated
4. User record is created in MongoDB
5. If type is "artist", artist profile is created
6. JWT token is generated and returned
7. Token valid for 30 days

### Flow: Song Upload
1. Artist selects audio file
2. Multer receives file and saves to `public/audiofiles/`
3. Random filename is generated with original extension
4. File metadata (size, path, etc.) is returned
5. *Future:* Save metadata to Songs collection with artistid

---

## Future Enhancements

1. **Artist Country Field** - Add country to artist schema
2. **Authentication Middleware** - Implement JWT verification middleware
3. **Upload to ImageKit** - Integrate ImageKit for cloud storage
4. **Song Metadata Storage** - Save upload response to Songs collection
5. **Get User Endpoint** - Retrieve user/artist profile information
6. **Get Songs Endpoint** - List songs by artist or all songs
7. **Delete Song** - Remove song and associated data
8. **Premium Features** - Implement premium vs listener functionality
9. **Error Handling** - Standardize error responses across all endpoints
10. **Input Validation** - Add comprehensive request validation

---

## Notes

- Timestamps are automatically added to all documents (createdAt, updatedAt)
- Password hashing is done with bcrypt (10 salt rounds)
- JWT tokens include user ID, email, and type information
- File uploads use random hex names for security
- Original file extensions are preserved during upload
- The application uses ES6 modules (type: "module" in package.json)

---

**Last Updated:** March 6, 2026
**Version:** 1.0.0
