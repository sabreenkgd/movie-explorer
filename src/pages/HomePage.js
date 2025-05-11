import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, CircularProgress, Alert, Button, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies, searchMovies } from '../services/tmdbService';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch trending movies
    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTrendingMovies();
                setTrendingMovies(data);
            } catch (err) {
                setError('Failed to fetch trending movies. Please try again later.');
                console.error(err);
            }
            setLoading(false);
        };
        fetchTrending();
    }, []);

    // Fetch search results
    const handleSearch = useCallback(async (query, page = 1) => {
        if (!query) {
            setMovies([]); // Clear previous search results if query is empty
            setSearchTerm('');
            setCurrentPage(1);
            setTotalPages(0);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await searchMovies(query, page);
            if (page === 1) {
                setMovies(data.results); // New search
            } else {
                setMovies(prevMovies => [...prevMovies, ...data.results]); // Load more
            }
            setSearchTerm(query);
            setCurrentPage(data.page);
            setTotalPages(data.total_pages);
        } catch (err) {
            setError('Failed to search movies. Please try again later.');
            console.error(err);
        }
        setLoading(false);
    }, []);
    
    // Effect to handle initial search if lastSearchedMovie is present
    useEffect(() => {
        const lastSearch = localStorage.getItem('lastSearchedMovie');
        if (lastSearch) {
            handleSearch(lastSearch);
        }
    }, [handleSearch]);


    const loadMoreResults = () => {
        if (searchTerm && currentPage < totalPages) {
            handleSearch(searchTerm, currentPage + 1);
        }
    };

    const displayMovies = searchTerm ? movies : trendingMovies;
    const sectionTitle = searchTerm ? `Search Results for "${searchTerm}"` : "Trending Movies";

    return (
        <div>
            <SearchBar onSearch={(query) => handleSearch(query, 1)} />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Typography variant="h4" gutterBottom>{sectionTitle}</Typography>

            {loading && movies.length === 0 && !searchTerm && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}
            
            {displayMovies.length === 0 && !loading && searchTerm && (
                <Typography>No results found for "{searchTerm}".</Typography>
            )}
             {displayMovies.length === 0 && !loading && !searchTerm && trendingMovies.length === 0 && (
                <Typography>No trending movies available at the moment.</Typography>
            )}


            <Grid container spacing={2}>
                {displayMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} sx={{ display: 'flex' }}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {loading && (searchTerm || currentPage > 1) && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}

            {searchTerm && movies.length > 0 && currentPage < totalPages && !loading && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button variant="contained" onClick={loadMoreResults}>
                        Load More
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default HomePage;