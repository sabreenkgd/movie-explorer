import React, { useContext } from 'react';
import { Grid, Typography, Container, Alert } from '@mui/material';
import MovieCard from '../components/MovieCard';
import MovieContext from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext'; // To check if user is logged in
import { Navigate } from 'react-router-dom'; // For redirecting if not logged in

const FavoritesPage = () => {
    const { favorites } = useContext(MovieContext);
    const { user } = useAuth();

    // If user is not logged in, redirect to login page
    // Pass current location so user can be redirected back after login
    if (!user) {
        return <Navigate to="/login" state={{ from: { pathname: "/favorites" } }} replace />;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
                My Favorite Movies
            </Typography>
            {favorites.length === 0 ? (
                <Alert severity="info">You haven't added any movies to your favorites yet. Click the heart icon on a movie to add it!</Alert>
            ) : (
                <Grid container spacing={2}>
                    {favorites.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} sx={{ display: 'flex' }}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default FavoritesPage;