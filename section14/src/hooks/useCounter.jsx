// import { useState } from "react";

// function useCounter(initial = 0) {
//   // 현재 카운트값
//   const [count, setCount] = useState(initial);

//   // 핸들러
//   // increase
//   const OnIncrease = (number) => {
//     setCount(count + number);
//   };

//   // reset
//   const OnReset = () => {
//     setCount(initial);
//   };
//   // decrease
//   const onDecrease = (number) => {
//     setCount(count - number);
//   };

//   return { count, OnIncrease, OnReset, onDecrease };
// }
// export default useCounter;

import { useState, useEffect } from "react";

function useCounter() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(count);
  }, [`count: ${count}`]);
  // 의존성 배열
  // dependency array
  // 줄여서 deps 라고 부름
  // 그리고 이 뎁스에는 여려개의 값을 넣어도 됨

  // 이벤트 핸들런
  const onClickButton = (value) => {
    setCount(count + value);
  };

  return [count, input, setInput, onClickButton];
}
export default useCounter;
