# Chai aur Backend Series
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/prathamesh3245/Js-Backend)

A full-stack JavaScript backend for a video platform, built with Node.js, Express, and MongoDB. This project covers essential backend concepts including authentication, data modeling, file uploads, and creating a production-grade API structure.

- [Model Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)


## ⚙️ System Architecture
![flowchart TD

subgraph group_runtime["Runtime"]
  node_src_index["Entry point<br/>bootstrap<br/>[index.js]"]
  node_src_constants["Constants<br/>[constants.js]"]
end

subgraph group_http["HTTP API"]
  node_src_app["Express app<br/>http composition<br/>[app.js]"]
  node_src_routes_user["User routes<br/>route map<br/>[user.routes.js]"]
  node_src_mw_auth["Auth guard<br/>jwt middleware<br/>[auth.middleware.js]"]
  node_src_mw_multer["Upload gate<br/>multipart middleware"]
end

subgraph group_domain["Domain"]
  node_src_ctrl_user["User controller<br/>api controller<br/>[user.controller.js]"]
  node_src_models_user[("User model<br/>mongoose model<br/>[user.model.js]")]
  node_src_models_video[("Video model<br/>mongoose model<br/>[video.model.js]")]
  node_src_models_subscription[("Subscription model<br/>mongoose model")]
end

subgraph group_integrations["Integrations"]
  node_src_db_index["DB connector<br/>mongo bootstrap<br/>[index.js]"]
  node_mongo[("MongoDB<br/>database")]
  node_cloudinary(("Cloudinary<br/>media store"))
end

subgraph group_utils["Utilities"]
  node_src_utils_cloudinary["Cloudinary util<br/>upload helper<br/>[cloudinary.js]"]
  node_src_utils_apierror["ApiError<br/>error helper<br/>[ApiError.js]"]
  node_src_utils_apiresponse["ApiResponse<br/>response helper<br/>[ApiResponse.js]"]
  node_src_utils_asynchandler["Async handler<br/>promise helper<br/>[asyncHandler.js]"]
end

node_src_index -->|"boots"| node_src_app
node_src_index -->|"connects"| node_src_db_index
node_src_db_index -->|"uses"| node_mongo
node_src_app -->|"mounts"| node_src_routes_user
node_src_routes_user -->|"protects"| node_src_mw_auth
node_src_routes_user -->|"parses uploads"| node_src_mw_multer
node_src_routes_user -->|"dispatches"| node_src_ctrl_user
node_src_ctrl_user -->|"wrapped by"| node_src_utils_asynchandler
node_src_ctrl_user -->|"returns"| node_src_utils_apiresponse
node_src_ctrl_user -->|"throws"| node_src_utils_apierror
node_src_ctrl_user -->|"reads/writes"| node_src_models_user
node_src_ctrl_user -->|"reads"| node_src_models_video
node_src_ctrl_user -->|"reads"| node_src_models_subscription
node_src_ctrl_user -->|"uploads media"| node_src_utils_cloudinary
node_src_utils_cloudinary -->|"stores"| node_cloudinary
node_src_mw_multer -->|"prepares files"| node_src_utils_cloudinary
node_src_app -->|"configures"| node_src_constants
node_src_ctrl_user -.->|"depends on"| node_src_mw_auth
node_src_ctrl_user -.->|"persists via models"| node_mongo

click node_src_index "https://github.com/prathamesh3245/js-backend/blob/main/src/index.js"
click node_src_app "https://github.com/prathamesh3245/js-backend/blob/main/src/app.js"
click node_src_routes_user "https://github.com/prathamesh3245/js-backend/blob/main/src/routes/user.routes.js"
click node_src_mw_auth "https://github.com/prathamesh3245/js-backend/blob/main/src/middlewares/auth.middleware.js"
click node_src_mw_multer "https://github.com/prathamesh3245/js-backend/blob/main/src/middlewares/multer.middleware.js"
click node_src_ctrl_user "https://github.com/prathamesh3245/js-backend/blob/main/src/controllers/user.controller.js"
click node_src_models_user "https://github.com/prathamesh3245/js-backend/blob/main/src/models/user.model.js"
click node_src_models_video "https://github.com/prathamesh3245/js-backend/blob/main/src/models/video.model.js"
click node_src_models_subscription "https://github.com/prathamesh3245/js-backend/blob/main/src/models/subscription.models.js"
click node_src_db_index "https://github.com/prathamesh3245/js-backend/blob/main/src/db/index.js"
click node_src_utils_cloudinary "https://github.com/prathamesh3245/js-backend/blob/main/src/utils/cloudinary.js"
click node_src_utils_apierror "https://github.com/prathamesh3245/js-backend/blob/main/src/utils/ApiError.js"
click node_src_utils_apiresponse "https://github.com/prathamesh3245/js-backend/blob/main/src/utils/ApiResponse.js"
click node_src_utils_asynchandler "https://github.com/prathamesh3245/js-backend/blob/main/src/utils/asyncHandler.js"
click node_src_constants "https://github.com/prathamesh3245/js-backend/blob/main/src/constants.js"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_src_index,node_src_constants toneBlue
class node_src_app,node_src_routes_user,node_src_mw_auth,node_src_mw_multer toneAmber
class node_src_ctrl_user,node_src_models_user,node_src_models_video,node_src_models_subscription toneMint
class node_src_db_index,node_mongo,node_cloudinary toneRose
class node_src_utils_cloudinary,node_src_utils_apierror,node_src_utils_apiresponse,node_src_utils_asynchandler toneIndigo
  
## ✨ Features

- **Authentication**: Secure user registration and login using JWT (Access & Refresh Tokens).
- **Password Hashing**: Bcrypt for robust password security.
- **User Management**: Comprehensive user profiles with avatar and cover image uploads.
- **Media Handling**: File uploads managed by Multer and hosted on Cloudinary.
- **Content Models**: Mongoose schemas for Users, Videos, and Subscriptions.
- **Channel & Subscriptions**: Functionality to view channel profiles and manage subscriptions between users.
- **Watch History**: Tracks videos viewed by authenticated users.
- **Robust API**: Well-structured API routes using Express Router.
- **Custom Utilities**: Standardized API responses (`ApiResponse`) and error handling (`ApiError`) for clean code.
- **Database Interaction**: Mongoose for elegant MongoDB object modeling and aggregation pipelines.

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
