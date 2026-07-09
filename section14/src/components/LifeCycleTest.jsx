// 리렌더 +  일으킬 count
import { useState, useEffect, useRef } from "react";

const LifeCycle = () => {
  const [count, setCount] = useState(0);

  const onCount = () => {
    setCount(count + 1);
  };

  // TODO 1: deps 생략 → 언제 뜰까?
  useEffect(() => {
    console.log("A: 생략");
  }); // ← 두 번째 인수 없음

  // TODO 2: 빈 배열 → 언제 뜰까?
  useEffect(() => {
    console.log("B: []");
  }, []); // ← 빈 배열

  // TODO 3: count 감시
useEffect(() => {
  console.log("C: [count]");
}, [count]);

useEffect(() => {
  console.log("C: 실행", count);
  return () => {
    console.log("C: 정리", count);   // ← cleanup
  };
}, [count]);

  return (
    <div>
      <h3>count : {count}</h3>
      <button onClick={onCount}>+1</button>
    </div>
  );
};
export default LifeCycle;
