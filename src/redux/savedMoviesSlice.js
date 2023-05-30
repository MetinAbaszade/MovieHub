import { createSlice } from '@reduxjs/toolkit';
import { CookieService } from '../services'

let initialSavedMovies = CookieService.getCookieData('savedMovies') || [];

export const savedMoviesSlice = createSlice({
    name: 'savedMovies',
    initialState: initialSavedMovies,
    reducers: {
        toggleSaveMovie: (state, action) => {
            const movieId = action.payload;
            const index = state.indexOf(movieId);

            // If the movie id is already in the saved movies array, remove it
            if (index >= 0) {
                state.splice(index, 1);
            }
            // If it is not, add it
            else {
                state.push(movieId);
            }

            // Then update the cookie with the new state
            CookieService.setCookieData('savedMovies', state);
        },
    },
});

export const { toggleSaveMovie } = savedMoviesSlice.actions;

export default savedMoviesSlice.reducer;