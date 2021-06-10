import React, { Component, useRef } from 'react';

// ref 的基础语法
class RefClass extends Component {
  constructor(props) {
    super(props);
    this.refClass = React.createRef();
  }

  componentDidMount() {
    console.log('refClass', this.refClass);
  }

  render() {
    return (
      <div ref={this.refClass} id="refClass">
        refClass <pre> this.refClass = React.createRef();</pre>
      </div>
    );
  }
}

const RefFunc = () => {
  const refFunc = useRef();

  setTimeout(() => {
    console.log('RefFunc', refFunc);
  }, 100);

  return (
    <div ref={refFunc} id="refFunc">
      refFunc <pre> const refFunc = useRef();</pre>
    </div>
  );
};

// 几种传递 ref的方式
const RenameRef = (props) => {
  console.log('特殊属性：key,ref 无法传递', props);
  return (
    <div ref={props.forwardRef} id="RenameRef">
      RenameRef 特殊属性：key,ref 无法传递 \n 通过 重命名 props.forwardRef 传递 \n
      <pre>ref={`{`}props.forwardRef}</pre>
    </div>
  );
};

// RenameRef 更简洁一些
const CallbackRef = (props) => {
  console.log('特殊属性：key,ref 无法传递', props);
  return (
    <div ref={props.callbackRef} id="CallbackRef">
      RenameRef 特殊属性：key,ref 无法传递 \n 通过 回调函数 传递 \n callbackRef={`{`}(el) => (refCallback = el)}
    </div>
  );
};

const ForwardRef = React.forwardRef((props, ref) => {
  console.log('React.forwardRef 传递ref ', ref, props);
  return (
    <div ref={ref} id="ForwardRef">
      ForwardRef 特殊属性：key,ref 无法传递 \n 通过 React.forwardRef() 传递 \n
      <pre>React.forwardRef((props, ref) => {`{`}})</pre>
    </div>
  );
});

class Child extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div id="refWrappedComponent" ref={this.props.forwardRef}>
        refWrappedComponent 封装通用的 forwardRef 高阶函数
      </div>
    );
  }
}

function refWrappedComponent(Component) {
  console.log(Component);
  return React.forwardRef((props, ref) => {
    return <Component forwardRef={ref} {...props} />;
  });
}

const RefWrappedComponent = refWrappedComponent(Child);

const Parent = ({}) => {
  const renameRef = useRef();
  let refCallback = null;
  const forwardRef = useRef();
  const refWrapped = useRef();

  setTimeout(() => {
    console.log(renameRef, refCallback, forwardRef, refWrapped);
  }, 2000);
  return (
    <div>
      <RefClass></RefClass>
      <RefFunc></RefFunc>
      <RenameRef forwardRef={renameRef} props={'renameRef'} />
      <CallbackRef callbackRef={(el) => (refCallback = el)} props={'callback'} />
      <ForwardRef ref={forwardRef} props={'ForwardRef'} />
      <RefWrappedComponent ref={refWrapped} props={'refWrapped'} />
    </div>
  );
};

export default () => <Parent />;
