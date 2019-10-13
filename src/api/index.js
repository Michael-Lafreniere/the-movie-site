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

export const fetchData = (func, result) => {
  fetch(func)
    .then(res => res.json())
    .then(data => {
      result(data);
    })
    .catch(err => {
      throwCommonError(err);
    });
};

export function getTMDbMovie(movieID) {
  return generateTMDbUrl(`movie/${movieID}`);
}

export function getTMDbVideos(movieID) {
  return generateTMDbUrl(`movie/${movieID}/videos`);
}

export function getTMDbCastCrewInfo(movieID) {
  return generateTMDbUrl(`movie/${movieID}/credits`);
}

export function getTMDbPersonInfo(personID) {
  return generateTMDbUrl(`person/${personID}`);
}

export const getTMDbSocialMediaInfo = personID => {
  return generateTMDbUrl(`person/${personID}/external_ids`);
};

export function getTMDbPopularMovies(page = 1) {
  return generateTMDbUrl('movie/popular', { page });
}

export function getTMDbLatestMovies() {
  return generateTMDbUrl('movie/latest');
}

export function getTMDbNowPlaying(page = 1) {
  return generateTMDbUrl('movie/now_playing', { page });
}

export function getTMDbTopRatedMovies(page = 1) {
  return generateTMDbUrl('movie/top_rated', { page });
}

export function getTMDbUpcomingMovies(page = 1) {
  return generateTMDbUrl('movie/upcoming', { page });
}

export function getTMDbReviews(movieID) {
  return generateTMDbUrl(`movie/${movieID}/reviews`);
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
