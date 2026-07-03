import { useState } from "react";
function useInitialToggle(initial = false) {
  const [toggle, setToggle] = useState(initial);
  const onToggle = () => {
    setToggle(!toggle);
  };
  return [toggle, onToggle];
}
export default useInitialToggle;
