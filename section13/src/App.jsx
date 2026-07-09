import "./App.css";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import useCounter from "./hooks/useCounter";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // 이벤트 핸들런
  const onClickButton = (value) => {
    setCount(count + value);
    console.log(count);
  };

  // useEffect(() => {
  //   console.log(`count: ${count} / input: ${input}`);
  // }, [count, input]);

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
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
    </div>
  );
}

export default App;
