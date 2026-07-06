// TODO: useCounter import
import useCounter from "../hooks/useCounter";

// TODO: Counter 컴포넌트
const Counter = () => {
  //   - useCounter() 호출해서 count / increase / decrease / reset 꺼내기

  //   useCounter()   // Counter가 훅한테 "값 줄게" 하는 자리 (근데 빈손!)
  //       ↓ 빈손으로 부름
  // function useCounter(initial = 0)   // 받을 게 없네? → 기본값 0으로 채움
  const { count, OnIncrease, OnDecrease, OnReset } = useCounter(100);
  //   - return JSX: 숫자 하나 + 버튼 3개
  return (
    <div>
      <h3>나만의 카운터 앱 만들기</h3>
      <p>{count}</p>
      <div>
        <button onClick={OnDecrease}>-1</button>
        <button onClick={OnReset}>초기화</button>
        <button onClick={OnIncrease}>+1</button>
      </div>
    </div>
  );
};
export default Counter;
