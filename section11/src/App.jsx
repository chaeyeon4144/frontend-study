import "./App.css";
import Header from "./components/Header";
import Counter from "./components/Counter";
import Buttons from "./components/Buttons";
import useCounter from "./hooks/useCounter";

function App() {
  const { count, OnIncrease, OnReset, onDecrease } = useCounter();
  return (
    <div>
      <Header />
      <Counter count={count} />
      <Buttons
        OnIncrease={OnIncrease}
        OnReset={OnReset}
        onDecrease={onDecrease}
      />
    </div>
  );
}

export default App;
