import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// 리액트가 render() 라는 메서드를 사용해서 화면에 렌더링 하고있는 컴포넌트 앱은 바로 앱.jsx
// render 의 인수로 컴포넌트가 들어감