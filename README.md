# Movie Recommendation System Backend

## Project Overview

This project is a backend system for a movie recommendation platform. Built using **ExpressJS** and **MongoDB**,
it offers features such as user authentication, personalized recommendations, movie management,
discussion forums, reviews, and reminders.

## Features

- **User Management**: Authentication, profile updates, preferences, and wishlist.
- **Movie Management**: CRUD operations, search, filters, and trending movies.
- **Recommendations**: Personalized, trending, and top-rated recommendations.
- **Reviews**: Rate and review movies with highlights for top reviews.
- **Community Features**: Discussions and comments.
- **Reminders**: Email notifications for upcoming releases.
- **Admin Dashboard**: Insights into movies, genres, and user activities.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DawoodQamar2522/backend-development-for-movie-recommendation-system
   cd backend-development-for-movie-recommendation-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGO_URI=Your_MongoDB_Connection_String
   JWT_SECRET=Your_JWT_Token
   PORT=3000

   EMAIL_USERNAME=Your_Gmail
   EMAIL_PASSWORD=Your_Gmail_App_Password
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `PORT`: Port number for the server.
- `EMAIL_USERNAME`: Email address for sending notifications.
- `EMAIL_PASSWORD`: App password for the email account.

## API Endpoints

### **Actors**

- `POST /actors`: Add a new actor (Admin-only).
- `GET /actors`: Retrieve all actors.
- `GET /actors/:id`: Retrieve a specific actor.
- `PUT /actors/:id`: Update actor details (Admin-only).
- `DELETE /actors/:id`: Delete an actor (Admin-only).

### **Movies**

- `POST /movies`: Add a new movie (Admin-only).
- `GET /movies`: Retrieve all movies.
- `GET /movies/:id`: Retrieve a specific movie.
- `PUT /movies/:id`: Update movie details (Admin-only).
- `DELETE /movies/:id`: Delete a movie (Admin-only).

### **Reviews**

- `POST /reviews`: Add a review.
- `GET /reviews/movie/:movieId`: Retrieve all reviews for a movie.
- `POST /reviews/rate-review`: Rate and review a movie.

### **Recommendations**

- `GET /recommendations/personalized`: Personalized recommendations (Authenticated users only).

### **More Routes**

Detailed API routes are implemented for trailers, reminders, lists, awards, and more.

## File Structure

```
/config
  - auth.js
  - db.js
/middlewares
  - authMiddleware.js
  - errorHandler.js
  - roleCheck.js
/controllers
  - actorController.js
  - movieController.js
  - ...other controllers
/models
  - Actor.js
  - Movie.js
  - ...other models
/routes
  - actorRoutes.js
  - movieRoutes.js
  - ...other routes
server.js
.gitignore
.gitattributes
.env
-...... 
```

- **`config/`**: Contains configuration files for the database and authentication.
- **`middlewares/`**: Custom middleware for authentication and role checks.
- **`controllers/`**: Logic for handling API requests.
- **`models/`**: Mongoose schemas for the database.
- **`routes/`**: API route definitions.

## Future Enhancements

- Add user-friendly error messages.
- Enhance logging with tools like Winston or Morgan.
- Optimize database queries for better performance.

## Credits

Developed by Dawood Qamar.
