import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
// import Exam from "./components/Exam";
import { useState, useRef, useReducer } from "react";
import "./App.css";
// 일단 목업 데이터
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
    // Date 가 있어야한ㄴ데 날짜 데이터를 타임 스탬프로 저장하면 편리하다 ..?
    // new Date() 로 새로운 객체를 생성해서 getTime 메서드로 현재 시간에 해당하는 타임 스탬플흐를 넣어준다
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
    // Date 가 있어야한ㄴ데 날짜 데이터를 타임 스탬프로 저장하면 편리하다 ..?
    // new Date() 로 새로운 객체를 생성해서 getTime 메서드로 현재 시간에 해당하는 타임 스탬플흐를 넣어준다
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
    // Date 가 있어야한ㄴ데 날짜 데이터를 타임 스탬프로 저장하면 편리하다 ..?
    // new Date() 로 새로운 객체를 생성해서 getTime 메서드로 현재 시간에 해당하는 타임 스탬플흐를 넣어준다
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item,
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, dispatch] = useReducer(reducer, mockData);
  // 고유한 id 를 저장한 레퍼런스 객체그럼
  const idRef = useRef(3);

  // todos 를 변경시키는 핸들러 함수
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  // // todos 를 수정하게하는 핸들러  함수
  // const onUpdate = (targetId) => {
  //   // todos state의 값들 중에
  //   // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

  //   // 인수 : todos 배열에서 targetId 와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === targetId) {
  //         return {
  //           ...todo,
  //           isDone: !todo.isDone,
  //         };
  //       }
  //       return todo;
  //     }),
  //   );
  // };

  // 간결하게 코드를 작성ㅇ
  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  // todoItem을 삭제하는 핸들러 함수
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };
  return (
    <div className="App">
      {/* <Exam/> */}
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
