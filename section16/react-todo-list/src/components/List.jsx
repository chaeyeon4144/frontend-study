import TodoItem from "./TodoItem";
import "./List.css";
import { useState, useMemo } from "react";
const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // search state 가 바뀐걸 filering 하는 함수
  const getFilteredData = () => {
    // 이 함수가 필터링된 todos 를 반환하도록 해야함
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };
  const filteredTodos = getFilteredData();

  // todo들의 상태를 분석해서 수치로 제공하는 함수

  // useMemo(() => {}, []);

  // 첫번째 인수로는 콜백함수 , 두번째 인수로는 배열을 전달 하는데
  // 의존성 배열 : deps
  // deps 의 포함된 값이 변경되었을 때에만 첫 번째 인수로 전달한 이 콜백 함수를 다시 실행함
  //   const a = useMemo(() => {return 1}, []);
  // 여기서 추가로 해당 콜백함수가 반환하는 값을 useMemo는 그대로 다시 반환을 해줌 그래서 이렇게 변수에 넣어서 사용까지 할 수 있음

  // 현재 todo들의 상태를 분석해서 수치로 제공하는 함수
  // const getAnalyzedData = () => {
  //   console.log("getAnalyzedData 호출 !");

  //   const totalCount = todos.length;
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   const notDoneCount = totalCount - doneCount;

  //   return { totalCount, doneCount, notDoneCount };
  // };
  // getAnalyzedData();

  // return 값을 그대로 꺼내쓸수 있고 구조분해 할당으로 변수로 설정
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // 이 콜백함수 안에는 memoization 하고 싶은 함수를 넣어주면 됨
    console.log("getAnalyzedData 호출 !");

    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return { totalCount, doneCount, notDoneCount };
  }, [todos]);
  // 첫번째 인수 콜백 , 두번째 인수 배열 : deps (의존성 배열)
  // 첫번째 인수 콜백함수가 반환하는 값을 useMemo가 그대로 반환함

  // 그럼 이렇게 호출한 useMemo 의 return 값은 {totalCount , doneCount , notDoneCount} 이 객체 이다

  return (
    <div className="List">
      <h4>Todo List 🌸</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>notDone : {notDoneCount}</div>
      </div>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              {...todo}
              key={todo.id}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};
export default List;
