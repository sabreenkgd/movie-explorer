import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext({
    toggleTheme: () => {},
    mode: 'light',
});

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const storedPreference = localStorage.getItem('themeMode');
        return storedPreference || 'light'; // Default to light if no preference
    });

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    // You can customize your primary/secondary colors here
                    // primary: { main: '#1976d2' },
                    // secondary: { main: '#dc004e' },
                },
            }),
        [mode]
    );

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline /> {/* Ensures consistent baseline styling & background based on mode */}
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};