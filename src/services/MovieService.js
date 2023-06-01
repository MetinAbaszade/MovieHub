    import { get } from './requestservice'

    const BASE_URL = 'https://api.themoviedb.org/3/movie';

    export async function getMovies(category, page, filter = null) {
        try {
            let url = `${BASE_URL}/${category}?language=en-US&page=${page}`;
            if (filter) {
                url = addFiltersToUrl(url, filter)
            }
            const result = await get(url); 
            return result;
        } catch (error) {
            console.error(`Error getting movies with category ${category} and page ${page}: `, error);
            throw error;
        }
    }

    export async function getMovieDetails(movieId) {
        try {
            const result = await get(`${BASE_URL}/${movieId}?language=en-US`);
            return result;
        } catch (error) {
            console.error(`Error getting details of movie with id ${movieId}: `, error);
            throw error;
        }
    }

    export async function getMovieCast(movieId) {
        try {
            const result = await get(`${BASE_URL}/${movieId}/credits?language=en-US`);
            return result;
        } catch (error) {
            console.error(`Error getting cast of movie with id ${movieId}: `, error);
            throw error;
        }
    }

    export async function getMovieTags(movieId) {
        try {
            const result = await get(`${BASE_URL}/${movieId}/keywords`);
            return result;
        } catch (error) {
            console.error(`Error getting tags of movie with id ${movieId}: `, error);
            throw error;
        }
    }

    export async function getMovieGenres() {
        try {
            const result = await get(`https://api.themoviedb.org/3/genre/movie/list?language=en`);
            return result;
        } catch (error) {
            console.error('Error getting movie genres: ', error);
            throw error;
        }
    }

    export async function getMovieVideos(movieId) {
        try {
            const result = await get(`${BASE_URL}/${movieId}/videos?language=en-US`);
            return result;
        } catch (error) {
            console.error(`Error getting videos of movie with id ${movieId}: `, error);
            throw error;
        }
    }

    export async function getMovieExternalLinks(movieId) {
        try {
            const result = await get(`${BASE_URL}/${movieId}/external_ids`);
            return result;
        } catch (error) {
            console.error(`Error getting external links of movie with id ${movieId}: `, error);
            throw error;
        }
    }

    export async function getSimilarMovies(movieId, page) {
        try {
            const result = await get(`${BASE_URL}/${movieId}/similar?language=en-US&page=${page}`);
            return result;
        } catch (error) {
            console.error(`Error getting similar movies of movie with id ${movieId}: `, error);
            throw error;
        }
    }

    export async function searchMovies(query, page, filter = null) {
        try {
            let url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`;
            if (filter) {
                url = addFiltersToUrl(url, filter)
            }
            let result = await get(url);
            if (filter?.rating) {
                result.results = result.results.filter((movie) => movie.vote_average >= filter.rating)
            } 
            return result;
        } catch (error) {
            console.error(`Error searching movies with query ${query} and page ${page}: `, error);
            throw error;
        }
    }

    export function addFiltersToUrl(url, filter) {
        let filteredUrl = url; 
        if (filter.rating) {
            filteredUrl += `&vote_average.gte=${filter.rating}`
        }
        if (filter.genre) {
            filteredUrl += `&with_genres=${filter.genre}`
        }
        if (filter.runtime) {
            filteredUrl += `&with_runtime.gte=${filter.runtime}`
        }
        if (filter.year) {
            filteredUrl += `&primary_release_year=${filter.year}`
        }
        return filteredUrl;
    }
