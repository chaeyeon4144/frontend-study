import { useState } from "react";
function useInput() {
  // function getInput() {
  const [input, setInput] = useState();

  // 근데 여기서 이런 React 컴포넌트가 아닌 일반적인 JS 함수에서 이런 useState 와 같은 React Hook 을 호출하려고 하면 오류가 발생하게 됨
  // 왜냐하면 React Hook는 이런 React 함수 컴포넌트 내부이거나 custom hook 안에서만 호출이 가능함

  // 이벤트 핸들러
  const onChange = (e) => {
    setInput(e.target.value);
  };
  // 어떻게 두개를 배열로 묶어서 return 할 수 있는걸까
  return [input, onChange];
}
export default useInput;
