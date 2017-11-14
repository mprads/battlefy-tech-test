import React, { Component } from 'react';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.duration}
      </div>
    );
  }
}

export default Match;
