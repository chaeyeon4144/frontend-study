import TodoItem from "./TodoItem";
import "./List.css";
import { useState } from "react";
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
  return (
    <div className="List">
      <h4>Todo List 🌸</h4>
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
