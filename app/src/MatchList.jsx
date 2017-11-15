import React, { Component } from 'react';
import axios from 'axios';

import Match from './Match.jsx'

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let output;
    if (this.props.matches.length !== 0) {
      output = this.props.matches.map((match) => {
        return <Match
          key={match.gameId}
          duration={match.gameDuration}
          mapId={match.mapId}
          championId={match.data.championId}
          championLevel={match.data.stats.champLevel}
          assists={match.data.stats.assists}
          kills={match.data.stats.kills}
          deaths={match.data.stats.deaths}
          spell1Id={match.data.spell1Id}
          spell2Id={match.data.spell2Id}
          item0={match.data.stats.item0}
          item1={match.data.stats.item1}
          item2={match.data.stats.item2}
          item3={match.data.stats.item3}
          item4={match.data.stats.item4}
          item5={match.data.stats.item5}
          item6={match.data.stats.item6}
          win={match.data.stats.win}
          creepScore={match.data.stats.totalMinionsKilled}
        />;
      });
    } else {
      output = (
        <div>
          No Result
        </div>
      );
    }
    return (
      <div>
        {output}
      </div>
    );
  }
}

export default MatchList;
