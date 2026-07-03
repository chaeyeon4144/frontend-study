import { useState } from "react";
const Bulb = () => {
  const [light, setLight] = useState("OFF");
  console.log(light);

  return (
    <>
      <div>
        {light === "ON" ? (
          <h1 style={{ backgroundColor: "orange" }}>ON</h1>
        ) : (
          <h1 style={{ backgroundColor: "gray" }}>OFF</h1>
        )}
      </div>
      <button
        onClick={() => {
          setLight(light === "ON" ? "OFF" : "ON");
        }}
        // 아주ㅈ아주 중요한 사실 : 이 button을 클릭해서 light의 state 값이 변경되면 변경될때마다 리렌더링이 일어나는데 (왜냐하면 state 가 변경되면 리렌더링이 일어나니까)
        // 함수 APP 컴포넌트 가 다시 실행되면서 BUlb 컴포넌트도 재 리렌더링 된다는 사실 (이렇게 이해하면 되나 ?)
        // 즉 벌브와 같은 자식 컴포넌트는 부모로부터 받는 props의 값이 바뀌면 리렌더링 된다

        // 아 혹시 aPP컴포넌트가 벌브의 부모 컴포넌트인가 지금 이 bulb 를 따로 모듈화 시키지않아서 내가 헷갈리는건가

        // 결론적으로 리액트 컴포넌트는 자신이 갖고있는 state가 변경되지 않더라도 부모로부터 받는 props 의 값이 변경되면 (이때 props값이 변경된다는말은 state말고도 props로 주는 값이 변경되면 리렌더링 된다는 말인가 ? 근데 동적으로 변화하는 변수는 state 밖에 없으니까 여기서 말하는 props 의 변경은 state 변경이라고 보면될끼?)
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button>
    </>
  );
};
export default Bulb;
