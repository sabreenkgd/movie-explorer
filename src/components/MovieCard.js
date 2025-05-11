import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Rating, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getImageUrl } from '../services/tmdbService';

const MovieCard = ({ movie }) => {
    if (!movie) return null;

    return (
        <Card sx={{ maxWidth: 300, m: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardActionArea component={RouterLink} to={`/movie/${movie.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="350" // Adjust as needed
                    image={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limit to 2 lines
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating 
                            name="read-only" 
                            value={movie.vote_average / 2} // TMDb rating is out of 10, MUI Rating is out of 5
                            precision={0.1} 
                            readOnly 
                            size="small"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({movie.vote_average.toFixed(1)})
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MovieCard;