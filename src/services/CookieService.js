import Cookies from 'js-cookie';

export function getCookieData(cookieName) {
    try {
        const cookieValue = Cookies.get(cookieName);
        return cookieValue ? JSON.parse(cookieValue) : null;
    } catch (error) {
        console.error(`Failed to get or parse cookie: ${error}`);
        return null;
    }
}

export function setCookieData(cName, data) {
    Cookies.set(cName, JSON.stringify(data), { expires: 7 });
}

export function addMovieToSavedList(movieId) {
    const cookieData = getCookieData('savedMovies');
    let savedMovieIdsArray = cookieData || [];

    if (!savedMovieIdsArray.includes(movieId)) {
        savedMovieIdsArray.push(movieId);
    }

    return savedMovieIdsArray;
}

export function removeMovieFromSavedList(movieId) {
    const cookieData = getCookieData('savedMovies');
    let savedMovieIdsArray = cookieData || [];

    if (savedMovieIdsArray.includes(movieId)) {
        let index = savedMovieIdsArray.indexOf(movieId);
        savedMovieIdsArray.splice(index, 1);
    }

    return savedMovieIdsArray;
}

export function toggleSaveMovie(movieId) {
    let savedMovieIdsArray = getCookieData('savedMovies') || [];

    if (savedMovieIdsArray.includes(movieId)) {
        savedMovieIdsArray = removeMovieFromSavedList(movieId);
    } else {
        savedMovieIdsArray = addMovieToSavedList(movieId);
    }

    setCookieData("savedMovies", savedMovieIdsArray);
    return savedMovieIdsArray.includes(movieId);
}