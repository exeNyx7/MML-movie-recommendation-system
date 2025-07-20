# My Movie List (MML) - Frontend

A modern, responsive React frontend for the My Movie List movie recommendation system.

## 🎬 Features

### ✅ Implemented

- **Modern React Setup** - React 18 with hooks and functional components
- **Authentication System** - Login/Register with JWT token management
- **Responsive Design** - Mobile-first approach with styled-components
- **Routing** - React Router v6 with protected routes
- **State Management** - React Context for authentication
- **API Integration** - Axios with interceptors and error handling
- **UI Components** - Modern, clean design with smooth animations
- **Loading States** - Spinners and loading indicators
- **Error Handling** - Toast notifications and error boundaries

### 🚧 Coming Soon

- **Movie Browsing** - Search, filter, and browse movies
- **Movie Details** - Detailed movie information and reviews
- **User Profile** - Profile management and preferences
- **Wishlist** - Save and manage favorite movies
- **Admin Dashboard** - Movie and user management
- **Reviews & Ratings** - Rate and review movies
- **Recommendations** - Personalized movie suggestions

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls
- **React Query** - Data fetching and caching
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **Inter Font** - Modern typography

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend-development-for-movie-recommendation-system/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── api/                    # API services
│   ├── axiosInstance.js   # Axios configuration
│   ├── authService.js     # Authentication API calls
│   ├── movieService.js    # Movie-related API calls
│   └── reviewService.js   # Review-related API calls
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   │   └── LoadingSpinner.js
│   └── layout/           # Layout components
│       ├── Navbar.js
│       └── Footer.js
├── contexts/             # React contexts
│   └── AuthContext.js    # Authentication context
├── pages/                # Page components
│   ├── Home.js          # Landing page
│   ├── Login.js         # Login page
│   ├── Register.js      # Registration page
│   ├── Movies.js        # Movie browsing (placeholder)
│   ├── MovieDetail.js   # Movie details (placeholder)
│   ├── Profile.js       # User profile (placeholder)
│   ├── Wishlist.js      # User wishlist (placeholder)
│   ├── AdminDashboard.js # Admin panel (placeholder)
│   └── NotFound.js      # 404 page
├── App.js               # Main app component
└── index.js             # App entry point
```

## 🎨 Design System

### Colors

- **Primary**: `#667eea` (Purple gradient)
- **Secondary**: `#764ba2` (Dark purple)
- **Background**: `#f8fafc` (Light gray)
- **Text**: `#1e293b` (Dark gray)
- **Muted**: `#64748b` (Medium gray)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed navbar with backdrop blur

## 🔐 Authentication

The app uses JWT tokens for authentication:

1. **Login/Register** - Users can create accounts or sign in
2. **Token Storage** - JWT tokens stored in localStorage
3. **Protected Routes** - Routes that require authentication
4. **Admin Routes** - Special routes for admin users
5. **Auto Logout** - Automatic logout on token expiration

## 📱 Responsive Design

The frontend is fully responsive with:

- **Mobile-first** approach
- **Breakpoints**: 768px, 1024px, 1200px
- **Flexible layouts** using CSS Grid and Flexbox
- **Touch-friendly** interactions
- **Optimized** for all screen sizes

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔧 Development

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Update navigation if needed

### Adding New API Calls

1. Create a new service in `src/api/`
2. Use the existing `axiosInstance` for consistency
3. Add error handling and loading states

### Styling

- Use styled-components for component-specific styles
- Follow the existing design system
- Use the color palette and typography defined above

## 🌐 API Integration

The frontend integrates with the backend API:

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT tokens in Authorization header
- **Error Handling**: Automatic error messages and redirects
- **Loading States**: Spinners and loading indicators

## 📋 TODO

### High Priority

- [ ] Implement movie browsing and search
- [ ] Create movie detail pages
- [ ] Add user profile management
- [ ] Implement wishlist functionality

### Medium Priority

- [ ] Add movie reviews and ratings
- [ ] Create admin dashboard
- [ ] Implement recommendations
- [ ] Add movie filtering and sorting

### Low Priority

- [ ] Add movie trailers
- [ ] Implement social features
- [ ] Add movie lists and collections
- [ ] Create mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the My Movie List (MML) system.

## 🆘 Support

For support and questions:

- Check the backend documentation
- Review the API endpoints
- Test with Postman collection

---

**My Movie List (MML)** - Your personal movie discovery platform 🎬
