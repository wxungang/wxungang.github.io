import React, { Component } from 'react';

import ReactClass from './class/reactClass';
import ReactHooks from './hooks/reactHooks';

const displayName = 'app';

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactClass: true,
      reactHooks: false
    };
  }

  static displayName = displayName;

  componentDidMount() {
    console.log(`componentDidMount====> ${displayName} `);
  }

  render() {
    console.log(`render======>${displayName}`, JSON.stringify(this.props), JSON.stringify(this.state));
    return (
      <div className="App" style={{ margin: '20px 5px' }}>
        {this.state.reactClass && <ReactClass />}
        {this.state.reactHooks && <ReactHooks />}
      </div>
    );
  }
}

export default app;
