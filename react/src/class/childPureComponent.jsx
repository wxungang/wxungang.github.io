import React, { PureComponent } from 'react';

const displayName = 'childPureComponent';

class childPureComponent extends PureComponent {
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
