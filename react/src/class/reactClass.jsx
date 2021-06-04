import React, { Component } from 'react';

import ReactComponent from './parentComponent';
import ReactPureComponent from './parentPureComponent';

const displayName = 'reactClass';

class reactClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  static displayName = displayName;

  componentDidMount() {
    console.log(`componentDidMount====> ${displayName} `);
    setTimeout(() => {
      this.setState((preState) => ({
        count: preState.count + 1
      }));
    }, 3000);
  }

  render() {
    console.log(`render======>${displayName}`, JSON.stringify(this.props), JSON.stringify(this.state));
    return (
      <>
        <ReactComponent />
        <ReactPureComponent />
      </>
    );
  }
}

export default reactClass;
