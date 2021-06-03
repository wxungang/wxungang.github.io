import React, { useState, useEffect } from 'react';

const useStateHooks = ({ number, obj, arr }) => {
  const [count, setCount] = useState(0);
  const [hookObj, setHookObj] = useState({ a: 1, b: 2 });
  // useState 只会初始化时执行，需要 useEffect 保持更新
  const [initPropNumber, setInitPropNumber] = useState(number);
  const [useEffectPropNumber, setuseEffectPropNumber] = useState(number);

  console.log(number, obj, arr, count, initPropNumber, useEffectPropNumber);

  const update = () => {
    console.log(count);
    // 更新 。不支持 callback。 需要使用 useEffect
    setCount(count + 1);
    // 函数式
    setCount((preCount) => preCount + 1);
    // 不会立即生效。
    console.log(count);
    // 覆盖,而不是合并
    setHookObj({ c: 3 });
  };
  /**
   * 1、默认每次渲染[初始化、后续更新]时都会执行
   * 2、return 的函数 每次更新渲染前 & 卸载前 都会执行
   * 3、[] 只有初始化时执行。[props.key, props.key] 具体某些值更新时才执行
   */
  useEffect(() => {
    console.log('useEffect===>每次渲染[初始化、后续更新]时都会执行');

    return () => {
      console.log('useEffect return===>每次更新渲染前 & 卸载前 都会执行');
    };
  });

  useEffect(() => {
    console.log('useEffect===> number');
    setuseEffectPropNumber(number);

    return () => {
      console.log('useEffect return===> number');
      setuseEffectPropNumber(-1);
    };
  }, [number]);

  useEffect(() => {
    console.log('useEffect===>[]');

    return () => {
      console.log('useEffect return===>[]');
    };
  }, []);

  useEffect(() => {
    console.log('setState callback==>', count);
  }, [count]);

  return (
    <div className="hooks">
      <div>useState demos</div>
      <button onClick={update}>
        click to add | count: {count} | hookObj = {JSON.stringify(hookObj)}
      </button>
      <p>
        props => number: {number} | obj: {JSON.stringify(obj)} | arr: {arr.join('-')}
      </p>
      <p>
        useState from props [useState只会初始化时执行一次，所以需要更新时必须使用 useEffect] => number: {number} |
        initPropNumber: {initPropNumber} | useEffectPropNumber: {useEffectPropNumber}
      </p>
      <p>
        props => number: {number} | obj: {JSON.stringify(obj)} | arr: {arr.join('-')}
      </p>
    </div>
  );
};

export default useStateHooks;
