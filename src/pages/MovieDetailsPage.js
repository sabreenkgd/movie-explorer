import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdbService';
import { Typography, CircularProgress, Alert, Container, Grid, Paper, Chip, Button, Box, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieContext from '../contexts/MovieContext'; // We'll create this

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { favorites, toggleFavorite } = useContext(MovieContext); // Get favorites logic
    const isFavorite = movie ? favorites.some(fav => fav.id === movie.id) : false;

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (err) {
                setError('Failed to fetch movie details. Please try again.');
                console.error(err);
            }
            setLoading(false);
        };

        if (movieId) {
            fetchDetails();
        }
    }, [movieId]);

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    if (!movie) return <Typography sx={{ mt: 4 }}>Movie not found.</Typography>;

    const trailerUrl = movie.trailerKey ? `https://www.youtube.com/watch?v=${movie.trailerKey}` : null;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <img
                            src={getImageUrl(movie.poster_path, 'w500')}
                            alt={movie.title}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" gutterBottom component="h1">
                            {movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {movie.tagline}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
                            <Typography variant="body1" sx={{ ml: 1 }}>
                                {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                            </Typography>
                        </Box>

                        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Overview</Typography>
                        <Typography variant="body1" paragraph>
                            {movie.overview}
                        </Typography>

                        <Typography variant="h6" gutterBottom>Genres:</Typography>
                        <Box sx={{ mb: 2 }}>
                            {movie.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>

                        <Typography variant="h6" gutterBottom>Cast (Top Billed):</Typography>
                        <Grid container spacing={1} sx={{ mb: 2 }}>
                            {movie.cast && movie.cast.slice(0, 5).map((actor) => ( // Show first 5
                                <Grid item xs={6} sm={4} md={2.4} key={actor.cast_id}>
                                    <Paper variant="outlined" sx={{ p: 1, textAlign: 'center', height: '100%'}}>
                                        <img 
                                            src={getImageUrl(actor.profile_path, 'w185')} 
                                            alt={actor.name} 
                                            style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '4px', marginBottom: '4px'}} 
                                        />
                                        <Typography variant="caption">{actor.name}</Typography>
                                        <Typography variant="caption" display="block" color="text.secondary">{actor.character}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        
                        {trailerUrl && (
                            <Button
                                variant="contained"
                                color="secondary"
                                href={trailerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ mr: 2, mb: 1 }}
                            >
                                Watch Trailer
                            </Button>
                        )}
                         {/* Bonus: Embed Trailer
                        {movie.trailerKey && (
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="h6" gutterBottom>Trailer</Typography>
                                <iframe
                                    width="100%"
                                    height="315" // Adjust height as needed
                                    src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        )} */}


                        <Button
                            variant="outlined"
                            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            onClick={() => toggleFavorite(movie)}
                            sx={{ mb: 1 }}
                        >
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>

                        <Button component={RouterLink} to="/" variant="outlined" sx={{ ml: 2, mb: 1 }}>
                            Back to Home
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default MovieDetailsPage;