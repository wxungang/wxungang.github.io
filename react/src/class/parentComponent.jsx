import React, { Component } from 'react';
import ChildComponent from './childComponent';

const displayName = 'parentComponent';

class parentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      obj: {
        a: 1
      },
      arr: [1]
    };
  }

  static displayName = displayName;

  componentDidMount() {
    console.log(`componentDidMount====> ${displayName} `);
    setTimeout(() => {
      this.updateState();
    }, 3000);
  }

  updateState = () => {
    this.setState((preState) => ({
      number: preState.number + 1,
      obj: {
        ...preState.obj,
        b: 2
      },
      arr: preState.arr.concat(3)
    }));
  };

  render() {
    console.log(`render======>${displayName}`, JSON.stringify(this.props), JSON.stringify(this.state));
    return (
      <div>
        <ChildComponent number={this.state.number} obj={this.state.obj} arr={this.state.arr} />
      </div>
    );
  }
}

export default parentComponent;
