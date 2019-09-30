import React, { Component } from 'react';

export class Suggestion extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const data = this.props;
    const classname = 'autocomplete-list-item';
    if (data.highlight) {
    }

    if (this.props.id !== undefined) {
      this.setState({ id: this.props.info.id });
    }

    return (
      <li
        key={data.index}
        className={classname}
        onClick={() => data.toggle(data.info.value)}
      >
        {data.info.value}
      </li>
    );
  }
}

// export class AutoComplete extends Component {
//   constructor() {
//     super();
//     this.update = this.update.bind(this);
//     this.search = this.search.bind(this);
//     this.onFocus = this.onFocus.bind(this);
//     this.onBlur = this.onBlur.bind(this);
//     this.onClick = this.onClick.bind(this);
//     this.divRef = React.createRef();
//     this.inputRef = React.createRef();
//     this.state = {
//       maxResultsDisplayed: 5,
//       searchString: '',
//       selected: -1,
//       data: [],
//       showSuggestions: false,
//       suggestionXOffset: 0
//     };
//   }

//   onFocus() {
//     setTimeout(() => {
//       this.setState({ showSuggestions: !this.state.showSuggestions });
//     }, 500);
//     const { current } = this.divRef;
//     this.setState({
//       suggestionXOffset: current.getBoundingClientRect().x,
//       suggestionYOffset: current.getBoundingClientRect().height,
//       suggestionAreaWidth: current.getBoundingClientRect().width
//     });
//   }

//   onBlur() {
//     setTimeout(() => {
//       this.setState({ showSuggestions: !this.state.showSuggestions });
//     }, 200);
//   }

//   onClick(selected) {
//     this.setState({ searchString: selected });
//     this.inputRef.current.value = selected;
//     this.search(selected);
//   }

//   update(searchValue) {
//     if (searchValue.length > 3) {
//       this.setState({ searchString: searchValue });
//       const search = searchValue.toLowerCase();
//       const url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${process.env.REACT_APP_TMDB_V3_API_KEY}`;
//       fetch(url)
//         .then(response => {
//           return response.json();
//         })
//         .then(data => {
//           if (data.results !== undefined) {
//             let items = data.results.map(res => {
//               return { id: res.id, value: res.original_title };
//             });
//             this.setState({ data: items });
//           }
//         });
//     }
//   }

//   generateRecommendedList() {
//     if (
//       this.state.searchString !== undefined ||
//       (this.state.searchString !== '' &&
//         this.state.data !== undefined &&
//         this.state.data.length > 0)
//     ) {
//       const search = this.state.searchString.toLowerCase();
//       const matches = this.state.data.filter(s =>
//         s.value.toLowerCase().includes(search)
//       );
//       if (matches) {
//         return matches.map((data, index) => {
//           if (index < this.state.maxResultsDisplayed) {
//             return <Suggestion key={index} info={data} toggle={this.onClick} />;
//           } else {
//             return null;
//           }
//         });
//       }
//     }
//     return null;
//   }

//   search(searchTerm) {
//     if (this.state.data !== undefined) {
//       const search = searchTerm.toLowerCase();
//       const found = this.state.data.filter(data => {
//         return data.value.toLowerCase() === search;
//       });
//       if (found) {
//         // this.setState({ searchString: '', data: [] });
//         // this.inputRef.current.value = '';
//         this.props.movieSearch(found[0].id);
//       }
//     }
//   }

//   render() {
//     const ulStyle = {
//       position: 'absolute',
//       top: `${this.state.suggestionYOffset - 7}px`,
//       left: `${this.state.suggestionXOffset + 35}px`,
//       zIndex: '3000',
//       width: `${this.state.suggestionAreaWidth - 65}px`,
//       backgroundColor: 'transparent'
//     };

//     let suggestions = null;
//     if (this.state.showSuggestions === true && this.state.data.length > 0) {
//       suggestions = <ul style={ulStyle}>{this.generateRecommendedList()};</ul>;
//     }

//     return (
//       <div className="search-input" ref={this.divRef}>
//         {/* <input
//           type="text"
//           ref={this.inputRef}
//           placeholder="Search..."
//           autoComplete="on"
//           list="movie-suggestions"
//           onFocus={this.onFocus}
//           onBlur={this.onBlur}
//           onKeyPress={e => {
//             e.key === 'Enter'
//               ? this.search(e.target.value)
//               : this.update(e.target.value);
//           }}
//         ></input> */}
//         {suggestions}
//       </div>
//     );
//   }
// }

export default Suggestion;
