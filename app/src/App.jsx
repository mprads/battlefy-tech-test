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

  getMatchDetails(gameId) {
    return axios.get(`http://localhost:8080/api/matchDetails?gameId=${gameId}`);
  }

  searchSummoner(summonerName) {
    this.getSummonerId(summonerName).then((result) => {
      const summonerData = JSON.parse(result.data);
      this.setState({ summoner: summonerData });
      this.getRecentMatches(summonerData.accountId).then((recentMatches) => {
        const matchesArray = JSON.parse(recentMatches.data);
        const matchesPromise = matchesArray.matches.map((match) => {
          return new Promise((resolve) => {
            resolve(
              this.getMatchDetails(match.gameId).then((matchDetails) => {
                const details = JSON.parse(matchDetails.data);
                return details;
              }),
            );
          });
        });
        Promise.all(matchesPromise).then((matches) => {
          const filteredMatches = this.filterGames(matches);
          this.setState({ matches: filteredMatches });
        });
      });
    });
  }

  filterGames(matchesArray) {
    const filteredArray = [];
    matchesArray.forEach((match) => {
      let participantId;
      match.participantIdentities.forEach((participant) => {
        if (participant.player.accountId === this.state.summoner.accountId) {
          participantId = participant.participantId;
        }
      });
      const filteredMatchObj = {
        gameDuration: match.gameDuration,
        gameId: match.gameId,
        mapId: match.mapId,
        data: match.participants[participantId - 1],
      };
      filteredArray.push(filteredMatchObj);
    });
    return filteredArray;
  }

  render() {
    return (
      <div>
        <SearchBar
          searchSummoner={this.searchSummoner}
        />
        <MatchList
          summoner={this.state.summoner}
          matches={this.state.matches}
        />
      </div>
    );
  }
}

export default App;
