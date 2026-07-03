import { useState } from "react";
// 간단한 회원가입 폼 컴포넌트
// 회원가입할때는 user의 간단한 정보를 수집함
// 1. 사용자의 이름
// 2. 사용자의 생년월일 (생년월일과 같은 날짜 데이터 또한 인퓻 태그를 이용)
// 3. 사용자의 국적
// 4. 사용자의 자기소개

const Register = () => {
  //  사용자가 입력하는 이름을 state로 생성해 보관
  const [name, setName] = useState("채연");
  // 사용자가 입력하는 생년월일을 state로 보관
  const [birth, setBirth] = useState("xxxx-xx-xx");

  // 사용자가 입력하는 국적을 state로 보관
  const [country, setCountry] = useState("한국");

  // 사용자가 입력하는 자기소개를 state로 보관
  const [bio, setBio] = useState("");

  // 이벤트 핸들러 함수
  // 이 onChangeName 함수에서는 1. 현재 인풋에 입력된 값을 받아와서  2. setName 함수를 호출해서 이 state에 보관해야해함

  // 이름 변경 함수
  const onChangeName = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    setName(e.target.value);

    //  음 이코드 자체가 setName 이 sate인 name 를 변경하는 함수잖아 애가하는일이 변경 ?이 저장 이라고 보면 되나 그리고 화면 렌더링
    // 근데 왜 onChangName 함수에에서 setName안에 인수로 e.target.value 를 넣으면  실제로 state 가 보관되는거지 ? 로직을 이해못하겠으
  };

  // 날짜 변경 함수
  const onChangeBirth = (e) => {
    // console.log(e.target.value);
    setBirth(e.target.value);
  };

  // 국적 변경 함수
  const onChangeCountry = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    setCountry(e.target.value);
  };

  // 자기소개 변경 함수
  const onChangeBio = (e) => {
    // console.log(e.target.value);
    setBio(e.target.value);
  };

  // 이 이벤트 객체 안에는 우리가 찾고있는 현재 이 인풋에 사용자가 입력한 값이 그대로 들어았음
  // 이벤트 객체안 프로퍼티 target 에 value (이거 구조가 프로퍼티 자체도 또 객체인건가?)
  return (
    <div>
      <div>
        {/* 사용자의 정보를 받는 input 태그 생성 */}
        {/* <input placeholder="이름" /> */}

        {/* 이 인풋에 사용자가 텍스를 입력하게 되면 입력된 텍스트를 nameState 에 보관하게 해줘야하니까 => 이 인풋의 값이 변경되었을 때를 의미하는 onChange 이벤트 핸들러를 설정해줌  */}
        {/* r그럼 input에 값이 변경되면 onChange 이벤트 핸들러를 브라우저가 인식하고 react 가 onChangeName 이벤트 핸들러함수를 호출  */}
        <input value={name} onChange={onChangeName} placeholder={"이름"} />

        {/*  위의 두개의 코드는 같은거지 ? 문자열은 그냥 "" 이것도 가능하고 {""} 이것도 가능하니까 ? */}

        {name}
      </div>
      {/* type을 date로 두면 날짜를 고를 수 있는 date peeker 가 떰 */}
      <div>
        {" "}
        <input
          value={birth}
          type="date"
          onChange={onChangeBirth}
          // 여기서는 왜 placeholder 를 사용안해 ?
          placeholder={"생년월일"}
        />
        {birth}
      </div>
      <div>
        {/* 국적처럼 선택의 범위기 제한되어있는 경우는 select 박스 활용 */}
        <select value={country} onChange={onChangeCountry}>
          {/* select 태그는 기본적으로 옵션들 중에 맨 위에 있는 이 옵션을 초기값으로 사용한다  */}
          {/* 나는 아무것도 초기값을 ㅅ설정하고 싶지 않다 */}
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
          {/* 근데 나 궁금한점 value 하나만 넣으니까 에러뜨는데  */}
        </select>
        {country}
      </div>
      <div>
        <textarea
          placeholder={"자기소개를 입력해주세요"}
          onChange={onChangeBio}
          value={bio}
        />
        {bio}
      </div>
    </div>
  );
};
export default Register;
