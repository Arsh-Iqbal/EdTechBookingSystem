# EdTech Booking System

## Overview
The EdTech Booking System is a web-based application that enables seamless interaction between instructors and students for booking and managing educational sessions. This platform is built using modern web technologies such as React.js, Node.js, Express.js, and Firebase, providing a scalable and secure environment for users.

## Features
- **Authentication**: User authentication using JSON Web Tokens (JWT) and Firebase for secure sign-in.
- **Instructor Management**: APIs to create, read, update, and manage instructor availability.
- **Student Management**: APIs for viewing availability and booking time slots.
- **Secure Data Handling**: Data encryption with bcrypt for sensitive information.
- **CORS Support**: Enables cross-origin resource sharing for client-server interactions.

## Prerequisites
Ensure you have the following installed on your local development environment:
- Node.js (v14 or later)
- Firebase project setup
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone  https://github.com/Arsh-Iqbal/EdTechBookingSystem.git
  
   ```

2. Install server dependencies:
   ```bash
   cd api
   npm install
   ```

3. Create a `.env` file in the `api` directory and configure your environment variables:
   ```bash
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   FIREBASE_CONFIG=your_firebase_config
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   For production, use:
   ```bash
   npm start
   ```

5. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

6. Start the client development server:
   ```bash
   npm run dev
   ```

## Project Structure
```
├── api
│   ├── db.js                # Database connection file (Firebase integration)
│   ├── routes
│   │   ├── authRoutes.js    # Authentication routes
│   │   ├── instructorRoutes.js # Instructor management routes
│   │   └── studentRoutes.js # Student management routes
│   ├── .env                 # Environment variables
│   └── index.js             # Main server file
├── client
│   ├── src
│   │   ├── App.js           # Main React app file
│   │   ├── components       # Reusable components (Navbar, Dashboards, etc.)
│   │   ├── pages            # React pages (Home, Login, Signup)
│   │   └── index.css        # Global styles
│   └── package.json         # Client package file
└── README.md
```

## API Endpoints
### Authentication
- **POST** `/api/auth/signup`: Register a new user
- **POST** `/api/auth/login`: Authenticate a user and return a JWT

### Instructors
- **GET** `/api/instructors/availability/:instructorId`: Fetch instructor's availability
- **POST** `/api/instructors/availability`: Set availability for an instructor (protected)
- **PUT** `/api/instructors/availability/:instructorId`: Update an instructor's availability (protected)
- **GET** `/api/instructors/bookings`: Retrieve upcoming bookings (protected)

### Students
- **GET** `/api/students/availability/:instructorId`: View instructor's availability
- **POST** `/api/students/book`: Book a time slot with an instructor

## Dependencies
- **express**: Fast and minimalist web framework for Node.js
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **firebase** & **firebase-admin**: Firebase client and server SDKs
- **jsonwebtoken**: Secure user authentication
- **bcrypt** & **bcryptjs**: Password hashing
- **nodemon**: Tool for development that automatically restarts the server
- **React**: Front-end library for building user interfaces
- **react-router-dom**: Routing library for React
- **axios**: HTTP client for API calls
- **Tailwind CSS**:Utility-first CSS framework for styling

## License
This project is licensed under the ISC License.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgments
- [Express.js Documentation](https://expressjs.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React.js Documentation](https://reactjs.org/docs/getting-started.html)

