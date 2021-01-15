'use strict';

const createElement = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return createElement(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
console.log(
  LikeButton,
  createElement(LikeButton),
  createElement('button', { onClick: () => {} }, 'Like')
);
const domContainer = document.querySelector('#class_button_container');
ReactDOM.render(createElement(LikeButton), domContainer);


function reactButton() {
  const [liked, updateLiked] = React.useState(false);

  if (liked) {
    return 'You liked this.';
  }

  return createElement('button', { onClick: () => updateLiked(true) }, 'Like');
}

ReactDOM.render(
  createElement(LikeButton),
  document.getElementById('function_button_container')
);
