import { useState } from "react";
// 간단한 회원가입 폼 컴포넌트
// 회원가입할때는 user의 간단한 정보를 수집함
// 1. 사용자의 이름
// 2. 사용자의 생년월일 (생년월일과 같은 날짜 데이터 또한 인퓻 태그를 이용)
// 3. 사용자의 국적
// 4. 사용자의 자기소개

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

  // console.log(input);
  // 이 콘솔로 알수 있는 핵심은 한개의 프로퍼티를 변경할때 다른 프로퍼티는 변경되지않는다 (즉 spread 연산자 = 전개 연산자 덕분에)

  // 즉 이렇게 여러개의 state로 관리하던 데이터를
  // 객체 형태로 만들어서 하나의 state로 함께 관리하는 방법에 대해서 배움
  // => 이후에 복잡한 상태를 관리한할 때 도움이 됨

  // 이제  input state의 name이라는 프로퍼티안에 이름을 저장 , birth 라는 프로퍼티에 생년월일 저장 , country 라는 프로퍼티에 국적 저장 , bio 라는 프로퍼티에 자기소개저장
  // 을 할 수있도록 수정해 보겠음

  // 이벤트 핸들러 함수
  // 이 onChangeName 함수에서는 1. 현재 인풋에 입력된 값을 받아와서  2. setName 함수를 호출해서 이 state에 보관해야해함

  // 2. 이 이벤트 핸들러들도 비슷하게 생겨서 굳이 따로 작성할 필요없이 하나로 묶어주는 과정을 진행하도록 하겠음

  // 통합 이벤트 핸들러
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // 어떻게 이렇게 동작할 수 있을까 ?
  // 1. 일단 모든 input의 Onchage 이벤트 핸들러에 onChange 이벤트 핸들러 함수를 전달했기때문에 어느 input에 어떤 값을 입력해도 onChange 함수가 모든 input에 실행된다
  // 2. setInput이라는 이 상태 함수를 실행하고
  // 3. 인수로는 객체를 만들어서 전달함
  // 4. 일단 spread 연산자로 기존의 input들의 state값을 다 나열해주고 (이때 state는 클로저인가 ?)
  // 5. 그리고 마지막에는 프로퍼티 키를 명시하는 자리에 대괄호를 열고 e.target.name 을 넣음
  //[e.target.name]: e.target.value  (대괄호 안엔 name = 어느 필드, 값엔 value = 입력값)
  // 이 문법이 뜻하는것은
  // 이렇게 새로운 객체를 만들면서 프로퍼티의 키 자리에 대괄호를 열고 그 안에 어떤한 변수를 지정하면
  // 이 대괄호안 변수는 이 객체의 프로퍼티의 키로써 설정이 된다
  // 즉 다시 말하자면 : e.target.name 이라는 데에 저장되어있는 값으로 지금 프로퍼티의 키를 설정하겠다라고 하는것
  // 그러면 이 [e.target.name] 에는 뭐가 들어있을까 ?
  // 여기에는 이벤트가 발생한  태그의(즉 input ?에 ) name 속성에 설정된 값이 들어있따

  // 즉 사용자가 date를 설정한다
  // 코드상에는 두번재 input 태그의 이벤트가 발생
  // 이때 event.target 은  이 type이 date인 두번째 input 태그임
  //이 input 태그에는 name="birth"
  // 즉 [e.target.name] = 이 두번째 input의 "birth" 라고 할 수 있음
  // 즉 이 코드는 birth: e.target.value 에 대해서 설정해라

  // // 이름 변경 함수
  // const onChangeName = (e) => {
  //   // 인수로는 새류운 state의 값을 전달해야하니까
  //   // 그럼 {name: e.target.vlaue} = {state = e.target.value}
  //   setInput({
  //     ...input,
  //     // spread 연산자를 이용해서 기존의 이 input state의 객체 안에 들어있던 popertiy 의 값들 변경하지않고 유지시키도록 설정해줘야함
  //     // 관련 엇는 값들을 그대로 유지하고 변경하고자하는값만 바꿔줘야함
  //     name: e.target.value,
  //   });
  // };

  // // 날짜 변경 함수
  // const onChangeBirth = (e) => {
  //   setInput({
  //     ...input,
  //     birth: e.target.value,
  //   });
  // };

  // // 국적 변경 함수
  // const onChangeCountry = (e) => {
  //   setInput({
  //     ...input,
  //     country: e.target.value,
  //   });
  // };

  // // 자기소개 변경 함수
  // const onChangeBio = (e) => {
  //   setInput({
  //     ...input,
  //     bio: e.target.value,
  //   });
  // };

  // 이 이벤트 객체 안에는 우리가 찾고있는 현재 이 인풋에 사용자가 입력한 값이 그대로 들어았음
  // 이벤트 객체안 프로퍼티 target 에 value (이거 구조가 프로퍼티 자체도 또 객체인건가?)
  return (
    <div>
      <div>
        {/* 사용자의 정보를 받는 input 태그 생성 */}
        {/* <input placeholder="이름" /> */}

        {/* 이 인풋에 사용자가 텍스를 입력하게 되면 입력된 텍스트를 nameState 에 보관하게 해줘야하니까 => 이 인풋의 값이 변경되었을 때를 의미하는 onChange 이벤트 핸들러를 설정해줌  */}
        {/* r그럼 input에 값이 변경되면 onChange 이벤트 핸들러를 브라우저가 인식하고 react 가 onChangeName 이벤트 핸들러함수를 호출  */}
        <input
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
    </div>
  );
};
export default Register;
