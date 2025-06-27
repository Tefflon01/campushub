# CampusHub

CampusHub is a modern, all-in-one web platform for students at the Air Force Institute of Technology (AFIT). It aims to enhance student life by providing tools for academic organization, collaboration, resource sharing, and a peer-to-peer marketplace.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/campushub.git
    cd campushub
    ```

2.  **Install server dependencies:**
    ```bash
    npm install
    ```

3.  **Install client dependencies:**
    ```bash
    npm install --prefix client
    ```

4.  **Create a `.env` file in the `server` directory** and add the following environment variables:

    ```
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_pass
    SENTRY_DSN=your_sentry_dsn
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```

    This will start both the client and server concurrently. The client will be available at `http://localhost:3000` and the server at `http://localhost:5000`.
