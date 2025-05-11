// Path: src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeContextProvider } from './contexts/ThemeContext';
import { MovieProvider } from './contexts/MovieContext';
import { AuthProvider } from './contexts/AuthContext';

// Page Components
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';

// UI Components
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

function App() {
    return (
        <ThemeContextProvider>
            <AuthProvider> {/* Ensure this is correctly wrapping */}
                <MovieProvider>
                    <Router>
                        <Navbar />
                        <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/" element={<HomePage />} />
                                <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
                                <Route path="/favorites" element={<FavoritesPage />} />
                            </Routes>
                        </Container>
                    </Router>
                </MovieProvider>
            </AuthProvider>
        </ThemeContextProvider>
    );
}

export default App;