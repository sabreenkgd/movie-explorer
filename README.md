# Movie Explorer – Discover my Favorite Films

## Project Story

I've got an internship at a startup, and my task is to create a Movie Explorer App. This web application will allow users to search for movies, view details, and discover trending films. The app will fetch real-time data from the TMDb (The Movie Database) API to display information about movies.

## Features Implemented

This application allows users to explore a vast database of movies with the following features:

*   **User Authentication:**
    *   User Login interface (simulated using local storage for persistence without a backend).
    *   Basic logout functionality.
*   **Movie Discovery:**
    *   Displays a section for "Trending Movies" on the homepage, fetched directly from the TMDb API.
    *   A search bar allowing users to type a movie name and get relevant real-time search results.
*   **Movie Information Display:**
    *   Search results and trending movies are displayed in a responsive grid of movie posters.
    *   Each movie card shows the movie's title, release year, and TMDb rating.
    *   Clicking on any movie card navigates to a detailed view.
*   **Detailed Movie View:**
    *   Comprehensive information including the movie's overview, genres, and primary cast members.
    *   A direct link to watch the movie's trailer on YouTube (if available via TMDb).
*   **User Experience & Personalization:**
    *   Light/Dark mode toggle for enhanced user comfort, with preference saved in local storage.
    *   "Load More" button for paginating through movie search results, offering a user-friendly alternative to infinite scroll.
    *   The user's last searched movie term is saved in local storage for quick recall.
    *   Users can save their favorite movies to a persistent list, also stored in local storage.
    *   A dedicated "Favorites" page to view all saved movies.
*   **API Integration & Error Handling:**
    *   Seamless integration with The Movie Database (TMDb) API (v3) for all movie data.
    *   Graceful handling of API errors with user-friendly messages displayed in the UI.

## Technical Stack

*   **Frontend:** React (with Create React App)
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios (for API requests)
*   **UI Components & Styling:** Material-UI (MUI)
*   **State Management:** React Context API (for theme, authentication, and favorites)
*   **API:** The Movie Database (TMDb) API v3

## Project Setup

To set up and run this project locally, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sabreenkgd/LoonsTask
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd movie-explorer
    ```
3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
4.  **Set up Environment Variables:**
    *   Create a `.env` file in the root of the project directory (e.g., `movie-explorer/.env`).


5.  **Start the development server:**
    Using npm:
    ```bash
    npm start
    ```
    Or using yarn:
    ```bash
    yarn start
    ```
    The application will typically open in your browser at `http://localhost:3000`.

## API Usage

This application utilizes **The Movie Database (TMDb) API (Version 3)**.
*   An API key is required for fetching data. Please refer to the "Project Setup" section for instructions on how to configure it.
*   Key TMDb API endpoints used:
    *   `/trending/movie/{time_window}` for trending movies.
    *   `/search/movie` for movie search results.
    *   `/movie/{movie_id}` for detailed movie information.
    *   `/movie/{movie_id}/credits` for cast information.
    *   `/movie/{movie_id}/videos` for trailer information.

## Code Structure

The `src` folder is organized as follows:

*   `src/components/`: Contains reusable UI components (e.g., `MovieCard.js`, `Navbar.js`, `SearchBar.js`).
*   `src/pages/`: Contains top-level page components corresponding to routes (e.g., `HomePage.js`, `MovieDetailsPage.js`, `LoginPage.js`).
*   `src/contexts/`: Manages global state using React Context API (e.g., `AuthContext.js`, `MovieContext.js`, `ThemeContext.js`).
*   `src/services/`: Handles API communication logic (e.g., `tmdbService.js`).
*   `src/App.js`: The main application component, responsible for routing and global providers.
*   `src/index.js`: The entry point of the React application.

## Live Demo

[Link to be added after deployment]
