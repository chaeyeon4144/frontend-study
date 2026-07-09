import { useEffect } from "react";
// Even 컴포넌트가 unmount 되는 시점을 제어햊보자

const Even = () => {
  useEffect(() => {
    // 2. 콜백함수 안에서 새로운 화살표 함수를 하나 더 만들어서 return 으로 반환하게 만든다
    // 이렇게 useEffect 의 콜백함수가 반환하는 함수를 cleanup 함수 또는 정리함수라고 부른다
    // 이 정리함수는 useEffect 가 끝날때 실행이 된다
    // 이렇게 빈 deps 를 전달하게 되면 useEffect 는 언제 실행되냐 ? mount 될때
    // 종료는 그 반대인 unmount 가 될때 종료가 되기때무네
    // 즉 useEffect 가 종료될때 unmount 될때 cleanup 함수가 실행됨

    return () => {
      console.log("unmount");
    };
  }, []);

  // 마운트를 제어하는것처럼 빈 deps 를 넣어준다
  // 여기서 count 가 부모 컴포넌트에 있진만ㄱ 같ㅇ른 클로저가 아닌 Even에 useEffect 를 실행하는건
  // deps 가 빈 배열이라서 ?

  return <div>짝수 입니다</div>;
};
export default Even;
