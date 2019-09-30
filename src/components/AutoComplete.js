import React, { Component } from 'react';

export class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDisplayed: 5,
      searchTerm: '',
      data: []
    };
  }

  componentDidUpdate() {
    this.setState({ searchTerm: this.props.searchTerm });
    console.log(this.state.searchTerm);
    if (this.props.remote !== undefined) {
      if (this.props.remote.url === undefined) {
        throw new Error('No URL provided but remote was specified.');
      }
      this.setState({ remote: this.props.remote });
      console.log(this.props.remote);
      this.fetchData(this.props.remote.url);
    }
    if (this.props.filter !== undefined) {
      this.setState({ filter: this.props.filter });
    }
  }

  async fetchData(url) {
    if (this.state.searchTerm !== null && this.state.searchTerm.length > 3) {
      const updatedURL = url.replace('%QUERY', this.state.searchTerm);
      const res = await fetch(updatedURL);
      if (!res.ok) {
        console.log('Issue came up while fetching Suggestion data.');
      }
      let data = await res.json();
      if (this.state.filter !== undefined) {
        data = this.state.filter(data);
      }
      // console.log(data);
      this.setState({ data: data });
    }
  }

  render() {
    // this.update();

    let suggestions = null;
    if (this.props.data !== undefined) {
      console.log('No data?');
      suggestions = this.props.data.map((data, index) => {
        if (index < this.state.maxDisplayed) {
          return <li key={data.id}>{data.value}</li>;
        } else {
          return null;
        }
      });
    }

    return <ul className="autocomplete-list">{suggestions}</ul>;
  }
}

export default AutoComplete;
