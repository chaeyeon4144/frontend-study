import { useState } from "react";

const TestDefault = () => {
  // 초기값 없음
  const [light, setLight] = useState();
  console.log("지금 light", light);

  return (
    <div>
      <h1>전구 : {light}</h1>
      <button
        onClick={() => {
          setLight(light === "ON" ? "OFF" : "ON");
        }}
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button>
    </div>
  );
};
export default TestDefault;
