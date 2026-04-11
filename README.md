# Chai aur Backend Series
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/prathamesh3245/Js-Backend)

A full-stack JavaScript backend for a video platform, built with Node.js, Express, and MongoDB. This project covers essential backend concepts including authentication, data modeling, file uploads, and creating a production-grade API structure.

- [Model Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)


## ⚙️ System Architecture

<img width="2148" height="2540" alt="diagram (1)" src="https://github.com/user-attachments/assets/438ffe5a-4870-4e96-8ee7-26a3fd12ad8e" />


## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ODM**: Mongoose, mongoose-aggregate-paginate-v2
- **Authentication**: JWT (jsonwebtoken), Bcrypt
- **File Upload**: Cloudinary, Multer
- **Environment**: dotenv
- **Middleware**: CORS, cookie-parser
- **Dev Tools**: Nodemon, Prettier]

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or a cloud service like MongoDB Atlas)
- A [Cloudinary](https://cloudinary.com/) account for media asset management.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/prathamesh3245/js-backend.git
    cd js-backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the sample file:
    ```sh
    cp .env.sample .env
    ```
    Update the `.env` file with your credentials.

    ```env
    PORT=8000
    MONGODB_URL=<Your_MongoDB_Connection_String>
    CORS_ORIGIN=*

    ACCESS_TOKEN_SECRET=<Your_Access_Token_Secret>
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=<Your_Refresh_Token_Secret>
    REFRESH_TOKEN_EXPIRY=10d

    CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
    CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
    CLOUDINARY_SECRET_KEY=<Your_Cloudinary_Secret_Key>
    ```

4.  **Run the application:**
    To start the server in development mode with hot-reloading:
    ```sh
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:8000`).

## Project Structure

The project follows a modular structure to keep the codebase organized and scalable.

```
/src
├── app.js              # Express app configuration & core middleware
├── index.js            # Main entry point, database connection, and server startup
├── constants.js        # Project-wide constants (e.g., DB_NAME)
├── db/                 # Database connection logic
├── controllers/        # Route handlers containing the business logic for each API endpoint
├── middlewares/        # Custom Express middlewares (authentication, file upload handling)
├── models/             # Mongoose data models and schemas (User, Video, Subscription)
├── routes/             # API route definitions using Express Router
└── utils/              # Helper utilities (ApiError, ApiResponse, asyncHandler, Cloudinary helper)
```

## 🔐 API Endpoints

All endpoints are prefixed with `/api/v1`.

### User Routes (`/users`)

| Method  | Endpoint              | Description                                                          | Secured |
| :------ | :-------------------- | :------------------------------------------------------------------- | :------ |
| `POST`  | `/register`           | Register a new user with avatar and cover image.                     | No      |
| `POST`  | `/login`              | Log in a user with email/username and password.                      | No      |
| `POST`  | `/logout`             | Log out the current authenticated user and clear refresh token.        | Yes     |
| `POST`  | `/refreshToken`       | Refresh an expired access token using a valid refresh token.         | Yes     |
| `POST`  | `/change-password`    | Change the password for the current authenticated user.                | Yes     |
| `GET`   | `/get-user`           | Get the details of the currently authenticated user.                 | Yes     |
| `PATCH` | `/update-account`     | Update the full name and email of the authenticated user.            | Yes     |
| `PATCH` | `/avatar`             | Update the avatar image for the authenticated user.                  | Yes     |
| `PATCH` | `/coverImage`         | Update the cover image for the authenticated user.                   | Yes     |
| `GET`   | `/c/:username`        | Get a user's channel profile, including subscriber counts.           | Yes     |
| `GET`   | `/history`            | Get the watch history of the authenticated user.                     | Yes     |

*Note: Secured routes require a valid JWT `accessToken` to be sent in the cookies or as a `Bearer` token in the `Authorization` header.*
