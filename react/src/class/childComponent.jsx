import React, { Component } from 'react';

const displayName = 'childComponent';

class childComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static displayName = displayName;

  componentDidMount() {
    console.log(`componentDidMount====> ${displayName} `);
  }

  render() {
    console.log(`render======>${displayName}`, JSON.stringify(this.props), JSON.stringify(this.state));
    return (
      <div>
        <p>props: {JSON.stringify(this.props)}</p>
      </div>
    );
  }
}

export default childComponent;
