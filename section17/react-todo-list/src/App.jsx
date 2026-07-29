import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
// import Exam from "./components/Exam";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";
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

// export const TodoContext = createContext();
// console.log(TodoContext);
// // 콘솔 찍으면 객체의 형태의 다양한 정보들이 나오는데 그중에 provider 라는 속성이 있음
// // provider 프로퍼티는 영어로 공급자 , 제공자라는 뜻
// // 이 provider 는 context가 공급할 데이터를 설정하거나 또는 이 컨텍스트의 데이터를 공급받을 컴포넌트들을 설정하기 위해서 사용하는 그런 props이다
// // 이 provider는 사실 컴포넌트다

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, dispatch] = useReducer(reducer, mockData);
  // 고유한 id 를 저장한 레퍼런스 객체그럼
  const idRef = useRef(3);

  // todos 를 변경시키는 핸들러 함수
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

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
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  // todoItem을 삭제하는 핸들러 함수
  // const onDelete = (targetId) => {
  //   dispatch({
  //     type: "DELETE",
  //     targetId: targetId,
  //   });
  // };

  // // 앱 컴포넌트가 리렌더링 될때마다 새로운 참조값을 만들어내느것을 방지하기 위해 함수를 memorization
  // // 첫번째 인수로 는 : 최적화하고 싶은 함수 즉 불필요하게 재생성되지 않도록 ㄷ방지하고 싶은 함수
  // // 두번째 인수로 : 두번째 인수로는 뎁스

  // const func = useCallback(() => {
  //   // 기본적으로 이 useCallback은 우리가 첫번째 인수로 전달한 이 callback 함수를 그대로 생성해서 반환해줌
  //   // 즉 그대로 생성되니까 변수에 담을 수 있ㅇ므
  // } , [])
  // // 그리고 이렇게 생성되는 함수를 이 depth 가 변경되었을 때만 다시 생성하도록 최적화를 해준다
  // // 함수를 memmization 해주는것
  // // 즉 depth 에 빈배열을 설정하면 컴포넌트가 최초로 렌더링 될때 즉  mount 될때만 이 함수를 한 번 생성하고 ㄱ 뒤에는 아무리 리렌더링이 많이 발생한다고 해도 이 함수를 새롭게 생성하지 않는다

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);
  // 첫번째 인수로 메모이제이션 하고 싶은 함수를 그냥 넣으라고 했으니까
  // 함수를 익명함수로 복사해서 넣으면 됨
  // 그리고 두번째 인수로 빈배열인 depth를 넣어 마운트 됐을때만 렌더링되게 설정

  // useMemo 훅을 사용해서 value 객체를 메모이제이션
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      {/* <Exam/> */}
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>

      {/* 이렇게 작성하면 TodoContext 컴포넌트 아래에 있는 컴포넌트들은 TodoContext의 데이터를 공급 받을 수 있다 */}
    </div>
  );
}

export default App;
