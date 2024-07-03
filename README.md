# Startup-Board

## Overview

Start-Up Board is a web application designed to connect startup founders with potential investors. Founders can create and manage their startup profiles, while investors can browse and interact with these profiles. The application is built using Node.js, MongoDB for the backend, and React with Tailwind CSS for the frontend.

## Live (`https://startup-board.netlify.app`)

## Features
- User Authentication: Register, login, and logout functionality with JWT-based authentication.
- Role-Based Access: Different functionalities based on user roles (founder, investor).
- Founder: Can perform CRUD operations on startup pages and view the investor list.
- Investor: Can perform CRUD operations on investor pages and view the startup list.
- Profile Management: Users can update their profile details and profile pictures.
- Responsive Design: Optimized for different screen sizes using Tailwind CSS.

## Technologies Used
- Backend: Node.js, MongoDB.
- Frontend: React, Tailwind CSS.
- Authentication: JWT (JSON Web Token).
- File Upload: Multer for handling profile picture uploads.

## Prerequisites
- Node.js and npm installed on your local machine.
- MongoDB Atlas or a local MongoDB instance.

## Installation
### Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/krishna7054/Startup-Board.git
    cd startup-board
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
 3. Set up environment variables. Create a .env file in the root directory with the following:
    ```sh
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```
4. Start the backend server:
   ```sh
   node server.js
   ```
### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install frontend dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage
### User Registration and Login
- Register a new user at /register.
- Login an existing user at /login.
### User Profile
- View and update profile information at /profile.
### Startups and Investors
- Founders can manage their startup profiles.
- Investors can manage their profiles and browse startups.
  
## API Endpoints
### Authentication
- POST /users/register: Register a new user.
- POST /users/login: Login a user.
### User Profile
- GET /users/me: Get logged-in user profile.
- PATCH /users/me: Update logged-in user profile.
- PATCH /users/me: Update profile picture.
### CRUD Operations
#### Founders: /startups
- GET: Get all startups.
- POST: Create a new startup.
- PATCH: Update a startup.
- DELETE: Delete a startup.
#### Investors: /investors
- GET: Get all investors.
- POST: Create a new investor profile.
- PATCH: Update an investor profile.
- DELETE: Delete an investor profile.

## File Structure
### Backend
```sh
startup-board/
├── config/
│   ├── db.js
│   └── config.js
├── controllers/
│   ├── userController.js
│   └── blogController.js
|   └── startupController.js
|   └── investorController.js
├── middleware/
│   ├── auth.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   └── Investor.js
|   └── Startup.js
|   └── Blog.js
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
|   └── investorRoutes.js
|   └── startupRoutes.js
├── utils/
│   └── errorHandler.js
├── .env
├── server.js
├── package.json
└── README.md

```
### Frontend
```sh
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Loader.js
│   │   └── ProtectedRouter.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── RegisterPage.js
│   │   ├── LoginPage.js
│   │   ├── AllBlogsPage.js
│   │   └── AllInvestorsPage.js
|   |   └── AllStartupsPage.js
|   |   └── BlogPage.js
|   |   └── InvestorPage.js
|   |   └── StartupPage.js
|   |   └── ProfilePage.js
│   ├── services/
│   │   ├── authService.js
│   │   └── blogService.js
|   |   └── investorService.js
|   |   └── startupService.js
│   ├── context/
|   |   └──AuthContext.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md

```
