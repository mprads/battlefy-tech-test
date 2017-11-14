import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar.jsx';
import MatchList from './MatchList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: {},
    };
    this.searchSummoner = this.searchSummoner.bind(this);
  }

  getSummonerId(summoner) {
    return axios.get(`http://localhost:8080/api/summoner?summoner=${summoner}`);
  }

  searchSummoner(summonerName) {
    this.getSummonerId(summonerName).then((result) => {
      console.log(result);
    });
  }

  render() {
    return (
      <div>
       <SearchBar 
        searchSummoner={this.searchSummoner}
       />
       <MatchList />
      </div>
    );
  }
}

export default App;
