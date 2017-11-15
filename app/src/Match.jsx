import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: {},
      spell1: {},
      spell2: {},
      item0: {},
      item1: {},
      item2: {},
      item3: {},
      item4: {},
      item5: {},
      item6: {},
    };
  }

  getChampion(championId) {
    return axios.get(`http://localhost:8080/api/champion?championId=${championId}`);
  }

  getItem(itemId) {
    return axios.get(`http://localhost:8080/api/item?itemId=${itemId}`);
  }

  getSpell(spellId) {
    return axios.get(`http://localhost:8080/api/item?spellId=${spellId}`);
  }

  // commenting out spells and champions because when they are in the componentDidMount they
  // exceed the rate limit
  componentDidMount() {
    // this.getChampion(this.props.championId).then((championData) => {
    //   const champion = JSON.parse(championData.data);
    //   this.setState({ champion });
    // });
    // this.getSpell(this.props.spell1Id).then((spellData) => {
    //   const spell = JSON.parse(spellData.data);
    //   this.setState({ spell1 });
    // });
    // this.getSpell(this.props.spell2Id).then((spellData) => {
    //   const spell = JSON.parse(spellData.data);
    //   this.setState({ spell2 });
    // });
    
  }

  render() {
    function victoryOrDefat(win) {
      return win ? 'victory' : 'defeat';
    }

    function kd(kills, deaths) {
      const k = parseInt(kills);
      const d = parseInt(deaths);
      return k / d ? Math.round((k / d) * 100) / 100 : 0;
    }

    function gameDuration(time) {
      const duration = moment.duration(time, 'seconds');
      const seconds = duration._data.seconds >= 10 ? duration._data.seconds : `0${duration._data.seconds}`;
      return `${duration._data.minutes}:${seconds}`;
    }
    function creepPerMinute(cs, time) {
      const duration = moment.duration(time, 'seconds');
      return cs / duration._data.minutes ? Math.round((cs / duration._data.minutes) * 100) / 100 : 0;

    }
    return (
      <div className={`box ${victoryOrDefat(this.props.win)}`}>
        <div>
          {victoryOrDefat(this.props.win)}
        </div>
        <div>
          {gameDuration(this.props.duration)}
        </div>
        <div>
          {this.state.champion.name}
        </div>
        <div>
          {this.state.spell1.name} {this.state.spell2.name}
        </div>
        <div>
          {this.props.kills}/{this.props.deaths}/{this.props.assists}  {kd(this.props.kills, this.props.deaths)} KDA
        </div>
        <div>
          lvl {this.props.championLevel}
        </div>
        <div>
          {this.props.creepScore} ({creepPerMinute(this.props.creepScore, this.props.duration)})CS
        </div>
      </div>
    );
  }
}

export default Match;
