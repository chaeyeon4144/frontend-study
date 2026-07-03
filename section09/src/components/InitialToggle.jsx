import useInitialToggle from "../hooks/useInitialTogle";
const InitialToggle = () => {
  const [isOn, isToggle] = useInitialToggle(true);
  return (
    <div>
      <p>{isOn ? "🟢 켜짐" : "🔴 꺼짐"}</p>
      <button onClick={isToggle}>스위치</button>
    </div>
  );
};
export default InitialToggle;
