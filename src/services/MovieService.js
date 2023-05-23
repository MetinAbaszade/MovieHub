import { get } from './requestservice'



export async function GetPopularMovies(page) { 
    try {
        var result = await get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`);
        console.log(result) 
        return result;
    }
    catch {
        console.log("Ala Error")
    }
}

export async function GetMovieCast(movieid) {
    var result = await get(`https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`);
    return result;
}   

export async function GetMovieDetails(movieid) {
    var result = await get(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`);
    return result;
}

export async function GetTopRatedMovies(page) {
    var result = await get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`);
    return result;
}

export async function GetNowPlayingMovies(page) {
    var result = await get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`);
    return result;
}

export async function GetUpcomingMovies(page) {
    var result = await get(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`);
    return result;
}

export async function GetSimilarMovies(movieid, page) {
    var result = await get(`https://api.themoviedb.org/3/movie/${movieid}/similar?language=en-US&page=${page}`);
    return result;
}

export async function GetMovieGenres() {
    var result = await get(`https://api.themoviedb.org/3/genre/movie/list?language=en`);
    return result;
}

export async function SearchMovies(querry, page) {
    var result = await get(`https://api.themoviedb.org/3/search/movie?query=${querry}&include_adult=false&language=en-US&page=${page}`);
    return result;
}

export async function FilterMovies(rating) {
    let url = `https://api.themoviedb.org/3/discover/movie?page=1&vote_average.gte=${rating}`
    var result = await get(url);
    console.log(result.results)
    return result;
}



