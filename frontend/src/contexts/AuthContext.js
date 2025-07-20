import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state on app load
    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    authService.logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await authService.login(credentials);

            if (response.token) {
                authService.setToken(response.token);
                authService.setUserData(response);
                setUser(response);
                toast.success('Login successful!');
                return { success: true };
            } else {
                toast.error('Login failed. Please try again.');
                return { success: false };
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please check your credentials.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await authService.register(userData);

            if (response._id) {
                toast.success('Registration successful! Please login.');
                return { success: true };
            } else {
                toast.error('Registration failed. Please try again.');
                return { success: false };
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Admin login function
    const loginAdmin = async (credentials) => {
        try {
            setLoading(true);
            const response = await authService.loginAdmin(credentials);

            if (response.token) {
                authService.setToken(response.token);
                authService.setUserData(response);
                setUser(response);
                toast.success('Admin login successful!');
                return { success: true };
            } else {
                toast.error('Admin login failed. Please try again.');
                return { success: false };
            }
        } catch (error) {
            console.error('Admin login error:', error);
            toast.error('Admin login failed. Please check your credentials.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        authService.logout();
        setUser(null);
        toast.success('Logged out successfully!');
    };

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            setLoading(true);
            const response = await authService.updateProfile(userData);

            if (response._id) {
                authService.setUserData(response);
                setUser(response);
                toast.success('Profile updated successfully!');
                return { success: true };
            } else {
                toast.error('Profile update failed. Please try again.');
                return { success: false };
            }
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error('Profile update failed. Please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // Update user preferences
    const updatePreferences = async (preferences) => {
        try {
            setLoading(true);
            const response = await authService.updatePreferences(preferences);

            if (response._id) {
                authService.setUserData(response);
                setUser(response);
                toast.success('Preferences updated successfully!');
                return { success: true };
            } else {
                toast.error('Preferences update failed. Please try again.');
                return { success: false };
            }
        } catch (error) {
            console.error('Preferences update error:', error);
            toast.error('Preferences update failed. Please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        loginAdmin,
        logout,
        updateProfile,
        updatePreferences,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 