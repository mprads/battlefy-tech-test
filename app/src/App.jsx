import React, { Component } from 'react';

import SearchBar from './SearchBar.jsx';
import MatchList from './MatchList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
       <SearchBar />
       <MatchList />
      </div>
    );
  }
}

export default App;
