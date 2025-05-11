// Path: src/components/Navbar.js
import React, { useContext } from 'react'; // Keep useContext for ThemeContext
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // Use the custom hook

const Navbar = () => {
    const { mode, toggleTheme } = useContext(ThemeContext);
    const { user, logout, isAuthenticated } = useAuth(); // Get user, logout, and isAuthenticated
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Movie Explorer {isAuthenticated && user ? `(Hi, ${user.username})` : ''}
                </Typography>

                <Button color="inherit" component={RouterLink} to="/">Home</Button>
                {isAuthenticated && <Button color="inherit" component={RouterLink} to="/favorites">Favorites</Button> }
                
                {isAuthenticated ? (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                ) : (
                    <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                )}

                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;