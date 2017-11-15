import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <div>
        <input className='input' type='text' value={this.state.searchValue} onChange={this.handleChange} placeholder='Summoner name' />
        <div className='button is-primary' onClick={() => {this.props.searchSummoner(this.state.searchValue)}}>
          Search
        </div>
      </div>
    );
  }
}

export default SearchBar;
