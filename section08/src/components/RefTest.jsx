import { useState, useRef } from "react";

const RefTest = () => {
  // DOM 접근용으로 만들 reference 객체
  const inputRef = useRef();
  // 리렌더 없이 값 유지용
  const countRef = useRef(0);

  // useState 사용해서 비교용
  const [num, setNum] = useState(0);

  // 이벤트 핸들러
  const onFocus = () => {
    inputRef.current.focus();
  };

  console.log("🔁 RefTest 렌더링!");

  const onConsole = () => {
    console.log("입력값:", inputRef.current.value);
  };

  const onCount = () => {
    countRef.current++;
    console.log("countRef:", countRef.current);
  };

  const onState = () => {
    setNum(num + 1);
  };
  return (
    <>
      <div>
        <h3>① DOM 접근 (focus)</h3>
        <input type="text" placeholder="여기 포커스 될거야" ref={inputRef} />
        <button onClick={onFocus}>input에 포커스 !</button>
      </div>
      <div>
        <h3>② DOM 값 읽기</h3>
        <button onClick={onConsole}>input에 값 콘솔 찍기</button>
      </div>
      <div>
        <h3>③ useRef (리렌더 X)</h3>
        <button onClick={onCount}>
          countRef +1 (콘솔만 증가, 화면·렌더 X)
        </button>
      </div>
      <div>
        <h3>④ useState (리렌더 O) — 비교!</h3>
        <p>num : {num}</p>
        <button onClick={onState}>num +1 (화면 바뀜 + 리렌더</button>
      </div>
    </>
  );
};
export default RefTest;
