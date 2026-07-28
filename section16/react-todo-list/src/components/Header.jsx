import "./Header.css";
import { memo } from "react";
const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

// // 파일의 하단에 컴포넌트 바깥에서 메모 메서드를 호출하고 인수로는 최적화 하고싶은 컴포넌트를 인수로
// const memoizedHeader = memo(Header);

// // 이렇게 코드를 짜면 자동으로 ? 메모 메서드가 인수로 받는 이 헤더 컴포넌트를 props 가 변경되지않았을 때에는 리렌더링 하지 않도록 최적화 한다는건가 ?
// // 그래서 그값이 자동으로 나오니까 반환값을 변수로 담는다 ?
// export default memoizedHeader;

// export 문도 바꿈
// 원래는 React.memo() 로 작성해야하는데
//import { memo } from "react";
// 생략했기 때문에 memo()

const memoizedHeader = memo(Header);
export default memoizedHeader;
// export default memo(Header);
// 이렇게 단축도 가능하다
