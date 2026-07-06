// TODO: useState import
import { useState } from "react";

// TODO: useCounter 함수 만들기 (매개변수: 시작값, 기본값 0)

//   - return: 화면에서 쓸 것들 묶어서 내보내기 ← 배열? 객체? 고민해보기!

function useCounter(initial = 0) {
  //   - count state (초기값 = 받은 시작값)
  const [count, setCount] = useState(initial);

  //   - increase 함수 (count + 1)
  const OnIncrease = () => {
    setCount(count + 1);
  };
  //   - decrease 함수 (count - 1)
  const OnDecrease = () => {
    setCount(count - 1);
  };

  //   - reset 함수 (시작값으로)
  const OnReset = () => {
    setCount(initial);
  };

  return { count, OnIncrease, OnDecrease, OnReset };
}
export default useCounter;

// TODO: export default
