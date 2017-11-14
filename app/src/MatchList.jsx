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
