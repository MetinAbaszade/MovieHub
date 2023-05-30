import { configureStore } from '@reduxjs/toolkit';
import savedMoviesSlice from './savedMoviesSlice';

export default configureStore({
    reducer: {
        savedMovies: savedMoviesSlice
    },
});