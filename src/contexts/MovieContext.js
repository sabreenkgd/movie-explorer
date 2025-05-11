import React, { createContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('favoriteMovies');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.find(fav => fav.id === movie.id);
            if (isFavorite) {
                return prevFavorites.filter(fav => fav.id !== movie.id);
            } else {
                // Store minimal data or full movie object. For simplicity, let's store enough for a card.
                const favoriteMovieData = { 
                    id: movie.id, 
                    title: movie.title, 
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average
                };
                return [...prevFavorites, favoriteMovieData];
            }
        });
    };

    return (
        <MovieContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;