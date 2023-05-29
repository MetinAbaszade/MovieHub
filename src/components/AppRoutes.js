import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import SavedMovies from './SavedMovies';

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/savedmovies",
        element: <SavedMovies />,
    },
    {
        path: "/movie/:id",
        element: <MovieDetails />,
    },
]);

const AppRoutes = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRoutes;
