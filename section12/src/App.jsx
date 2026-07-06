import "./App.css";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import useCounter from "./hooks/useCounter";

function App() {
  const [count, onClickButton] = useCounter();

  // // 이벤트 핸들러
  // // 여기서 value 는 버튼의 값
  // const onClickButton = (value) => {
  //   setCount(count + value);
  // };
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        {/* <Controller count={count} setCount={setCount} /> */}
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
