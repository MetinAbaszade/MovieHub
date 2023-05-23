import React from 'react';
import { createHashRouter, RouterProvider, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/movie/:id",
        element: <MovieDetails />,
    },
]);

const AppRoutes = () => {
    return (
        <RouterProvider router={router}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
           
        </RouterProvider>
    );
}

export default AppRoutes;
