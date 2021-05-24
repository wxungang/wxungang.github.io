import React, { useState } from 'react';

const useStateHooks = () => {
  const [count, setCount] = useState(0);

  const update = () => {
    console.log(count);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={update}>Click me {count}</button>;
};

export default useStateHooks;
