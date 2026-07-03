import { useState } from "react";

function ClickEvent() {
  const [message, setMessage] = useState("아직 안 눌렀음");
  const onClickButton = () => {
    setMessage("눌렀다 ! 🌹");
  };
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={onClickButton}>눌러봐 😋</button>
    </div>
  );
}
export default ClickEvent;
