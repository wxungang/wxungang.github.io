import React, { Component } from 'react';

import UseStateHooks from './useState';

const displayName = 'reactHooks';

class reactHooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hooksShow: true,
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
        <button onClick={() => this.setState((preState) => ({ hooksShow: !preState.hooksShow }))}>
          toggle useState demo
        </button>
        {this.state.hooksShow && (
          <UseStateHooks number={this.state.hooks.number} obj={this.state.hooks.obj} arr={this.state.hooks.arr} />
        )}
      </div>
    );
  }
}

export default reactHooks;
