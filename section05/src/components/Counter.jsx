import { useState } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}

        // 여기서 카운트 버튼을 누르면 위의 작성한 Bulb 컴포넌트안 console.log(light) 가 계속 찍힘
        // 이상함 현재 행동은 cosnt [count ,setCount] 의 state 값을 바꾼건데 light의 state 값이 같이 변경됨
        // 부모 APP 컴포넌트의 자식인 COunt 컴포넌트가 리렌더링 되니까  벌브도 같이 리렌더링된다 ..>?
      >
        ✚
      </button>
    </div>
  );
};
export default Counter;
