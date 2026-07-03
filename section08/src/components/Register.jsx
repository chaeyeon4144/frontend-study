/////// <수업 목표 > userRef를 이용해서 새로운 레퍼런스 객체를 생성해보도록 하자

//import { useState } from "react";
// useRef또한 useSate처럼 리액트에서 제공하는 내장 함수이기때문에 import 해서 사용해야함
//import { useRef } from "react";

// 동일한 경로로부터 불러오는 import 문들은 이렇게 합칠수도 있음
import { useState, useRef } from "react";

//그럼 let으로 만든 변수가 렌더링 되지않으면 되지않을가 해서 함수 밖에 만들게되면
// let count = 0

// 컴포넌트가 하나면 상관없음 잘 count 돠ㅣㅁ
// 하지만 이 컴포넌트를 한 화면에서 재사용하게 된다면 변수를 공유해서 두개가 같이 카운팅되는 치명적인 오류가 생김

// 왜냐하면 한파일에서 컴포넌트 같은걸 사용하면
// 파일을 두번 둘러 오는게 아니라 함수를 두번 호출 하는것

const Register = () => {
  // 1. 반복되는 여러개의 state를 객체로 묶어서 관리 해보자
  // 모든 user의 입력값을 저장할것이다
  // 이때 초기값으로는 객체를 넣어줄건데 프로퍼티로 보관해줌
  const [input, setInput] = useState({
    // 4개의 state를 프로퍼티로  관리

    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  // // 새로운 레퍼런스 오브젝트를 생성해 보자
  // // const refObj = useRef();
  // // console.log(refObj);
  // // 콘솔의 결과값으로는 current 라는 프로퍼티를 갖는 객체가 출력됨
  // // 그래서 즉
  // // 이 reference 객체란 이 Current라는 프로퍼티에 현재 보관값을 담아두기만 하는 그런 아주 단순한 JavaScript 객체이다
  // // 그렇기 때문에 우리가 useRef로 새로운 레퍼런스 객체를 생성할 때 이렇게 인수로
  // const refobj = useRef(0);
  // // 0이라는 초기값을 전달하게 되면
  // //console.log(refobj);
  // // current 프로퍼티의 값으로 0이라는 초기값을 저장하고 있는 레퍼런스 객체가 출력이 됨

  // // 그리고 이런 레퍼런스 객체의 값을 사용하고 싶을때 일반 객체 다루듯이 점 표기법으로 객체에 접근하면됨
  // //console.log(refobj.current);

  // // 리렌더링이 되는지 확실하게 알려면
  // console.log("Register 렌더링");

  // 4개의 input 폼에 사용자가 얼마나 많은 획수의 변경을 일으켰는지 그 수정 횟수를 카운트 하는 기능을 만들어 보도록하자
  const countRef = useRef(0);

  // submit 할때 input의 값이 잘 담겼나 확인하기위해서 해당 input (특정 DOM )에 접근해야함
  const inputRef = useRef();

  // 심화적안 내용 : 리렌더링을 유발하지않는 변수를 만들려면 reference 객체를 사용하지않아도 그냥 js를 쓰면 되는거 아냐 ?
  let count = 0;
  // 통합 이벤트 핸들러
  const onChange = (e) => {
    // CountRef 의 값을 1씩 증가
    // countRef.current++;
    // console.log(countRef.current);

    // console.log(e.target.name, e.target.value);
    count++;
    console.log(count);

    // 카운트의 값이 1로 고정
    // input 의  값을 변경하게 되면 무슨일이 일어나냐 ?
    // state 값들이 변경됨
    // 결국에는 Register 컴포넌트가 리렌더링 된다
    // 이 컴포넌트가 리렌더링 된다는 말은 결국 함수가 다시 실행되는거기 때문에 함수안에 있는 모든 코드들이 다시 실행됨
    // let count = 0
    // count 변수를 초기화하고 있는 이 코드도 다시 실행되어서  리렌더링 될때마다 계속 리셋 ? 초기화됨

    // useRef 나 useState로 만든 리액트의 특수한 변숟들은 컴포넌트가 리렌더링 된다고 해도 다시 리셋되지않음

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // 폼이 제출되는 기능을 수행하는 이벤트 핸들러
  const onSubmit = () => {
    // 만들어야하는 기능들

    // 1. 사용자가 name의 input에 이름을 잘 입력했는지 검사
    if (input.name === "") {
      // 이름을 입력하는 DOM 요소에 focus 를 해줄거임
      // 1. 이렇게 특정 요소 DOM에 접근하려면 referece 객체를 활용

      // 이렇게 코드를 작성하면 이 input 태그가 렌더링 하는 DOM 요소가 이 inputRef 라는 레퍼런스 오브젝트에 저장됨
      // 근데 왜 이 오브젝트가 저장된걸 여기 코드안에서 log f를 찍지 >
      // console.log(inputRef.current);
      // // <inpurt name ="name" placeholder = "아룸" vlaue/>  이 태그 자체가 콘솔로 출력되는데
      // // 그니까 태그안에 이 ref={inputRef}를 담는거 자체가 crrent에 이 코드를 넣은 태그 자체를 담는건가 ?
      // console.log(inputRef);

      inputRef.current.focus();

      // 이 inputRef 변수 함수 밖에 있어서 참고할수 있는건가 ?
    }
  };

  return (
    <div>
      {/* 그리고 이 레퍼런스 객체는 state의 값과 달리 , 값이 변경되었다고 컴포넌트를 리렌더링 시키지 않는다 */}
      {/* <button
        onClick={() => {
          refobj.current++;
          console.log(refobj.current);
        }}
        // 이렇게 콘솔를 출력해 보면 onClick 이벤트 핸들러가 일어날때 마다 증가하는 레퍼런스 객체의 값이 콘솔로 계속해서 출력되지만
        // 위의 다른 콘솔은 한번만 출력되어서 리렌더링이 되지않는다는걸 알수 있다
      >
        ref + 1
      </button> */}
      <div>
        {/* 사용자의 정보를 받는 input 태그 생성 */}
        {/* <input placeholder="이름" /> */}

        {/* 이 인풋에 사용자가 텍스를 입력하게 되면 입력된 텍스트를 nameState 에 보관하게 해줘야하니까 => 이 인풋의 값이 변경되었을 때를 의미하는 onChange 이벤트 핸들러를 설정해줌  */}
        {/* r그럼 input에 값이 변경되면 onChange 이벤트 핸들러를 브라우저가 인식하고 react 가 onChangeName 이벤트 핸들러함수를 호출  */}
        <input
          // 특정 DOM  에 접근하기 위한 속성 ref
          ref={inputRef}
          // 이렇게 코드를 작성하면 이 input 태그가 렌더링 하는 DOM 요소가 이 inputRef 라는 레퍼런스 오브젝트에 저장됨

          // 통합 이벤트 핸들러
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={"이름"}
        />

        {/*  위의 두개의 코드는 같은거지 ? 문자열은 그냥 "" 이것도 가능하고 {""} 이것도 가능하니까 ? */}

        {input.name}
      </div>
      {/* type을 date로 두면 날짜를 고를 수 있는 date peeker 가 떰 */}
      <div>
        {" "}
        <input
          name="birth"
          value={input.birth}
          type="date"
          onChange={onChange}
          // 여기서는 왜 placeholder 를 사용안해 ?
          placeholder={"생년월일"}
        />
        {input.birth}
      </div>
      <div>
        {/* 국적처럼 선택의 범위기 제한되어있는 경우는 select 박스 활용 */}
        <select name="country" value={input.country} onChange={onChange}>
          {/* select 태그는 기본적으로 옵션들 중에 맨 위에 있는 이 옵션을 초기값으로 사용한다  */}
          {/* 나는 아무것도 초기값을 ㅅ설정하고 싶지 않다 */}
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
          {/* 근데 나 궁금한점 value 하나만 넣으니까 에러뜨는데  */}
        </select>
        {input.country}
      </div>
      <div>
        <textarea
          name="bio"
          placeholder={"자기소개를 입력해주세요"}
          onChange={onChange}
          value={input.bio}
        />
        {input.bio}
      </div>

      {/* 새로운 레퍼런스 객체를 생성해서 지금 이 컴포넌트가 렌더링 하고 있는 DOM 요소를 직접 조작해 보는 작업  */}
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};
export default Register;
