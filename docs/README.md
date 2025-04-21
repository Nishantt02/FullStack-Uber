# Uber Backend

This is the backend for the Uber clone application. It handles user registration, authentication, and other backend services.

## Features

- **User Registration:** Allows new users to sign up.
- **User Login:** Allows existing users to log in.
- **User Profile:** Retrieves the authenticated user's profile.
- **User Logout:** Logs out the authenticated user.
- **Captain Registration:** Allows new captains to sign up.
- **Captain Login:** Allows existing captains to log in.
- **Captain Profile:** Retrieves the authenticated captain's profile.
- **Captain Logout:** Logs out the authenticated captain.

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

### User Profile

- **URL:** `/users/profile`
- **Method:** `GET`
- **Description:** Retrieves the authenticated user's profile.
- **Headers:**
  - `Authorization`: Bearer token
- **Responses:**
  - `200 OK`: Returns the user profile.
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "socketid": "socket_id"
      }
    }
    ```
  - `401 Unauthorized`: Returns an error message if the token is invalid or missing.
    ```json
    {
      "message": "Access Denied"
    }
    ```

### User Logout

- **URL:** `/users/logout`
- **Method:** `GET`
- **Description:** Logs out the authenticated user.
- **Headers:**
  - `Authorization`: Bearer token
- **Responses:**
  - `200 OK`: Returns a success message.
    ```json
    {
      "message": "Logout successful"
    }
    ```
  - `401 Unauthorized`: Returns an error message if the token is invalid or missing.
    ```json
    {
      "message": "Access Denied"
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

### Captain Profile

- **URL:** `/captain/profilecaptain`
- **Method:** `GET`
- **Description:** Retrieves the authenticated captain's profile.
- **Headers:**
  - `Authorization`: Bearer token
- **Responses:**
  - `200 OK`: Returns the captain profile.
    ```json
    {
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
  - `401 Unauthorized`: Returns an error message if the token is invalid or missing.
    ```json
    {
      "message": "Access Denied"
    }
    ```

### Captain Logout

- **URL:** `/captain/logoutcaptain`
- **Method:** `GET`
- **Description:** Logs out the authenticated captain.
- **Headers:**
  - `Authorization`: Bearer token
- **Responses:**
  - `200 OK`: Returns a success message.
    ```json
    {
      "message": "Logout successfully"
    }
    ```
  - `401 Unauthorized`: Returns an error message if the token is invalid or missing.
    ```json
    {
      "message": "Access Denied"
    }
    ```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/uber-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd uber-backend
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
2. The server will start on `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run test`: Runs the tests.

## Learn More

To learn more about Express and MongoDB, check out the following resources:

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

# Uber Frontend

This is the frontend for the Uber clone application. It provides a user-friendly interface for users and captains to interact with the backend services.

## Features

### User Features
- **User Registration:** Allows new users to sign up.
- **User Login:** Allows existing users to log in.
- **Book a Ride:** Users can book rides by selecting pickup and destination locations.
- **Live Tracking:** Users can track their rides in real-time.
- **User Logout:** Logs out the authenticated user.

### Captain Features
- **Captain Registration:** Allows new captains to sign up.
- **Captain Login:** Allows captains to log in and manage their rides.
- **Accept Rides:** Captains can accept ride requests.
- **Live Tracking:** Captains can share their live location with users.
- **Captain Logout:** Logs out the authenticated captain.

## Project Structure

The project is organized as follows:

```
src/
├── assets/                # Static assets like images and icons
├── components/            # Reusable UI components
├── Context/               # React Context for state management
├── pages/                 # Page components for routing
├── App.jsx                # Main application component
├── main.jsx               # Entry point for the application
├── App.css                # Global styles
├── index.css              # Tailwind CSS configuration
├── .env                   # Environment variables
```

## Key Components

### Components
- **`ConfirmRide.jsx`**: Handles ride confirmation.
- **`LiveTracking.jsx`**: Displays live tracking of the ride.
- **`VehiclePanel.jsx`**: Allows users to select a vehicle type.
- **`WaitingForDriver.jsx`**: Displays a waiting screen while searching for a driver.

### Pages
- **`Home.jsx`**: Main page for booking rides.
- **`UserSignup.jsx`**: User registration page.
- **`UserLogin.jsx`**: User login page.
- **`CaptainSignup.jsx`**: Captain registration page.
- **`CaptainLogin.jsx`**: Captain login page.
- **`Riding.jsx`**: Displays ride details during an ongoing ride.

### Context
- **`UserContext.jsx`**: Manages user state.
- **`CaptainContext.jsx`**: Manages captain state.
- **`SocketContext.jsx`**: Manages WebSocket connections.

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

### Environment Variables

Create a `.env` file in the `src` directory with the following variables:
```
VITE_BASE_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```
2. The application will start on `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Google Maps API Documentation](https://developers.google.com/maps/documentation)

## Sources

- **Backend API**: The frontend interacts with the backend API hosted at `http://localhost:3000`.
- **Google Maps API**: Used for location-based features like live tracking and location search.

## License

This project is licensed under the MIT License. See the LICENSE file for details.