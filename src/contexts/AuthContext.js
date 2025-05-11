// Path: src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null); // Initialize with null or a default shape

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) { // Or check if context is null if initialized with null
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial check

    useEffect(() => {
        // Check if user is logged in from localStorage on app load
        try {
            const storedUser = localStorage.getItem('movieAppUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing stored user from localStorage", error);
            localStorage.removeItem('movieAppUser'); // Clear corrupted data
        }
        setLoading(false); // Done checking
    }, []);

    const login = (username, password) => {
        // In a real app, you'd call an API here.
        // For this demo, simple validation.
        if (username && username.trim() !== "" && password && password.trim() !== "") {
            const userData = { username };
            localStorage.setItem('movieAppUser', JSON.stringify(userData));
            setUser(userData);
            return true; // Login successful
        }
        setUser(null); // Ensure user is null if login fails
        return false; // Login failed
    };

    const logout = () => {
        localStorage.removeItem('movieAppUser');
        setUser(null);
    };

    // Don't render children until loading is false to prevent flicker or race conditions
    if (loading) {
        return null; // Or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};