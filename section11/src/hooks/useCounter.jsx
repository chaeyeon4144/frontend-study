import { useState } from "react";

function useCounter(initial = 0) {
  // 현재 카운트값
  const [count, setCount] = useState(initial);

  // 핸들러
  // increase
  const OnIncrease = (number) => {
    setCount(count + number);
  };

  // reset
  const OnReset = () => {
    setCount(initial);
  };
  // decrease
  const onDecrease = (number) => {
    setCount(count - number);
  };

  return { count, OnIncrease, OnReset, onDecrease };
}
export default useCounter;
