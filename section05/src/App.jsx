import "./App.css";
import { useState } from "react";
import Bulb from "./components/Bulb";
import Counter from "./components/Counter";
import InputTest from "./components/InputTest";

// 전구 역할을 하는 컴포넌트
// 부모의 컴포넌트로부터 전구가 꺼지고 켜지고의 state를 props 로 받아올 예정
// 그럼 여기서 Bulb 는 props를 받는 자식 컴포넌트

// const Bulb = () => {
//   const [light, setLight] = useState("OFF");
//   console.log(light);

//   return (
//     <>
//       <div>
//         {light === "ON" ? (
//           <h1 style={{ backgroundColor: "orange" }}>ON</h1>
//         ) : (
//           <h1 style={{ backgroundColor: "gray" }}>OFF</h1>
//         )}
//       </div>
//       <button
//         onClick={() => {
//           setLight(light === "ON" ? "OFF" : "ON");
//         }}
//         // 아주ㅈ아주 중요한 사실 : 이 button을 클릭해서 light의 state 값이 변경되면 변경될때마다 리렌더링이 일어나는데 (왜냐하면 state 가 변경되면 리렌더링이 일어나니까)
//         // 함수 APP 컴포넌트 가 다시 실행되면서 BUlb 컴포넌트도 재 리렌더링 된다는 사실 (이렇게 이해하면 되나 ?)
//         // 즉 벌브와 같은 자식 컴포넌트는 부모로부터 받는 props의 값이 바뀌면 리렌더링 된다

//         // 아 혹시 aPP컴포넌트가 벌브의 부모 컴포넌트인가 지금 이 bulb 를 따로 모듈화 시키지않아서 내가 헷갈리는건가

//         // 결론적으로 리액트 컴포넌트는 자신이 갖고있는 state가 변경되지 않더라도 부모로부터 받는 props 의 값이 변경되면 (이때 props값이 변경된다는말은 state말고도 props로 주는 값이 변경되면 리렌더링 된다는 말인가 ? 근데 동적으로 변화하는 변수는 state 밖에 없으니까 여기서 말하는 props 의 변경은 state 변경이라고 보면될끼?)
//       >
//         {light === "ON" ? "끄기" : "켜기"}
//       </button>
//     </>
//   );
// };

// Count 컴포넌트 분리작업
// const Counter = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           setCount(count + 1);
//         }}

//         // 여기서 카운트 버튼을 누르면 위의 작성한 Bulb 컴포넌트안 console.log(light) 가 계속 찍힘
//         // 이상함 현재 행동은 cosnt [count ,setCount] 의 state 값을 바꾼건데 light의 state 값이 같이 변경됨
//         // 부모 APP 컴포넌트의 자식인 COunt 컴포넌트가 리렌더링 되니까  벌브도 같이 리렌더링된다 ..>?
//       >
//         ✚
//       </button>
//     </div>
//   );
// };

function App() {
  return (
    <>
      {/* <h1>{light}</h1> */}
      {/* 원래 h1 태그로 불러왔던 state 를 함수 컴포넌트 Bulb 로 변경 => 여기서 내가 궁금한점 Bulb 에서 부모컴포넌트로 받고있는 props 인 light 와 현재 APP 컴포넌트의 state 값의 light는 같은 state야 ?
          위의 코드 const [light , setLight] = useState("OFF"); 라는 state를 APP 에 선언하지 않으니까 Bulb 의 props light 를 잡지를 못하는데 (그럼 이 코드가 없으면 APP 인수로 props를 받아와야하나 ? 근데 Props는 부모로 부터 받아오는 건데 APP 컴포넌트는 최상위 컴포넌트잖아)
        */}
      <Bulb />

      <Counter />
      {/* 인풋 종류 개념 다지기 */}
      <div>
        <InputTest />
      </div>
    </>
  );
}

export default App;

// 리액트 컴포넌트는 리렌더링이 발생하는 세가지 상황이 있음
// 1. 자신이 관리하는 state값이 변경되었을때
// 2. 자신이 제공받는 props의 값이 리렌더링 되었을때
// 3. 부모컴포넌트가 리렌더링되면 자식컴포넌트도 리렌더링 된다

// 즉 count 의 state의 값을 변경햇는데 light 의 state 값도 같이 리렌더링 되는건
// app 컴포넌트가 count , light 의 state의 값을 모두 가지고 있느니까 자신의 가진 state의 값이 변경되면 리렌더링 되고 -> Bulb는 APP컴포넌트의 자식 컴포넌트니까 => 부모가 리렌더링되면 자식도 리렌더링 된다

// 즉 부모 컴포넌트의 리렌더링 때문에 BUlb 의 ㅣight 값은 count와 아무상관엇는데 무의미하게 리렌더링이 일어나고 있음
// => 성능 저하가 일어남
// 관련없는 state를 한 컴포넌트에 몰아넣는게 아니라 관련이 없다면 서로 다른 컴포넌트로 분리하는게 좋다
