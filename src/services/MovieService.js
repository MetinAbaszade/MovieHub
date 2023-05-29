import { get } from './requestservice'


export async function GetMovieCast(movieid) {
    let result = await get(`https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`);
    return result;
}

export async function GetMovieDetails(movieid) {
    let result = await get(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`);
    return result;
}

export async function GetMovieExternalLinks(movieid) {
    let result = await get(`https://api.themoviedb.org/3/movie/${movieid}/external_ids`);
    return result;
}

export async function GetMovieVideos(movieid) {
    let result = await get(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`);
    return result;
}

export async function GetMovieTags(movieid) {
    let result = await get(`https://api.themoviedb.org/3/movie/${movieid}/keywords`);
    return result;
}

export async function GetMovies(category, page, filter = null) {
    let url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
    if (filter) {
        url = AddFilterstoUrl(url, filter)
    }
    let result = await get(url);
    return result;
}

export async function GetSimilarMovies(movieid, page) {
    let result = await get(`https://api.themoviedb.org/3/movie/${movieid}/similar?language=en-US&page=${page}`);
    return result;
}

export async function GetMovieGenres() {
    let result = await get(`https://api.themoviedb.org/3/genre/movie/list?language=en`);
    return result;
}

export async function SearchMovies(querry, page, filter = null) {
    let url = `https://api.themoviedb.org/3/search/movie?query=${querry}&language=en-US&page=${page}`;
    if (filter) {
        url = AddFilterstoUrl(url, filter)
    }
    let result = await get(url);
    return result;
}

export function AddFilterstoUrl(url, filter) {
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



