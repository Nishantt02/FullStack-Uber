# Uber Frontend

This is the frontend for the Uber clone application. It is built using React and Vite, and it interacts with the backend services to provide a seamless user experience.

## Features

- **User Registration:** Allows new users to sign up.
- **User Login:** Allows existing users to log in.
- **Captain Registration:** Allows new captains to sign up.
- **Captain Login:** Allows existing captains to log in.
- **Home Page:** Provides an entry point to the application.

## Endpoints

### User Registration

- **URL:** `/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `201 Created`: Returns the authentication token and user data.
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "password": "hashed_password",
        "socketid": "socket_id"
      }
    }
    ```
  - `400 Bad Request`: Returns validation errors or if the user already exists.
    ```json
    {
      "errors": [
        {
          "msg": "Email is not valid",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
  - `500 Internal Server Error`: Returns an error message.
    ```json
    {
      "error": "error_message"
    }
    ```

### User Login

- **URL:** `/users/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `200 OK`: Returns the authentication token and user data.
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "socketid": "socket_id"
      }
    }
    ```
  - `400 Bad Request`: Returns validation errors.
    ```json
    {
      "errors": [
        {
          "msg": "Email is not valid",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
  - `401 Unauthorized`: Returns an error message if the credentials are invalid.
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
  - `500 Internal Server Error`: Returns an error message.
    ```json
    {
      "error": "error_message"
    }
    ```

### Captain Registration

- **URL:** `/captain/register`
- **Method:** `POST`
- **Description:** Registers a new captain.
- **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Responses:**
  - `201 Created`: Returns the authentication token and captain data.
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```
  - `400 Bad Request`: Returns validation errors or if the captain already exists.
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
  - `500 Internal Server Error`: Returns an error message.
    ```json
    {
      "error": "error_message"
    }
    ```

### Captain Login

- **URL:** `/captain/logincaptain`
- **Method:** `POST`
- **Description:** Authenticates a captain and returns a token.
- **Request Body:**
  ```json
  {
    "email": "jane.doe@example.com",
    "password": "password123"
  }
  ```
- **Responses:**
  - `200 OK`: Returns the authentication token and captain data.
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```
  - `400 Bad Request`: Returns validation errors.
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
  - `401 Unauthorized`: Returns an error message if the credentials are invalid.
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
  - `500 Internal Server Error`: Returns an error message.
    ```json
    {
      "error": "error_message"
    }
    ```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/uber-frontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd uber-frontend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Lints the codebase.

## Learn More

To learn more about React and Vite, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
