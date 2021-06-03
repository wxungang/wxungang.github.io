import React, { Component } from 'react';
import UseStateHooks from './hooks/useState';
class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hooksShow: true,
      hooks: {
        number: 1,
        obj: {
          a: 1
        },
        arr: [1]
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateState();
    }, 3000);
  }

  updateState = () => {
    this.setState((preState) => ({
      hooks: {
        ...preState.hooks,
        number: preState.hooks.number + 1,
        obj: {
          ...preState.hooks.obj,
          b: 2
        },
        arr: preState.hooks.arr.concat(3)
      }
    }));
  };

  render() {
    return (
      <div className="App" style={{ margin: '20px 5px' }}>
        <div>
          <button onClick={() => this.setState({ hooksShow: !this.state.hooksShow })}>toggle useState demo</button>
          {this.state.hooksShow && (
            <UseStateHooks number={this.state.hooks.number} obj={this.state.hooks.obj} arr={this.state.hooks.arr} />
          )}
        </div>
      </div>
    );
  }
}

export default app;
