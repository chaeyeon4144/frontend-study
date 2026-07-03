import useInput from "../hooks/useInput";

// 3가지 hook 관련된 팁
// 1. hook 은 반드시 함수 컴포넌트 이거나 (이말은 즉슨 hook 이 사용된 컴포넌트면 함수컴포넌트여야한다는 말인가 ?) / 커스텀 훅 내부에서만 호출이 가능 (뭘 호출 ? use- 한개씩의 hook 들 ?)
// 2. React Hook은 조건부로 호출될수 없다 = 조건부로 호출된다는말은 조건문이나 반복문 내부에서 hook 이 호출된다는말
// 3. 나만의 훅 (Custom hook) 을 직접 만들 수 있다

// react hook(=useState)을 컴포넌트 밖에서 호출되게 되면
// 콘솔에 invaild hook call 이라고 에러가 뜸
// Hooks can only be called inside of the body of a function component.
//const state = useState();

// HookExam 안에 있는 input 들 말고 다른 함수 컴포넌트에서 사용자 입력값을 저장한는 state를 만든다면
// 같은 코드를 다른 함수 컴포넌트에서 또 반복적으로 작성해야하는 번거로움이 있기 때무네
// 그 코드 자체를 빼서 별도의 함수로 만들어보자

// function useInput() {
//   // function getInput() {
//   const [input, setInput] = useState();

//   // 근데 여기서 이런 React 컴포넌트가 아닌 일반적인 JS 함수에서 이런 useState 와 같은 React Hook 을 호출하려고 하면 오류가 발생하게 됨
//   // 왜냐하면 React Hook는 이런 React 함수 컴포넌트 내부이거나 custom hook 안에서만 호출이 가능함

//   // 이벤트 핸들러
//   const onChange = (e) => {
//     setInput(e.target.value);
//   };
//   // 어떻게 두개를 배열로 묶어서 return 할 수 있는걸까
//   return [input, onChange];
// }

const HookExam = () => {
  // 1. 번팁
  // const state = useState();

  // 2. 예시
  // if (true) {
  //   const state = useState();
  // }
  // for (;;) {
  //   const state = useState();
  // }
  // 리액트가 내부적으로 함수 컴포넌트들을 호출해서 화면에 렌더링할 때
  // 이런 조건문이나 반복문 내부에서 hook을 호출하게 되면 서로 다른 hook 들의 호출 순서가 엉망되는 현상이 발생해서 내부적인 오류가 발생
  // 그렇기 때문에 결론적으로 리액트 hook은 반드시 이런 조건문이나 반복문 블럭 내부가 아닌 . 그냥 컴포넌트 함수안에서만 호출되어야한다 라고 정의할수있음

  // 3. 나만의 Custom hook
  // 원래의 사용자의 입력 값을 state로 저장하는 방식
  // const [input, setInput] = useState();

  // // 이벤트 핸들러
  // const onChange = (e) => {
  //   setInput(e.target.value);
  // };

  // custom hook = getInput 함수를 베열 구조 분해할당으로 후출
  // const [input, onChange] = getInput();
  const [input, onChange] = useInput();
  // 얘는 return 을 안했는데 ..?
  const [input2, onChange2] = useInput();

  return (
    <div>
      <input type="text" value={input} onChange={onChange} />
    </div>
  );
};
export default HookExam;
