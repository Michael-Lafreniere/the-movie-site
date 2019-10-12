# The Movie Site

[![License](https://img.shields.io/badge/license-Apache2-blue.svg?style=flat-square)](https://github.com/Michael-Lafreniere/the-movie-site/blob/master/LICENCE)
[![GitHub stars](https://img.shields.io/github/stars/Michael-Lafreniere/the-movie-site?style=flat-square)](https://github.com/Michael-Lafreniere/the-movie-site/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Michael-Lafreniere/the-movie-site.svg?style=flat-square)](https://github.com/Michael-Lafreniere/the-movie-site/network)

The Movie Site is a ReactJS Demostration site I made for my portfolio. It uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to get movie details, cast/crew information, reviews and the movie trailer (if one exists).

![gif of the movie site](https://github.com/Michael-Lafreniere/the-movie-site/blob/master/docs/the-movie-site.gif)

## Installation/Usage

[node.js](http://nodejs.org/download/) is required to get `npm`. Use the package manager [npm](https://pip.pypa.io/en/stable/) to install/run the-movie-site.

1. Clone the repo: `git@github.com:Michael-Lafreniere/the-movie-site.git`
2. `cd the-movie-site`
3. Install packages: `npm install`
4. Create a `.env` file and put `REACT_APP_TMDB_V3_API_KEY = YOUR_KEY_HERE` in it.
   > - **To get your key** [Sign Up Here](https://www.themoviedb.org/account/signup)
5. Run it: `npm run start`

## Tools

|                                       Tool                                        | Description                                                    |
| :-------------------------------------------------------------------------------: | -------------------------------------------------------------- |
|                [React](http://facebook.github.io/react/index.html)                | A JavaScript library used for making website user interfaces   |
|  [react-spinner-material](https://www.npmjs.com/package/react-spinner-material)   | A simple react spinner following Material UI's using only css. |
| [react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) | Font Awesome 5 React component using SVG with JS               |

## To Do

- [x] ~~Move AutoComplete to it's own component (currently in `/Components/Header.js`)~~
- [x] ~~Fix a couple css bugs/issues~~
  > - [x] ~~Refactored css into individual files~~
- [x] ~~Detect if no trailer exist and do not display the link~~
- [x] ~~Add a drop down on the left side of the `Header.js` to select between popular (current), just released, etc~~
- [x] ~~When you click on a movie quote it should bring up the detailed movie information~~
- [ ] Detect when data hasn't finished loading from [TMDb](https://www.themoviedb.org) and delay rendering component(s)
- [x] ~~Detect when text is pasted into `Header.js` and conduct a search for possible matches~~

## Author

[**Michael Lafreniere**](https://github.com/Michael-Lafreniere)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache2](https://choosealicense.com/licenses/apache-2.0/)
