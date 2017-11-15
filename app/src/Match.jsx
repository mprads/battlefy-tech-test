import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: {},
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

  componentDidMount() {
    // this.getChampion(this.props.championId).then((champion) => {
    //   console.log(champion, 'testing');
    //   const championData = JSON.parse(championData.data);
    //   this.setState({ championData });
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

    function gameDuration(duration) {
      const time = moment.duration(duration, 'seconds');
      console.log(time);
      const seconds = time._data.seconds >= 10 ? time._data.seconds : `0${time._data.seconds}`;
      return `${time._data.minutes}:${seconds}`;
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
          {this.props.kills}/{this.props.deaths}/{this.props.assists}  {kd(this.props.kills, this.props.deaths)} KDA
        </div>
        <div>
          lvl {this.props.championLevel}
        </div>
      </div>
    );
  }
}

export default Match;
