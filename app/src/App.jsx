import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar.jsx';
import MatchList from './MatchList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: {},
      matches: [],
    };
    this.searchSummoner = this.searchSummoner.bind(this);
  }

  getSummonerId(summoner) {
    return axios.get(`http://localhost:8080/api/summoner?summoner=${summoner}`);
  }

  getRecentMatches(accountId) {
    return axios.get(`http://localhost:8080/api/matches?accountId=${accountId}`);
  }

  searchSummoner(summonerName) {
    this.getSummonerId(summonerName).then((result) => {
      const summonerData = JSON.parse(result.data);
      this.setState({ summoner: summonerData });
      this.getRecentMatches(summonerData.accountId).then((recentMatches) => {
        const matchesObj = JSON.parse(recentMatches.data);
        this.setState({ matches: matchesObj.matches });
      });
    });
  }

  render() {
    return (
      <div>
       <SearchBar 
        searchSummoner={this.searchSummoner}
       />
       <MatchList 
        matches={this.state.matches}
       />
      </div>
    );
  }
}

export default App;
