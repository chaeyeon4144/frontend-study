import "./App.css";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import LifeCycle from "./components/LifeCycleTest";
import Even from "./components/Even";
import { useEffect, useState, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // mount 되었는지 확인할 변수 (useRef 사용)
  const isMount = useRef(false);
  //초기값으로는 아직 이 컴포넌트가 mount 되지않는다는 의미로 false 를 넣어줌
  // 1. 마운트 : 탄생
  // useEffect(() => {
  //   console.log("mount");
  // }, []);

  // useEffect를 활용해서 mount 라이프사이클을 제어하는법
  // useEffect 는 deps 에 있는 값이 변경되었을 때 실행되기 떄문ㅇ에
  // 결국 이 콜백함수는 이 컴퍼넌트가 처음 mount 될 때 이후에는 다시 실행되지 않는다
  // 왜 ? deps 가 빈배열인데 왜 이걸 print 로 인식하는건지 궁금

  // 그래서 컴포넌트가 마운트 되엇을 때 딱 최초로 한번 실행시키고 싶은 코드가 있을데 빈 deps 를 이용하면된다
  // 2. 업데이트 : 변화 , 리렌더링

  // useEffect(() => {
  //   console.log("deps 없는 업데이트");
  // });

  // 두번째 라이프사이클인 update 도 똑같이 useEffeect 를 활용하면 된다
  //  1. 첫번째 방법 :[deps] 생략
  // 이 useEffect 안의 콜백함수는 mount 될때 한번 실행됐다가 , 이 컴포넌트가 리렌더링 될때마다 즉 업데이트가 일어날때 마다 계속 콜백함수를 호출한다

  // 왜 deps 를 안넣으면 이런 현상이 발생해 ? 걍 외워야하는거 ?

  // 2. mount 시점을 제외하고 딱 컴포넌트가 마운트되고 나서 리렌더링 될때만 즉 업데이트 될때만 useEffect 안 콜백 함수를 실행하고 싶다면
  // 2-1 . 현재 이 컴포넌트가 마운트가 되엇는지 안되었는지 체크하는 변수를 useRef 에 담아준다 = slot 을 저장니 리렌더되진않지만 state를 반영
  // useEffect(() => {
  //   // 콜백 함수안에 조건문을 넣는다
  //   if (!isMount.current) {
  //     // isMount.current 에 담긴 값이 뭐냐 flalse 지 지금 근데 여기서ㅡ! 를 붙이면 isMount.currnet 잖아
  //     isMount.current = true;
  //     return;
  //   }
  //   console.log("update - mount 이후 리렌더 될때만 출력");

    // 이 조건문을 작성하면 callback 함수는 이제 앱 컴포넌특가 최초 마운트 될때 이 콜백함수를 실행하긴 하는데
    // 여기서 if 조건문이 참이 되기때문에 return 으로 강제 종료 시켜서 아래 콘솔울 출력할수없다
    // 뎁스를 안넣으니까 똑같이 리렌더될때는 콜백함수를 실행하는데 조건문에서 마운트 될때를 만나면 return 으로 강제 종료 시켜서 출력 못하게 한다고 생각하면되나 ?

    // 즉 진짜 컴포넌트가 업데이트 될때 만 콜백함수를 실행시키고 싶으면 -> 레퍼런스 객체를 생성해서 이렇게 플래그로 사용하면 된다
    /// 여기서 플래그가 뭐야 ?
  // });

  // 3. 언마운트 : 죽음
  // 1. 일단 화면에 mount 됐다가 unmount 되는 컴포넌트를 만들어준다

  // 이벤트 핸들런
  const onClickButton = (value) => {
    setCount(count + value);
    console.log(count);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        {/* <Controller count={count} setCount={setCount} /> */}
        <Controller onClickButton={onClickButton} />
      </section>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <LifeCycle />
      </section>
    </div>
  );
}

export default App;
