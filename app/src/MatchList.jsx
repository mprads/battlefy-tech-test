import React, { Component } from 'react';
import axios from 'axios';

import Match from './Match.jsx'

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

 

  render() {
    return (
      <div>
        start of match list
        <Match />
        end of match list
      </div>
    );
  }
}

export default MatchList;
