import React, { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    // Load last search from local storage
    useEffect(() => {
        const lastSearch = localStorage.getItem('lastSearchedMovie');
        if (lastSearch) {
            setQuery(lastSearch);
            // Optionally, trigger search on load: onSearch(lastSearch);
        }
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            localStorage.setItem('lastSearchedMovie', query.trim());
        }
    };

    return (
        <form onSubmit={handleSearch} style={{ width: '100%', marginBottom: '20px' }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};

export default SearchBar;