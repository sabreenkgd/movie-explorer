import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const getTrendingMovies = async (timeWindow = 'day') => { // timeWindow can be 'day' or 'week'
    try {
        const response = await apiClient.get(`/trending/movie/${timeWindow}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error; // Re-throw to be handled by the component
    }
};

export const searchMovies = async (query, page = 1) => {
    try {
        const response = await apiClient.get('/search/movie', {
            params: { query, page },
        });
        return response.data; // Contains results and total_pages
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try {
        // Fetch details and credits (cast) in parallel
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
            apiClient.get(`/movie/${movieId}`),
            apiClient.get(`/movie/${movieId}/credits`),
            apiClient.get(`/movie/${movieId}/videos`),
        ]);

        const trailer = videosResponse.data.results.find(
            (vid) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
        );
        
        return {
            ...detailsResponse.data,
            cast: creditsResponse.data.cast.slice(0, 10), // Get top 10 cast members
            trailerKey: trailer ? trailer.key : null,
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

// Helper to get full image URL
export const getImageUrl = (path, size = 'w500') => {
    if (!path) {
        // return 'https://via.placeholder.com/500x750.png?text=No+Image'; // Old placeholder
        return 'https://placehold.co/500x750?text=No+Image'; // <<< NEW, MORE RELIABLE PLACEHOLDER
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
};