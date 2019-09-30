const TMDB_API_URL = '//api.themoviedb.org/3/';
const TMDB_CAST_CREW_URL = 'https://image.tmdb.org/t/p/w138_and_h175_face';

function generateTMDbQueryString(params = {}) {
  params = {
    api_key: process.env.REACT_APP_TMDB_V3_API_KEY,
    ...params
  };

  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
}

function generateTMDbUrl(path, params = {}) {
  const query = generateTMDbQueryString(params);

  return `${TMDB_API_URL}${path}?${query}`;
}

async function handleTMDbApiCall(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throwCommonError(res);
  }
  return data;
}

export function getTMDbMovie(movieID) {
  const url = generateTMDbUrl(`movie/${movieID}`);
  return handleTMDbApiCall(url);
}

export function searchTMDbMovies(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.REACT_APP_TMDB_V3_API_KEY}`;
  return handleTMDbApiCall(url);
}

export function getTMDbVideos(movieID) {
  const url = generateTMDbUrl(`movie/${movieID}/videos`);
  return handleTMDbApiCall(url);
}

export function getTMDbCastCrewInfo(movieID) {
  const url = generateTMDbUrl(`movie/${movieID}/credits`);
  return handleTMDbApiCall(url);
}

export function getTMDbPersonInfo(personID) {
  const url = generateTMDbUrl(`person/${personID}`);
  return handleTMDbApiCall(url);
}

export const getTMDbSocialMediaInfo = personID => {
  const url = generateTMDbUrl(`person/${personID}/external_ids`);
  return handleTMDbApiCall(url);
};

export function getTMDbPopularMovies(page = 1) {
  return generateTMDbUrl('movie/popular', { page });
}

export function getTMDbCastCrewImageURL(picture_path) {
  return handleTMDbApiCall(`${TMDB_CAST_CREW_URL}${picture_path}`);
}

export function getTMDbReviews(movieID) {
  const url = generateTMDbUrl(`movie/${movieID}/reviews`);
  return handleTMDbApiCall(url);
}

export function getTMDbMovieGenre() {
  const url = generateTMDbUrl('genre/movie/list');
  return handleTMDbApiCall(url);
}

export function throwCommonError(data) {
  if (data.errors && data.errors.length) {
    throw new Error(data.errors.join(' | '));
  }

  throw new Error(`${data.status_message} (error code: ${data.status_code})`);
}

export function formatMoney(
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
}
