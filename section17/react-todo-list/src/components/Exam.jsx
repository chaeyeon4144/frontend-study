import { useReducer } from "react";

// 상태변화를 실제로 처리하게 되게 될 함수 함수
// reducer : 우리말로 변환기
// -> 결국 이 reducer 라는 함수는 결국 상태를 실제로 변화시키는 변환기 역할을 하는 함수

// 그럼 useReducer가 dispatch 함수의 요청을 처리해주기 위해서 reducer 함수를 호출하는데 여기 인수로는 state , aciton 개체

// 즉 다시 정리하자면
// dispatch 함수를 호출하게 되면 이 reduce 함수가 호출이되고 그때 state 와 dispatch 함수의 인수인 액샌객체가 매개변수로 전달된다
function reducer(state, action) {
  console.log(state, action);

  // if (action.type === "INCREASE") {
  //   return state + action.data;
  // } else if (action.type === "DECREASE") {
  //   return state - action.data;
  // }

  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }

  // so 이 reducer 함수에서는 매개변수로 받은 현재의 state 값과 액션객체를 이용해서 실제로 state 값을 변경시켜 주면됨
  // 근데 상ㅇ태 변화 함수도 없는데  어떻게 state 를 변경할수 있냐?  => 그냥 reducer 함수에서 새로운 state 값을 반환해 주기만 하면됨
  // 그라먄 반환된 값을 useReducer 가 불러와서 실제로 이 state 값을 변경시켜주게됨
}
const Exam = () => {
  // dispatch : 발송하다 , 급송하다
  // 상태 변화를 요청하기만 하는 함수
  // -> 결국 이 dispatch 라는 함수는 상태 변화가 있어야한다는 사실을 알리는 , 발송하는 함수
  // 두번째 인수로는 state의 초기값을 전달
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickplus = () => {
    // dispatch 인수 : 상태가 어떻게 변화되길 원하는지
    // 보통 dispatch 함수는 이렇게 객체 형태로 타입이라는 프로퍼티에는 상태를 어떻게 변화시키길 원하는지 적습니다
    // 이렇게 dispatch 함수의 객체 형태의 인수로 전달된 이 요청의 내용을 담고 잇는 객체를 보통 액션 객체라고 부른다
    // -> 액션 객체
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  // 마이너스
  const onClickpMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  // 해석해보자면 : dispatch 로 상태 변화를 요청했어 -> 요청의 내용으로는 객체를 전달(값을 얼만큼 증가시켜달라고 )

  return (
    <>
      <h1>{state}</h1>
      <button onClick={onClickplus}>+</button>
      <button onClick={onClickpMinus}>-</button>
    </>
  );
};
export default Exam;
