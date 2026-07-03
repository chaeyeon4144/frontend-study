import "./App.css";
// 추가적으로 : 이렇게 ES모듈 시스템으로 불러오고 있음에도 리액트 앱에서는 파일의 확장자를 생략해 주어도 괜찮음
// 우리가 vite 로 만든 리액트 앱ㄹ에서는 이 확장자 파일을 사용하지않아도 자동으로 파일을 찾아가도록 내부적으로 자동 설정이 되어있음

// 함수 컴포넌트에서 스테이트를 생성하려면 react 에서 제공하는 useState라는 내장 함수를 사용해야함
import { useState } from "react";
import TestDefault from "./components/TestDefault";
//     ↑ default라 중괄호 X    ↑ 파일 위치(경로)
function App() {
  // const buttonProps = {
  //   text: "메일",
  //   color: "red",
  //   a: 1,
  //   b: 2,
  //   c: 3,
  // };

  // 여기서 props에 대해서 추가적으로 살펴 보아야할점은
  // 이런 기본적이 문자열이나 숫자 같은 일반적인 자바스크립트 값 뿐만 아니라 html 요소나 React 컴포넌트 까지도 전달할 수있다는 사실
  // return (
  //   <>
  //     <Button {...buttonProps} />
  //     {/*  근데 왜 ...으로 복사 ...? 아 이거 sesstion에서했던 흩어져있는거 묶는건가 ? */}
  //     {/* 이렇게 많은 props를 전달해야한다면 이때는 이 모든값들을 객체로 묶어서 스프레드 연산자를 통해서 한번에 전달할수 있다 */}
  //     {/* <Button text={"메일"} color={"red"} a={1} b={2} c={3} /> */}
  //     {/*  근데 여기서 color 는 style={{color : "color"}}가 아니고 그냥 key 이름이 color 인 프로퍼티일 뿐이지 ? */}
  //     <Button text={"카페"} />
  //     {/* <Button text={"블로그"} /> */}
  //     <Button text={"블로그"}>
  //       {/* 이 HTML 요소가 Button 컴포넌트에게 children 이라는 이름의 props 로 자동으로*/}
  //       <div>자식요소</div>
  //     </Button>
  //     <Button text={"앨범"}>
  //       {/* 다른 컴포넌트가 children 으로 들어 올 수 있음 */}
  //       <Header />
  //     </Button>
  //     <ClickEvent />
  //   </>
  // );

  // state 만들어보기

  // useState함수를 호출해서 반환값을 state라는 변수에 담아줌
  // const state = useState(0);
  // console.log(state);
  // useState라는 함수는 인덱스가 2인 배열을 반환하는데
  // 이때 첫번째 요소는 새롭게 생성된 state의 값
  // 인수로 초기값을 넣어주면 배열의 첫번째 요소로 들어감
  // 그럼 undefined가 안나오기 위해서는 항상 초기값을 넣어줘야해 ?
  // 두버째 요소는 함수인데 ㅡ이 함수는 이 state값을 변경하는 즉 상태를 변화시키는 함수가 들어있다 그래서 우리는 이 함수를 상태 변화함수라고 부름

  // 즉 정리하자면 새로운 state를 생성하는 이 useState라는 함수는 인수로는 state의 초기값을 받아서 이렇게 두개의 요소를 담은 배열을 반환하는데
  // 천번째 요소는 state의 현재 값이고 두번째 요소는 이 state를 변경시키는 상태 변화 함수라는것

  // 그렇기 때문에 useState를 호출하면 배열을 반환 받을것이기 때문에 변수에 저장하기 보다는 배열의 비구조화 할당 문법을 이용해서
  const [count, setCount] = useState(0);
  const [light, setLight] = useState("OFF");

  return (
    <>
      <div>
        <h1>{light}</h1>
        <button
          onClick={() => {
            setLight(light === "ON" ? "OFF" : "ON");
          }}
        >
          {light === "ON" ? "끄기" : "켜기"}
        </button>
      </div>
      <div>
        <h1>{count}</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          ✚
        </button>
      </div>
      {/* useState 초기값 실험 */}
      <div>
        <TestDefault />
      </div>
    </>
  );
}

export default App;

// React 는 자바스크리트 함수가 html 태그를 반환하도록 설정한다
// 반환하는 함수를 컴포넌트라고 부르고
// 컴포넌트를 부를 때에는 보통 이 함수의 이름을 따서 부른다

//=> 그래서 이 컴포넌트는 app 컴포넌트

// javaScript 함수를 평범하게 만들고 해당 함수가 HTML 태그를 반환하게 만들면 => 이 함수는 React의 컴포넌트 함수가 된다
// 그리고 React에서는 이런 함수를 함수 컴포넌트라고 부르고 이렇게 함수 선언식 말고도 화살표 함수로 바꿔서 컴포넌트를 작성도 할 수 있음

// 컴포넌트 함수 이름의 첫글자는 무조건 대문자로 만들어야 컴포넌트야 ! 라고 React 에 알려주는것

// 마치 HTML을 작성하듯이 Header 컴포넌트를 배치시켜주게 되면 이 App 컴퍼넌가 화면에 렌더링 될 때 헫더 컴포넌트의 반환값을 불러와서 같이 함께 렌더링

// React 에서는 이렇게 Header 컴포넌트 처럼 다른 컴포넌트의 리턴문 내부에 포함되는 이러한 컴포넌트를 자식 컴포넌라고부르고
// APP 컴포넌트를 부모 컴포넌트락 부르고
// 컴포넌트 간의 계층도 있다는걸 공부 해야함
