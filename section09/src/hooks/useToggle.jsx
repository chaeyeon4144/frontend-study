import { useState } from "react";
function useToggle() {
  // 1) state 만들기 (fasle = 초기값)
  const [toggle, setToggle] = useState(false);

  // 2) 뒤집는 함수 (누르면 반대로)
  const onToggle = () => {
    setToggle(!toggle);
  };
  // 3) 배열로 반환 (useState 흉내)
  return [toggle, onToggle];
}
export default useToggle;

