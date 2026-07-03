import useToggle from "../hooks/useToggle";
const Toggle = () => {
  const [isOn, isToggle] = useToggle();
  // ㅇ여기서 useToggle() 안에 괄호는 다른 매개변수 자리다
  // 이건 무조건 useState (false) 로 넘겼기 때문에 초기값이 false로 설정되어있음

  // 즉 매개변수를 주고 싶으면
  
  return (
    <div>
      <p>{isOn ? "🟢 켜짐" : "🔴 꺼짐"}</p>
      <button onClick={isToggle}>스위치</button>
    </div>
  );
};
export default Toggle;
