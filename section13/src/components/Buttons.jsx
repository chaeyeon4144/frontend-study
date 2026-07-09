//  버튼 jsx
const Buttons = ({ OnIncrease, onDecrease, OnReset }) => {
  return (
    <div>
      <button
        onClick={() => {
          onDecrease(1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          onDecrease(10);
        }}
      >
        -10
      </button>
      <button
        onClick={() => {
          onDecrease(100);
        }}
      >
        -100
      </button>
      <button onClick={OnReset}>RESET</button>
      <button
        onClick={() => {
          OnIncrease(100);
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
          OnIncrease(10);
        }}
      >
        +10
      </button>
      <button
        onClick={() => {
          OnIncrease(1);
        }}
      >
        +1
      </button>
    </div>
  );
};
export default Buttons;
