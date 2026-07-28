import "./TodoItem.css";
import { memo } from "react";
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };
  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// 컴포넌트 밖
// const memoizedTodoItem = memo(TodoItem);
// export default memoizedTodoItem;

// 이렇게 콜백함수를 넣어서 커스터마이징 해서 memoization 하는 memo 메서드를 활용하는 컴포넌트를
// 고차 컴포넌트 (Higher Order Component  === HOC)
// 이 고차 컴포넌트를 이용하면 그냥 이렇게 한 번 호출 하는것만을도 컴포넌트에 새로운 기능을 부여할 수 있기 때문에 복잡한 리액트 앱을 구축할 때 꽤나 자주 쓰는 그러한 유용한 방식이다
// 이 고차 컴포넌트 memo메서드말고도 우리가 직접 만들수도 있다
export default memo(TodoItem, (prevProps, nextProps) => {
  // 2. 이 todoItem 컴포넌트의 메모함수 안에 두번째 인수로 콜백함수를 추가로 전달해서 최적화기능을 커스터마이징 하는것

  // 이렇게 콜백함수를 전달하게 되면 부모 컴퍼넌트가 리렌더링 될 때마다 이 컴퍼넌트의 프롭스를 바뀌었는지를 자기가 스스로 판단하는게 아니라 이 콜백 함수의 매개변수로 과거의 props , prev props와
  // 현재의 props next props 를 전달해줘서 이 함수의 반환값에 따라서 props 가 바뀌었는지 안바뀌었는지 판단함

  // 이콜백함수가 true 를 반환 -> props 가 바뀌지 않ㅇ으 ㅁ=> 리렌더링 엑스
  // 이 콜백함수가 fasle 를 반환 -> props 가 바뀜 -> 리렌더링 해라

  // 즉 우리 가 이 콜백함수 안에서 원하는 건 이 TodoItem 의 컴포넌트가 받는 props 들 중에 onUpdate , onDelete 빼고 다른것들이 바뀌었을 때 리렌더링 되게 만들면 됨
  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;

  return true;
});

// 객체타입의 형태의 props를 받게되면 memo 메서드만 사용한다고해서 최적화 할 수 없다
// 2가지 방법을 활용해야함

// 1. 앱 컴포넌ㅌ에서 이함수들 즉 객체 타입 형태의 함수 자체를 메모이제이션 해서 리렌더링 되더라도 다시 생성되지 않게 방지하는 방법 (근데 이건 useCallback 이라는 함수를 활용해야함)
