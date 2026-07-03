# React 공부 노트

> 한입 리액트 + Claude 세션 + Deep Dive

---

## 40강. React 소개 — 기술적 특징 3가지

### 📍 React 3대 특징 (먼저 한 줄씩)

1. 컴포넌트 기반 - 화면을 조각(컴포넌트)으로 , import로 재사용 (중복 X , 수정 쉬움)
2. 화면 업데이트 쉬움 - 선언형(목적만 선언) . state 만 바꾸면 React가 알아서 UI 갱신
3. 화면 업데이트 빠름 - Virtual DOM에 업데이트를 모았다가 실제 DOM에 한방에 반영

---

### ① 컴포넌트 기반으로 UI를 표현한다

- **컴포넌트란?** → (우리말로? 무슨 역할?)
  컴포넌트란 우리말로 구성요소 즉 화면을 구성하는 요소
  페이지의 모든 요소들을 컴포넌트라는 단위로 모듈화해서 개발해 중복 코드를 발생하지않게 하고 , 수정이 용이하게 하는 역할을 함
- **왜 좋은가?** → (재사용 / 수정 측면)
  import 해서 페이지에서 구성요소로 재활용이 가능하고 중복 코드가 적어지고 , 수정이 용이하다.

### ② 화면 업데이트 구현이 쉽다 (선언형)

- **업데이트란?** → (사용자 행동에 따라 화면이...)
  업데이트란 사용자의 어떤 행동에 따라서 즉 사용자의 클릭 , 드래그 엔터 등 과같은 행동에 따라서 웹페이지가 스스로 자신의 모습을 바꿔서 사용자와 상호작용하는
  그런 모든 기능들을 일컫는다.
- **선언형 vs 명령형** (식당 주문 비유로!)
  - 선언형 = 토마토 파스타 주세요 (내 목적만 선언)
  - 명령형 = 주방으로 가셔서 면 100g을 꺼내고 뜨거운 물에 9분 삶고 토마토소스와 함께 볶아서 다 되었다면 접시에 담아 내게 가져와 주세요 (즉 목적을 달성하기까지의 모든 과정을 일일히 명시해야함)
- **왜 React는 업데이트가 쉬운가?** → (state 값만 바꾸면...)
  즉 React 는 선언형 프로그래밍이기 때문에 업데이트가 일어났을때 복잡한 동작을 모두 명령할 필요없이 컴포넌트가 가지고있는 특별한 변수 state를 설정해 그 특정 변수의 값만 바꾸는것 즉 바꾸라고
  목적을 선언하면 화면을 쉽게 업데이트 시킬 수 있다.

### ③ 화면 업데이트가 빠르다 (Virtual DOM)

- **선수지식: 브라우저 렌더링 과정 (Critical Rendering Path)**

- DOM이란? → html코드를 브라우저가 자기가 이해하기 쉬운 방식으로 일종의 객체 모델로 변환하는 형태를 말함 말 그대로 문서 객체 모델 이라서 Document Object Model => 약자 DOM
- CSSOM이란? → css코드를 브라우저가 자기가 이해하기 쉬운 방식으로 일종의 객체 모델로 변환하는 형태를 말함 즉 CSS Object Model 이라고 함
- Render Tree 역할? → 만들어진 Dom 과 CSSOM 를 합쳐서 render Tree 라는 것을 만드는데 이 렌더 트리는 웹페이지의 청사진 또는 웹페이지의 설계도의 역할을 한다 왜냐하면 DOM에는 우리가 html로 구현한 요소들의 위치나 배치모양에 대한 정보가 있고 CSSOM에는 요소에 대한 우리가 css코드로 구현한 스타일에 대한 정보가 담겨져있다 그래서 이 두개를 합쳐서 만든 render tree는 이 두 정보를 모두 합쳐서 가지고 있을것이다.

- **업데이트는 어떻게?** → (JS가 DOM 수정 → 무슨 일?)
- reflow = 배치를 다시 계산하는 것 (Layout 단계 다시) — "그리는" 보다 "계산/배치"
- repaint = 픽셀을 다시 칠하는 것 (Painting 단계 다시)
- 왜 느린가? → js 가 변경되는 수만큼 dom이 변경되는데 critical renderingPath의 단계가 그 횟수만큼 진행되는데 reflow와 repaiting 은 오래 걸리는 작업이기 때문에

- **그래서 최적화는?** → (DOM 수정을 \_\_\_ 해야 함)
  Dom 수정을 최소화 해야하고 다양한 업데이트들이 있을때 모든 dom을 각자 수정하는것이 아니라 어떤 변수나 장소를 만들어 한번에 업데이트하는 과정을 거쳐야한다

- **Virtual DOM이란?** → (React가 어떻게 빠르게?)
  Virtual DOM 이라는것은 실제 브라우저가 렌더링하는 DOM 을 자바스크립트 객체로 카피해놓은것
  그래서 3가지의 업데이트가 동시에 일어났을떄 VirtualDOM 을 생성해 순서대로 객체에 반영하고 모두 반영된 그 Virtual DOM 을 실제 DOM에 반영시켜
  DOM의 수정을 최소화함

---

### ❓ 내 질문 & 답 (헷갈렸던 것)

- **Q. 명령형 프로그래밍 = 자바스크립트?**
  → A.아니다. 명령형은 "언어"가 아니라 "방식"이다.
  JS 로도 선언형 명령형 둘 다 쓸 수 있다.
  단 , 순수 JS로 화면(DOM)을 직접 조작하면 (document.querySelector로 하나하나 찾아서 바꾸는 식) 보통 명령형이 된다.
  React는 그 위에서 선언형으로 쓰게 해주는 것.
- **Q. html/css를 동시에 읽나?**
  → A. 병렬로 처리함 HTML은 HTML대로 -> DOM , CSS는 CSS대로 CSSOM 각각 따로 변환하다가 -> 나중에 합혀서 Render Tree 를 만든다
- **Q. JS가 DOM 수정하면 원본 HTML 파일이 변하나?**
  → A. HTML 원본은 변하지 않는다 DOM만 변한다 그래서 f5 새로고침을 하면 원래의 html로 돌아오는것

---

---

## 41강. Vite 프로젝트 만들기 + 환경 이해

> 💡 이 섹션은 "도구·환경(CS 배경)" — 완벽히 안 외워도 됨, 역할만!

### 📁 프로젝트 폴더/파일 구조

| 파일/폴더          | 역할                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| `node_modules`     | 설치된 라이브러리들이 실제로 쌓이는 창고 (자동 생성 , 안 건드림, 엄청 큼) |
| `public`           | 손 안 대고 그대로 복사되는 정적 파일 (favicon 등). 코드에서 import 안 함  |
| `src`              | 내가 실제로 작성하는 코드 폴더 (핵심 작업 공간)                           |
| `src/assets`       | 코드(컴포넌트)에서 import 해서 쓰는 자원(이미지 등) . 빌드 때 최적화됨    |
| `App.jsx`          | React 컴포넌트의 핵심 파일 (여기서 컴포넌트를 짬)                         |
| `index.html`       | 앱의 빈 뼈대 `<div id="root">` 하나. React 여기에 컴포넌트를 꽂음         |
| `package.json`     | 프로젝트가 쓰는 라이브러리 목록 + 명령어(scripts)                         |
| `eslint.config.js` | 코드 검사 (린트) 규칙 설정 파일                                           |
| `.gitignore`       | git (깃허브)에 "안 올릴" 파일 목록 (브라우저 X!)                          |

### 🍳 환경 기초 (요리 비유)

- **Node.js** = (JS를 어디서 실행? 화면 있음/없음?) = JS를 브라우저 밖(컴퓨터)에서 실행하는 환경(런타임). 화면(DOM)은 없음 => 파일/서버/터미널 담당 → (주방)
- **npm** = (무슨 도구? install하면?) = 라이브러리 설치·관리 도구. `npm install` 하면 라이브러리를 받아 `node_modules`에 깔림 => (식자재 쇼핑몰 + 배달부)
- **package.json** = (뭘 적은 목록?) = 필요한 라이브러리 목록 + 버전 + 명령어(scripts) 적은 명세서 => (쇼핑 목록 + 설명서)
- **node_modules** = (뭐가 쌓이는 폴더?) = install로 받은 라이브러리가 실제 쌓이는 창고 (목록 = package.json , 실물 = node_modules)
- **dependencies vs devDependencies** = (차이?) = dependencies는 **앱 실행에 꼭 필요**(react, react-dom) / devDependencies 는 **개발할 때만** 필요한 도구(eslint, vite — 완성품엔 불필요)

### 🏎️ 엔진 vs 환경 (더 깊이 판 것)

- **JS 엔진(V8)** = (하는 일? 어디 들어있음?) = JS 코드를 한 줄 씩 실행하는 핵심 "부품". 브라우저·Node 둘 다 **안에 들어있음** (엔진=동력)
- **브라우저** = (엔진 + **화면(렌더링: DOM→layout→painting)** → 화면 보여줌)
- **Node.js** = (엔진(V8) + **파일/서버/터미널**, 화면 **없음**)
- JS 실행하는 두 곳:
  - 브라우저 콘솔(F12) → 화면(DOM) 있음
  - 터미널 `node` → 화면 없음, 텍스트 출력
    ※ 브라우저/Node = 엔진을 "품은 환경"(차), 엔진(V8) = 그 안의 "동력"

### 🏃 런타임(runtime) 이란?

> **런타임 = "JS가 실행되는 환경" + 그 환경이 주는 능력**
> (run = 실행 / time = 때 → "JS가 실제로 돌아가는 곳")

- 같은 JS라도 **어느 런타임에서 도느냐**에 따라 할 수 있는 게 다름!

| 런타임       | 엔진 | 능력                                       | 화면(DOM)             |
| ------------ | ---- | ------------------------------------------ | --------------------- |
| **브라우저** | V8   | 화면 그리기(DOM→layout→painting), fetch 등 | ✅ 있음 → 화면 출력   |
| **Node.js**  | V8   | 파일 읽기/쓰기, 서버, 터미널               | ❌ 없음 → 텍스트 출력 |

- **핵심 구분:**
  - 엔진(V8) = JS 실행하는 "동력 부품" (둘 다 안에 들어있음)
  - 런타임(브라우저/Node) = 엔진을 "품은 환경"(차) + 자기만의 능력
- 그래서:
  - 브라우저 런타임 → `document.querySelector` 같은 DOM 코드 가능 (화면 있음)
  - Node 런타임 → DOM 코드 X (화면 없음), 대신 파일·서버 작업

- **요약:** 런타임 = "JS가 어디서, 어떤 능력으로 실행되는가" 그 환경 전체

### ❓ 내 질문 & 답

- **Q. layout/painting은 누가 해? 엔진?**
  → A.엔진 아님! **[브라우저]가 함.** 엔진은 JS 실행만 . Node엔 화면이 없어서 layout/painting 안 함
- **Q. 엔진 종류가 또 뭐가 있어?**
  → A.**V8**(크롬·Node), **SpiderMonkey**(파이어폭스), **JavaScriptCore**(사파리). ※Node.js는 엔진이 아니라 "런타임".
- **Q. .gitignore는 브라우저에 안 띄울 것?**
  → A. **아니다!** git/깃허브에 "안 올릴" 파일 목록. 브라우저랑 무관. 예: `node_modules`(크고 재설치 가능), 비밀키.
- **Q. assets vs public 차이?**
  → A. **둘 다 정적!** `assets`=코드에서 **import해서 씀**(빌드때 최적화) / `public`=**그대로 복사**(import 안 함, 경로로 접근, favicon 등).

---

## 42강. React App 구동원리

### npm run dev 하면 무슨 일?

- `npm run dev` = 앱에 내장된 "웹서버"를 켜라! 는 명령
- 켜지면 http://localhost:5173/ 주소가 뜸 = 그 웹서버에 접속하는 주소
- 끄기 전까지 5173에서 계속 "대기"

### 주소 뜯어보기

- **localhost** = 내 컴퓨터 (내 컴퓨터 주소)
  - 내 컴퓨터에서만 접속됨. 다른 컴퓨터로는 이 주소로 못 들어옴
- **:5173 (포트 번호)** = 한 컴퓨터 안에서 여러 서버를 구분하는 번호
  - 예: React 서버=5173, PHP 서버=3344 → 동시에 떠도 포트로 구분

### 웹서버가 뭐냐?

- **웹서버 = 요청을 받으면 웹 파일(html/css/js)을 돌려주는(배달하는) 프로그램**
- 비유(음식 배달): 브라우저=손님 / 웹서버=배달부 / 파일=음식
- ⚠️ 웹서버는 "배달만" 함! 화면 그리기·JS 실행 X (그건 브라우저가!)

### 진짜 순서 (헷갈리기 쉬움!)

- ① 브라우저: "localhost:5173 파일 줘!" (요청, 빈손)
- ② 웹서버: 파일(html/css/js) 배달 (배달만!)
- ③ 브라우저: 받아서 → 읽고 → JS 실행 → painting(화면 그림)
- ※ 브라우저가 "먼저 요청"(빈손) → 받고 → "그제서야" 읽고 그림
  (먼저 읽고 → 달라고 가 아님! 받을 게 없으니 읽을 수도 없음)

### 웹서버 ≠ React (헷갈렸던 점)

- 웹서버 = 파일을 "나르는" 배달부 (프로그램)
- React = "날라지는" 음식 = js 파일 "안에 든 재료"
  - index.html=빈 접시 / js=메인요리(React+내 컴포넌트) / css=양념
- → React는 별도 음식이 아니라 파일(js) 속 재료. 웹서버는 그걸 나르는 쪽.

### 실제 웹서버 종류 (이름만!)

- 개발용: Vite 개발서버(지금 쓰는 거), Live Server
- 배포용: Nginx, Apache
- Node로 직접: Express

### createRoot

- createRoot(document.getElementById('root')) = 인수로 받은 HTML 요소를 React의 루트(뿌리)로 만듦
- 그 root에 .render(<App/>) 로 App을 그려넣음

### 내 질문 & 답

- Q. 웹서버가 화면을 그려줘?
  - A. 아님! 웹서버는 파일 "배달"만. 화면 그리기·JS 실행은 [브라우저]가.
- Q. 웹서버 = React 자체?
  - A. 아님. 웹서버=배달부 / React=배달되는 파일(js) 속 재료.
- Q. "웹서버"랑 "API 서버"는 같아?
  - A. 둘 다 "서버(요청에 응답)"인데 주는 게 다름. 웹서버=웹 파일 / API 서버=데이터(JSON). (비동기 때 다시!)

## 44강. React 컴포넌트

### 컴포넌트란?

- **JSX(HTML)를 `return`하는 JavaScript 함수** = 컴포넌트 (= 함수 컴포넌트)
- `return` 꼭! 없으면 undefined 돌려줘서 화면 안 뜸 (← JS return 원리, 직접 당해봄 😅)

### 규칙

- **이름 첫 글자 = 무조건 대문자!** (App, Header) → "나 컴포넌트야!" 표시
- `<Header />` 처럼 **HTML 태그처럼 배치** = 조립
- **부모/자식 계층**: App(부모) 안에 Header/Main/Footer(자식)

### 화면 그려지는 흐름

- index.html: `<div id="root">` (빈 그릇) + `<script src="main.jsx">` 실행
- main.jsx: `createRoot(root).render(<App/>)` → root에 App을 그려넣음(render)
- App.jsx: `<Header/><Main/><Footer/>` 반환 → 실제 화면 내용
- ※ index.html이 App을 "return"하는 게 아니라, main.jsx가 App을 root에 "render"함!

### 컴포넌트 vs main.jsx

|             | App / Header            | main.jsx                                |
| ----------- | ----------------------- | --------------------------------------- |
| 정체        | **컴포넌트**            | **시작점(entry) 스크립트 (그냥 JS)**    |
| JSX return? | O                       | X (render 호출만)                       |
| 재사용?     | O (`<Header/>` 여러 번) | X (한 번만 실행)                        |
| 역할        | 화면 내용               | App을 root에 꽂는 다리 ("앱 켜는 버튼") |

### 컴포넌트 파일 = export default

- "한 파일 = 한 컴포넌트(대표)" → `export default`
- 그래서 `import Header from "..."` 중괄호 없이 (default라서)
- (named였으면 `import { Header }` 중괄호 있었을 것)

### 복습: 함수 만드는 3가지 모양 (JS 세션 4~5)

\`\`\`js
// 1. 선언식 — 이름 가진 함수를 직접 선언
function add(a, b) { return a + b; }

// 2. 함수 표현식 — 함수도 "값"이라 변수에 담음
const add = function(a, b) { return a + b; };

// 3. 화살표 함수 — function 빼고 => 붙임
const add = (a, b) => { return a + b; };

// 3-1. 한 줄 return이면 {} 와 return 생략 (암묵적 반환)
const add = (a, b) => a + b;

// 3-2. 매개변수 1개면 괄호 () 도 생략 가능
const double = c => c _ 2; // 주의: 2c (X) -> c _ 2 (O), JS는 곱셈 \* 꼭!
\`\`\`
→ 1·2·3 다 같은 함수, 모양만 다름.

### 컴포넌트도 선언식/화살표 둘 다 OK

\`\`\`jsx
// 선언식 컴포넌트
function Article() { return <h1>안녕</h1>; }

// 화살표 컴포넌트 (같은 거!)
const Article = () => { return <h1>안녕</h1>; };

// 화살표 + 암묵적 반환 (한 줄)
const Article = () => <h1>안녕</h1>;

// JSX 여러 줄이면 소괄호 ()로 감싸기
const Article = () => (

  <div>
    <h1>안녕</h1>
    <p>반가워</p>
  </div>
);
\`\`\`

### 내 질문 & 답

- Q. 선언식 = 이름 있고, 화살표 = 이름 없는 함수?
  - A. 아님! 선언식=함수에 이름 직접 / 화살표=함수(익명)를 변수에 담아 그 이름으로 부름. 둘 다 같은 컴포넌트.
- Q. main.jsx도 컴포넌트?
  - A. 아님. 앱을 켜는 "시작 스크립트(그냥 JS)". render() 호출만, 한 번 실행.
- Q. index.html이 main.jsx를 return?
  - A. 아님. index.html은 script로 main.jsx 실행 → main.jsx가 App을 root에 render. (return X, render O)

## 45강. JSX

### JSX란?

- JSX = JavaScript 안에서 HTML처럼 쓰는 문법 (JavaScript + XML, 확장된 JS 문법)
- 원래 JS는 HTML 태그를 return 못함(문법 오류) → JSX 덕에 가능해짐
- JSX는 진짜 HTML이 아니라 JS! 브라우저가 못 읽어서 Vite가 "일반 JS"로 변환
  (HTML 아님! HTML/DOM은 그 JS가 실행될 때 React가 만듦)
- JSX / 컴포넌트 / .jsx 차이:
  - JSX = JS 안에 HTML처럼 쓰는 "문법" (예: <h1>안녕</h1>)
  - 컴포넌트 = JSX를 return하는 "함수" (함수 컴포넌트)
  - .jsx = JSX 코드가 들어있는 "파일"(확장자)

### ⭐ 핵심: 표현식(expression) vs 문(statement)

- 표현식 = "값이 되는" 것 → 예: 5, number+5, (a ? b : c), "짝수", 변수, state
- 문(statement) = "동작을 시키는" 것(값 아님) → 예: if(){}, for(){}, function 선언, const x=5
- JSX 중괄호 {} 엔 "표현식"만 들어감!
- 판별법: "const x = \_\_\_ " 에 넣을 수 있으면 표현식

### JSX {} 통과 = 관문 2개

- 관문1) 표현식인가? (= {}에 넣을 수 있나) → if/for는 "문"이라 탈락
- 관문2) 렌더링되는 "타입"인가? (= 화면에 보이나)
  - 보임: 숫자, 문자열, 배열(펼쳐서), JSX
  - 안 보임(에러X): boolean, null, undefined
  - 에러!: 객체 {a:1}, 함수 자체 myFunc

### JSX 규칙 4가지

1. 중괄호 {} 안엔 표현식만 — if/for 쓰면 "문"이라 오류
2. 렌더링 되는 것 / 안 되는 것:
   - O: 숫자·문자열·배열
   - 안 보임: boolean·null·undefined
   - 에러: 객체
   - 객체는 점표기법으로 값 꺼내기: {obj.a}
3. 모든 태그는 닫아야 함 (<img> X → <img /> O)
4. 최상위 태그는 반드시 하나 (여러 개면 <>...</> Fragment로 감싸기)

### 삼항연산자 = 조건부 렌더링

- 조건 ? A : B → true면 A(?뒤), false면 B(:뒤)
- 삼항은 boolean이 아니라 "결과값(A/B)"을 내뱉음 → 그래서 표현식 → {}에 OK
- 예: {user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}
- if는 왜 JSX {} 안에 못 써? → if는 "문(statement)"이라서! → return 밖(위)에서 쓰거나, 삼항으로 변환
- if 버전 예시 (return 밖에서):
  function Main() {
  if (user.isLogin) return <div>로그아웃</div>;
  else return <div>로그인</div>;
  }

### 스타일 적용

- className="logout" → 별도 CSS 파일의 클래스 연결 (CSS는 import "./Main.css")
- 인라인 스타일: style={{ color: "red" }} → 중괄호 2번!
  - 바깥 {} = JSX 표현식 슬롯 (JS 값 넣는 자리)
  - 안쪽 {} = 객체 ({ color:"red" } key:value)
  - 왜? style은 "스타일 객체"를 받으니까 → 슬롯{} 안에 객체{} → 두 겹

---

### 🔍 더 깊이 판 것 (추가 질문)

- Q. Vite가 변환해주는 게 HTML이야?
  → A. 아니! JSX → "일반 JS"로 변환 (HTML 아님). HTML(DOM)은 그 JS가 브라우저에서 실행될 때 React가 만듦.
- Q. 배열 {[1,2,3]} 누가 자동으로 "123"으로 펼쳐줘?
  → A. React가! React는 "배열은 요소를 하나씩 펼쳐서 렌더링"하게 만들어짐. → 나중에 목록을 arr.map()으로 만드는 원리가 바로 이것!
- Q. "JSX 밖에 쓰라" = return 밖에 쓰라는 거야?
  → A. 응! return의 JSX( ) 바깥 = return 위쪽. if는 거기서 쓰고, 삼항은 JSX 안 {}에서.
- Q. style 중괄호 2번이 왜? (프로젝트 vanilla-extract랑 연결!)
  → A. 안쪽 {}는 둘 다 "객체"(공통). 근데 바깥이 다름:
  - React 인라인: style={{}} → 바깥 {}=JSX 슬롯
  - vanilla-extract(내 프로젝트): style({}) → 바깥 ()=함수 호출
    둘 다 "스타일을 객체로 전달". 그동안 외웠던 style({})가 이제 이해됨!

---

### ❓ 내 질문 & 답 (내가 헷갈렸던 사고 패턴)

- Q. if도 true/false 내뱉으니 값 아냐? 왜 {}에 못 넣어?
  → A. if "안의 조건"은 값(boolean)이지만, if(){} "구조 자체"는 값이 아니라 "동작(문)". 그래서 {}에 못 넣음.
- Q. 삼항연산자는 boolean을 내뱉어서 값이야?
  → A. 아님! boolean이 아니라 "결과(A 또는 B)"를 내뱉음. 조건만 boolean, 결과는 내가 넣은 값(문자열/JSX).
- Q. number + 10이 "값으로 평가된다"는 게 뭐야?
  → A. 계산되면 하나의 숫자가 됨. number=5면 5+10=15(값). 그래서 {}에 OK.
- Q. boolean 안 된다더니 삼항엔 boolean? 모순 아냐?
  → A. 다른 얘기. 삼항 "조건"으로 boolean 쓰는 건 OK / 렌더링되는 건 결과(문자열). boolean을 "직접" 렌더링만 안 됨.
- Q. "짝수/홀수"도 숫자처럼 렌더링? 다 숫자여야 해?
  → A. 아님. 문자열("짝수")도 숫자(5)도 둘 다 렌더링 가능. (boolean/null/undefined만 안 보임)
- Q. 함수도 값 아냐? 왜 {}에 넣어도 안 떠?
  → A. 함수는 값(표현식)이라 {}에 넣을 순 있지만, 렌더링 타입(숫자/문자/배열/JSX)이 아니라서 에러. {myFunc}=에러 / {myFunc()}=결과 렌더링.
- Q. state가 if/for/function 같은 거야?
  → A. 아님! 그건 "문(statement)". state(상태)랑 단어만 비슷. state(useState)는 값이라 {}에 잘 들어감 ({count}).
- Q. 배열도 [a,b,c] 하면 에러 떠?
  → A. 아님! 배열은 React가 펼쳐서 렌더링 ({[1,2,3]}→"123"). 객체만 에러. (배열 안에 객체 있으면 그 객체가 에러)

## 46강. Props

### Props란?

- Props = 재사용 함수(=함수 컴포넌트)에게 값을 전달하는 방법 (Properties 줄임말)
- 방향: 부모 컴포넌트 → 자식 컴포넌트 값 전달 (마치 함수에 인수 넘기듯! ← 3번 함수 인수)
- 왜 좋음? 같은 컴포넌트(함수) 만들어두고, props(인수)만 바꿔 다양한 UI 재사용

### 전달하기 (부모에서)

- 문자열: text="메일" (따옴표) 또는 text={"메일"} (중괄호) 둘 다 OK
- 나머지(숫자·변수·객체): 무조건 {} → count={5}, color={myColor}
- ※ 여기 {} = JSX 표현식 슬롯! (45강 {count}, style={{}} 의 그 중괄호) prop에 JS 값 넣는 구멍
- 여러 개 묶어 한 번에: <Button {...buttonProps} /> ← spread(12번, 펼치기!)

### 받기 (자식에서)

- props는 "객체"로 묶여서 옴 → props.text, props.color (점표기 6번)
- React가 묶는 것: 부모가 넘긴 값 + children → 하나의 props 객체
  예) <Button text="메일">안녕</Button> → props = { text:"메일", children:"안녕" }
- 구조분해로 받기 (10번): const Button = ({ text, color }) => {}

### 기본값 = fallback

- const Button = ({ color = "black" }) => {}
  - color 안 주면 → "black" / color="red" 주면 → red (준 값)
- fallback = "없을 때 대신 쓰는 대비책" (기본값은 fallback의 한 종류)

### ⭐ fallback 종류 비교 (언제 발동하나가 다름!)

- 먼저 falsy = false, 0, "", null, undefined, NaN (이 6개. 나머지는 truthy)
- a || b → a가 falsy면 b (0, "" 도 b로 바뀜 ⚠️)
- a ?? b → a가 null/undefined일 때만 b (0, "" 는 a 그대로 ✅)
- a?.b → a가 null/undefined면 멈춤 (에러 방지, 대체값은 아님 / 11번)
- ({x=b}) → x가 undefined일 때 b (구조분해 기본값)
- 핵심: "0이나 빈 문자열을 살리고 싶으면 ?? 써라" (|| 는 0,""도 버림)
  예) count=0 → count||10 은 10(버려짐) / count??10 은 0(유지)

### 안전하게 props 쓰기

- props.color.toUpperCase() 위험! → color 안 오면 undefined.toUpperCase() → 에러
- 해결: ① 옵셔널체이닝 props.color?.toUpperCase() (11번) ② 구조분해 기본값 color="black"
- 강의 추천 = 구조분해 기본값

### children

- 태그 사이 내용은 자동으로 props.children 으로 전달
  예) <Button>안녕</Button> → props.children = "안녕"
- ※ 여는/닫는 태그 "사이"의 모든 것 = children (텍스트·HTML태그·컴포넌트 다!)
  <Button><Icon /></Button> → children = <Icon />
  <Button>안녕 <b>!</b></Button> → children = ["안녕 ", <b>!</b>] (섞이면 배열)
- children = React가 정한 "고정" 이름 (못 바꿈) / props = 내 매개변수 이름 (자유)

---

### ❓ 내 질문 & 답

- Q. props = 함수에 인수 바꿔 넣는 거랑 같아?
  → A. 맞음! props = 함수 인수. 컴포넌트(함수) 만들어두고 props(인수) 바꿔 다양한 UI.
- Q. text={"메일"}의 중괄호 = 변수 담는 그 표현식 중괄호야?
  → A. 응! 45강 JSX 표현식 슬롯({count}, style={{}})이랑 같음. prop에 JS 값 넣는 구멍.
- Q. color={"red"}의 color는 style 안 color랑 같아?
  → A. 다름! prop 이름은 내가 자유롭게 지은 것(myColor도 됨) / style 안 color는 CSS 정해진 속성. 이름만 우연히 같을 뿐.
- Q. children은 닫는 태그 안 "텍스트"도 인식해?
  → A. 응! 여는/닫는 태그 사이 모든 것(텍스트·태그·컴포넌트) = children. 섞이면 배열.
- Q. children 매개변수 이름 무조건 children?
  → A. 응! React 고정 이름. 태그 사이 내용은 무조건 props.children.
- Q. 매개변수 props는 무조건 props?
  → A. 아님! 그냥 매개변수 이름, 자유. 관례로 props. (children=고정 / props=자유)
- Q. console에 객체 3개 뜨는데 각각 전달되는 거지?
  → A. 응! Button 3번 호출 = 각자 자기 props 객체. 한 번에 묶음 아니라 각각.
- Q. 왜 객체로 전달돼?
  → A. React가 부모가 넘긴 props들 + children을 하나의 객체로 묶어서 줌 → props.xx 점표기로 꺼냄.
- Q. fallback이 뭐야?
  → A. "없을 때 대신 쓰는 대비책". 기본값·??·||·옵셔널체이닝·대체화면 다 fallback. 기본값은 그 한 종류.
- Q. ||, ??, ?. 차이는?
  → A. || = falsy면 발동(0,""도) / ?? = null·undefined만 / ?. = 에러 방지. "0,'' 살리려면 ??".
- Q. {...buttonProps}는 spread야 rest야?
  → A. spread(펼치기)! 객체를 펼쳐서 각 prop으로 뿌림. (12번)

---

## ✅ 46강 Props 복습 체크리스트

- [ ] Props = 부모→자식 값 전달 (함수 인수처럼! 3번)
- [ ] 전달: 문자열은 "" or {}, 나머지는 {} 필수 ({} = JSX 표현식 슬롯)
- [ ] props는 "객체"로 묶여 옴 → props.text (6번)
- [ ] 받기: 구조분해 ({ text, color }) (10번)
- [ ] 기본값(fallback): ({ color="black" })
- [ ] fallback 종류: || (falsy) / ?? (null·undefined만) / ?. (에러방지) — "0,'' 살리려면 ??"
- [ ] 안전하게: 옵셔널체이닝 ?.(11번) or 기본값
- [ ] 여러 props: {...obj} = spread(12번)
- [ ] children = 태그 사이 모든 것(텍스트·태그·컴포넌트), React 고정 이름
- [ ] children=고정 / props=자유

## 🔁 구조분해(10번) 재복습 ↔ Props 연결

### 1. 객체 구조분해 기본 (왼쪽/오른쪽 + 거울)

- 긴 버전엔 반복 2개: (뭐가 반복? `user,` 와 key가 양쪽으로)
  const name = user.name;
  const age = user.age;
- 구조분해로 줄임:
  const { name, age } = user;
  - 오른쪽 (= user) = (뭘 의미? "어느 상자(객체)를 열까")
  - 왼쪽 ({ name, age }) = (뭘 의미? "그 상자에서 꺼낼 key들")
  - 🪞 거울: 오른쪽이 {}라서 → 왼쪽도 {} 모양 따라함
  - user. 사라진 이유: → user가 상자를 한 번 정해줘서 반복 불필요

### 2. 함수가 "객체를 받을 때" (매개변수 구조분해)

- 긴 버전: function greet(user) { const name = user.name; }
- 구조분해 버전: function greet({ name }) { ... }
  → ({ name }) = (뭘 한 거? "매개변수로 받은 객체를 받자마자 구조분해")
- 객체에 그 key 없으면? → undefined
  greet({ age: 7 }) → name 없음 → undefined → "undefined 안녕"
- 그래서 기본값(fallback): function greet({ name = "익명" }) → 안오면 "익명"

### 3. ⭐ Props 연결 (props는 객체!)

- <Button text="메일" color="red" />
  → React가 무엇으로 묶음? → { text:"메일", color:"red" } (= "오른쪽 상자")
- 자식에서 받기 3단계:
  ① 풀어쓰기
  const Button = (props) => {
  const text = props.text; // props. 반복
  const color = props.color;
  }
  ② 구조분해로 줄이기 (오른쪽 = props)
  const Button = (props) => {
  const { text, color } = props;
  }
  ③ 매개변수로 끌어올리기 (최종)
  const Button = ({text , color}) => {}

### 4. 핵심 정리

- props = React가 부모의 <Button/> 를 "객체"로 묶어 자식에 넘김 (= 오른쪽 상자)
- ({ text, color }) = 그 props 객체를 매개변수에서 바로 구조분해 (거울 {})
  = (props) => { const {text,color} = props } 의 줄임
- 오른쪽 상자(props)는 매개변수에 안 보이지만 = "호출 시 들어오는 인자"
- 기본값: ({ color = "black" }) → 안 오면 "fallback" (undefined 방지)

### ✅ 내가 약했던 것 → 이제 잡음!

- [ ] 구조분해 왼쪽/오른쪽 해석 (오른쪽= 어느 상자, 왼쪽= 꺼낼 key, {}는 거울)
- [ ] 매개변수에서 바로 구조분해 = 받은 객체를 받자마자 꺼내는 것
- [ ] props는 객체 → ({text,color})로 받기 = (props) => {const {text , color} = props} 의 줄임

## 47강. 이벤트 핸들링

### 이벤트 & 핸들링이란?

- 이벤트 = (웹에서 일어나는 "행동/사건" 예: 클릭 , 입력 , 마우스이동 , 스크롤 , 키보드 )
- 이벤트 핸들링 = (이벤트 발생 시 그걸 "처리" 하는 것)
- 누가 처리? → [브라우저] 가 이벤트 감지→ [React] 가 등록된 핸들러 호출 → 우리 핸들러 실행

### 📚 함수 만드는 용어 4개 (서로 다른 축!)

- 선언식 = function 이름(){} (직접 선언 , 이름 필수 , 변수 X )
- 표현식 = const x = 함수 (함수를 "값"으로 변수에 담기 / 세션4 )
- 기명 = 이름 있음 / 익명 = 이름 없음 (function(){}도 () => {} 도 둘 다 익명)
- 화살표 = "표현식"에서 function 빼고 => (항상 표현식 형태 ! 선언식엔 화살표 없음)
- ※ 선언식 vs 표현식 구분 = "직접 선언 vs 변수에 담기" (function 키워드 유무 아님! 표현식에도 function 씀)
- ※ const add = () => {} 는 (어떤 축 ? : 표현식 + 익명함수 + 화살표 함수)

### 핸들러 함수 작성법

- 어떤 함수든 OK (화살표/선언식/익명)
- 핸들러 길면: const onClickButton = () => {...} // 표현식 + 화살표
  : function onClickButton(){...}
- → <button onClick={onClickButton}>

### ⭐ 함수 vs 함수() — 괄호 = 실행 버튼! (세션 2)

- onClick={onClickButton} → 즉시 실행? (X) / 언제? : 함수 "자체" 전달. 즉시 실행 X . "클릭할 때" 실행
- onClick={onClickButton()} → 즉시 실행? (O) / 언제? : 함수 "호출" 렌더 순간 즉시 실행 (클릭 무관)
- 즉시 실행 여부 = 오직 괄호() 유무 (인수·return 무관)
- 비유 : 괄호 없음 = 레시피 종이 건넴(클릭할때 실행) / 괄호 있음 = 실행버튼 누름 (렌더 때 즉시)

### setState는 핸들러에 넣어도 정상 !

- onClick={() => setCount(count+1)} → 정상 ! 클릭하면 setCount 실행
- 무한루프 원인 = 무한루프는 setState 탓이 아니라 , 괄호()로 "렌더 중 즉시 실행"한 탓
- 해결 = 화살표로 감싸 함수 "자체" 전달 : onClick{() => {setCount(...)}}

### 이벤트 종류

- onClick= 클릭 / onMouseEnter= (마우스 진입 = 호버) / onMouseLeave= 나갈 때 / onChange= 입력한 값이 바뀔 떄 / onSubmit (폼 제출)

### 합성 이벤트 (SyntheticEvent)

- React가 브라우저마다 다른 이벤트 객체를 "하나로 통일"해서 줌 → 호환성 해결
- 핸들러 (e)=>{} 의 e = 합성 이벤트 (나중에 입력값 다룰 때)

---

### ➕ 추가로 판 것

- 핸들러 ≠ 합성이벤트!
  - 핸들러 = 우리가 만든 "함수" (onClickButton)
  - 합성이벤트 = 그 함수에 들어가는 "인자(e)" = 이벤트 정보 객체
  - React가 핸들러(함수)를 호출하면서 합성이벤트(객체)를 e로 넘김: (e) => {...}
  - 핸들러는 메서드 아니라 그냥 함수

- 표현식엔 익명·기명 둘 다 가능
  - const x = function() {} // 익명 표현식
  - const x = () => {} // 화살표(익명)
  - const x = function add() {} // 기명 표현식 (됨! 단 add는 함수 내부에서만, 드묾)

- ⭐ 무한루프는 "클릭"이 아니라 "렌더할 때마다"!
  - onClick={setCount(count+1)} → 클릭 안 해도, 화면 렌더되는 순간 setCount 즉시 실행
    → state 변경 → 또 렌더 → 또 setCount 실행 → ♾️ (클릭 없이 처음부터 터짐)
  - 트리거 = 클릭 X, "렌더 자체" O
  - 비유: 버튼이 눌린 채 고정돼서 계속 작동 (괄호 = 렌더마다 자동으로 눌림)

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. 선언식/표현식/화살표/익명 차이?
  → A. 선언식 = function 이름() - 직접 / 표현식 = 변수에 담기 / 기명·익명=이름 유무 / 화살표 = 표현식에서 =>. 서로 다른 축 !
  const add = () => {} 는 표현식+익명+화살표함수
- Q. 화살표는 선언식에서 줄인 거야?
  → A. 아님 ! "표현식"에서 줄인것. 선언식은 화살표 못 만듦(만들면 표현식 됨)
- Q. 선언식 vs 표현식 구분 = function 키워드 유무?
  → A. 아님 ! 둘다 function 씀 . 구분 = 직접 선언 vs 변수에 담기.
- Q. 함수()로 전달하면?
  → A.괄호 = 실행버튼 ! 렌더 순간 즉시 실행(클릭 무관). setState면 무한루프
- Q. onClick={함수}는 즉시 실행돼?
  → A. 아님 ! 함수 자체만 전달 , 클릭 때만 실행
- Q. 즉시 실행 = 인수/return 때문?
  → A. 아님 ! 오직 괄호() 의 유무
- Q. setState 핸들러에 넣으면 안 돼?
  → A. 넣어도 됨! 정상·권장. 무한루프는 괄호() 탓.
- Q. onMouseEnter는 호버?
  → A. 응 ! 마우스 진입 순간 . (나갈때는 onMouseLeave)

---

## ✅ 47강 체크리스트

- [ ] 이벤트=웹 행동 / 핸들링=처리 / 흐름: 브라우저→React→핸들러
- [ ] 함수 용어 4축: 선언식·표현식·기명/익명·화살표
- [ ] 선언식 vs 표현식 = 직접 선언 vs 변수에 담기
- [ ] 화살표 = 표현식에서 나옴
- [ ] ⭐ onClick={함수}(클릭 때) vs onClick={함수()}(렌더 때 즉시)
- [ ] 즉시 실행 = 괄호() 유무뿐
- [ ] setState 핸들러 OK / 무한루프는 괄호() 탓
- [ ] onMouseEnter=호버 / 합성이벤트=통일된 이벤트객체

## 48강. State (상태)

### State란?

- state = 컴포넌트의 "현재 상태(모양/형편)" + 변할 수 있는 동적 값
- 컴포넌트는 state 값에 따라 다른 UI 렌더링
- state 바뀌면 → React가 감지 → 자동 리렌더링
- 한 컴포넌트에 state 여러 개? : 한 컴포넌트에 여러 state 가능 (isLighton , isBroken ...)

### ⭐ 왜 일반 변수 말고 state? (세션 11 복습)

- let light = "OFF" 안 되는 이유 2개:
  ① React는 일반 변수를 안 쳐다봄 → 바꿔도 리렌더링 안 함 → 화면 그대로
  ② 리렌더돼도 let light = "OFF" 가 다시 실행됨 → "OFF"로 리셋
- state는: setLight로 바꾸면 → ① React가 리렌더 ② 주머니에 저장돼 유지

### 🖐️ 실험: 일반 변수로 해보면 (콘솔 O, 화면 X)

    let light = "OFF";
    const onClick = () => {
      light = light === "ON" ? "OFF" : "ON";
      console.log("light는 지금:", light);
    };
    // <h1>전구: {light}</h1>

- 결과: 클릭하면 콘솔의 light는 OFF <-> ON "바뀜" (값은 안변함) / 화면 : "전구 : OFF"는 "그대로"
- 이유: 변수값은 바뀌는데 React가 리렌더를 안해서 화면 반영 X (+ 리렌더 되도 리셋)
- → 그래서 state(useState)가 필요!

### useState

- const [light, setLight] = useState("OFF");
  - useState = 함수, 무엇을 돌려줌? → [현재값, 바꾸는 함수] 배열을 돌려줌
  - 배열 구조분해(10번)로 받음 → light= 현재값, setLight= setter
  - "OFF" = 초기값 (첫 렌더 한 번만 ! 안줘도 됨 -> undefined 로 시작)

### setLight(setter)의 두 가지 일

- ① state 값 바꾸기 ② React에게 "다시 그려!" 알리기

### 🌉 state = React \_\_\_에 저장 (클로저 원리, 13번)

- React가 state를 "주머니(slot)"에 저장 → 리렌더 때마다 꺼내줌
- 그래서 일반 변수는 매 렌더 리셋, / state는 유지
- 초기값은 첫 렌더만, 이후엔 주머니의 저장값 사용

### getter / setter

- getter = 값 읽기 / setter = 값 설정(쓰기)
- useState 두 번째(setLight) = state를 "설정/변경"하는 함수 = setter

### 🎯 전구 토글 로직 (직접 짜보기!)

    import { useState } from "react";
    function App() {
      const [light, setLight] = useState("OFF");
      return (
        <div>
          <h1>전구: {light}</h1>
          <button onClick={() => setLight( light === "ON" ? "OFF" : "ON")}>
            {light === "ON" ? "끄기" : "켜기"}
          </button>
        </div>
      );
    }

- useSate + 배열구조분해(10번) / onClick 함수 자체(47강 , 괄호 없이) / 삼항(45강) / {light} JSX(45강)
- 일반 변수 버전(콘솔만 바뀜) 과 달리 -> 화면이 진짜 ON <-> OFF 바뀜!

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. 왜 let light로 바꾸면 화면이 안 바뀌어?
  → A. ① React 가 일반 변수를 안 쳐다봄 (리렌더 X) ② 리렌더돼도 let이 다시 실행되 리셋 (콘솔엔 값 바뀌어도 화면 X ) . state 는 setLight로 리렌더 + 주머니 저장
- Q. 리렌더 = 뭐야?
  → A. 컴포넌트 함수를 처음부터 재실행. 그래서 let 변수는 리셋 . state는 주머니에서 유지
- Q. useState 초기값 안 주면 안 돼?
  → A. 안 줘도 됨 ! 첫 값 undefined로 시작(에러 X ) 초기값은 첫 렌더 한 번만 , 이후엔 주머니 저장값
- Q. setter가 뭐야? DOM에서 본 거랑 같아?
  → A. setter = 값 설정(쓰기) useState 두 번째 (setLight) = state 설정 함수 = setter . DOM textContent = 도 쓰기 = setter 같은 개념 (값 설정)
- Q. 클로저랑 state 관계?
  → A. React가 state를 주머니에 저장하는 게 클로저 원리 13번과 같음 그래서 리렌더 때도 값 유지

---

## ✅ 48강 체크리스트

- [ ] state = 컴포넌트 현재 상태 + 동적 값
- [ ] state 바뀌면 React 자동 리렌더링
- [ ] 일반 변수 X 이유 2개
- [ ] 실험: 일반 변수 → 콘솔 바뀜 / 화면 안 바뀜
- [ ] const [light, setLight] = useState(...) = 배열 구조분해
- [ ] setLight = ①값 바꾸기 ②React에 알리기
- [ ] 초기값 = 첫 렌더만 / 이후 주머니 저장값
- [ ] state 유지 = React 주머니(클로저 원리)
- [ ] setter = 값 설정 함수
- [ ] 토글 로직: onClick 함수자체 + 삼항 + {light}

## 49강. State를 Props로 전달하기 (+ 컴포넌트 분리)

### State를 props로 전달 (구조 A)

- 부모(App)가 가진 state를 자식에게 props로 내려줌
  function App() {
  const [light, setLight] = useState("OFF");
  return <Bulb light={light} setLight={setLight} />;
  }
- 자식(Bulb)은 props 로 받아 UI 렌더 → 부모 state 바뀌면 자식도 UI도 바뀜

### ⭐ 리렌더링 발생 3가지 원인

1. 자신이 관리하는 state 값이 변경될 때
2. 자신이 받는 props 값이 변경될 때
3. 부모 컴포넌트가 리렌더되면 → 자식 컴포넌트도 리렌더된다

### 문제: 관련 없는 state를 한 곳(App)에 두면

- count 클릭 → App state가 변경 → App 리렌더 → 자식(Bulb) 전부 리렌더
  → light 상관없는데 Bulb도 무의미하게 리렌더 → 성능 저하 !

### 해결: 컴포넌트 분리 (구조 B - 지금 내 코드!)

    function App() {
      return (<><Bulb /><Counter /></>);
    }

- count 눌러도 Counter만 리렌더 → App 안 리렌더 → Bulb 안 건드림!
- 원칙: 관련 없는 state는 몰아넣지 말고 컴포넌트로 분리

### ⭐ 부모-자식 관계 ≠ 모듈화 (파일 분리)

- 부모-자식 = "누가 자식<Bulb/>를 렌더하나 로 정해짐" (App이 <Bulb/> 렌더 → App= 부모 컴포넌트 , Bulb = 자식 컴포넌트 )
- ① Bulb를 App.jsx "안에" 정의 vs ② 별도 파일 import → 결과 (같음)
  이유: ① Bulb를 App.jsx "안에" 정의하고 App이 <Bulb/> 렌더
  ② Bulb를 별도 파일로 만들어 import하고 App이 <Bulb/> 렌더
- 모듈화(파일 분리) = 코드 정리용 (재사용·가독성·유지보수). 관계·동작 안 바뀜.

### App(최상위) & props 근원

- App(최상위)은 props를 "안 받음" state를 직접 만듦 (위에 부모가 없으니까)
- props 바뀌는 근원 = 결국 어딘가의 state 변경 (동적 변화의 뿌리 = state)

### 참고: JSX 안 주석

- JSX(return의 <>...</>) 안에서는 // 주석 안 됨! → {/_ 주석 _/} 써야 함

---

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. 콘솔 OFF 이후 값은 기억하는 state 값(클로저)?
  → A. 맞음 ! OFF = 첫 렌더 초기값 , 이후는 React 주머니에 저장된 state 값 (클로저 13번)
- Q. count 눌렀는데 Bulb console.log 찍힘 = 부모 리렌더 → 자식?
  → A. 구조 A (둘 다 App에) 면 맞음. 구조 B (분리)면 App 리렌더 안 해서 Bulb 안 찍힘
- Q. App이 Bulb 부모? 모듈화 안 해서 헷갈리나?
  → A. App이 <Bulb/> 렌더하니 App = 부모 . 모듈화 (파일 분리) 는 관계 무관 , 파일만 나눔
- Q. Bulb를 App 안에 두든 별도 파일 import하든 결과 같아?
  → A. 같음 ! 부모-자식은 "렌더하냐" 로 정해짐 , 파일 위치 무관
- Q. props 변경 = state 변경?
  → A. 거의 . Props 변경의 근원은 결국 어딘가의 state 변경
- Q. Bulb props light와 App state light 같아?
  → A. 구조 A(내려줬으면) = 같은 값 / 구조 B (지금) = 별개 , props 없음
- Q. App에 light state 없으면 props 받아와야? App 최상위인데?
  → A. App 은 props 안 받음 , sate를 직접 만듦 light 내리려면 App 이 light state 가져야
- Q. 지금 Bulb/Counter는 props 받는 상황 아니지?
  → A. 맞음! 각자 state, props 안 받음

---

## ✅ 49강 체크리스트

- [ ] state를 props로 자식에 내릴 수 있다
- [ ] 리렌더 3원인: ①내 state ②받는 props ③부모 리렌더
- [ ] 관련없는 state 한 곳에 → 무관한 자식도 리렌더
- [ ] 해결 = state를 컴포넌트로 분리
- [ ] 부모-자식 = 누가 렌더하냐 (모듈화/파일위치 무관)
- [ ] App(최상위) = props 안 받음, state 직접
- [ ] props 변경 근원 = 어딘가의 state 변경
- [ ] JSX 안 주석 = {/\* \*/}

## 50강. 사용자 입력 (제어 컴포넌트)

### ⭐ 제어 컴포넌트 (Controlled Component) - 공식 용어 , 실무 표준!

- 패턴: <input value={state} onChange={onChange} />
- input의 값을 React가 "제어" → 값이 항상 state를 따라감
- 순환: 타이핑 → onChange 발생 → setState(입력값) → state 갱신 → value = {state} 반영 → 화면

### setState(e.target.value) 로직

1. 사용자가 타이핑 → onChange 이벤트 발생
2. React가 onChange(e) 호출 (e=합성이벤트 , 47강)
3. e.target.value = 지금 input에 입력한 값
4. setState(e.target.value) → 그 값을 state에 저장 + 리렌더 (48강 setter)
5. value={state}가 새 값 반영

- 핵심: setState(값)=인수 준 값을 state에 저장. 입력값(e.target.value)을 넣으니 입력값이 저장됨.

### e.target.value 구조 (객체 안 객체)

- e = 이벤트 객체 (합성이벤트) / e.target = 이벤트 안 요소(이 input) <- 이것도 객체 ! / e.target.value = 그 input의 입력값 <- 문자열

### input 종류 (type)

- text= 기본 글자/ password= (●●● 가림) / number= 숫자 / date= 달력 / checkbox= 다중 선택 / radio= 택 1

### input 속성

- value= 값 , React에선 state로 제어 / placeholder= 빈칸 안내문구 / disabled= 잠금 / type

### ⭐ checkbox vs radio

- checkbox = 여러 개 독립 선택 (다중)
- radio = (하나만 택 1), 단 같은 name으로 묶어야 택 1 됨 ! (name 없으면 다 따로 놀아 다중 선택됨 )

### label + for (연결)

- <label for="email">이메일</label> <input id="email" />
- label의 for = input의 id → 연결. 글자 클릭 → input에 포커스 (클릭영역↑, 접근성)
- React(JSX)선 for 대신 htmlFor ! (for는 JS 예약어)
- 감싸는 방법도 됨 : <label>글자 <input/></label>

### 그 외

- select/option: 드롭다운. option = value (저장값) + 텍스트 (화면) => 서로 다르게 가능
- textarea: 여러 줄 입력
- 제어 select 주의: value={state} 의 초기값이 option 중 하나와 맞아야 함
  (예 : country 초기값 "한국"인데 option이 kr/us/uk면 안 맞음 -> ""로 ! )

### 제어 vs 비제어

- 제어: value={state}+onChange, 값이 state에. 실시간 검증·제어 쉬움. (실무 대부분)
- 비제어: value 안 줌, input이 스스로 관리 , 필요할 때 ref로 읽음 (useRef, 52강)

---

### 🔄 제어 컴포넌트 전체 흐름 (한 번에)

    const [state, setState] = useState("");
    <input value={state} onChange={onChange} />

- useState는 "객체"가 아니라 "배열"를 돌려줌 → 배열 구조분해로 받음
  - 첫 요소(state) = 현재 값 (처음=초기값, 이후= 주머니 저장값)
  - 둘째 요소(setState) = 값 저장(변경) + 리렌더 (setter, 48강)

- 흐름 5단계:
  1. 사용자 타이핑
  2. onChange 이벤트 발생 → onChange(e) 실행
  3. e.target.value = 입력값
  4. setState(e.target.value) → 입력값을 주머니 (state)에 저장 + 리렌더
  5. 리렌더 → value={state}가 새 값을 반영 → 화면 (다시 타이핑하면 2번 반복)

- 배역 정리 :
  - value={state} → 화면에 보이는 값 = 현재 state (주머니에서 꺼낸 값 )
  - onChange → 입력 감지해서 setState 호출
  - setState(입력값) → 주머니에 저장(48강) + 리렌더
  - 주머니(클로저 , 13번) → 리렌더돼도 값 유지

- ⚠️ 렌더 트리거 = "setState 호출(입력할 때마다)". e.target.value 자체가 부르는 게 아님

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. setState(e.target.value)가 왜 state를 보관해?
  → A. setState(값) = 인수 준 값을 state에 저장 (48강 setter) e.target.value(입력값)을 넣으니 입력값이 저장됨
- Q. e.target.value에서 target도 객체야?
  → A. 맞음 ! e(객체) -> target (input 요소 , 객체 ) -> value (입력값 , 문자열 )
- Q. onChange 흐름 맞아?
  → A. 맞음 (47강 이벤트 흐름) e(객체) -> target (input요소 , 객체 ) -> value(입력값 , 문자열)
- Q. placeholder={"이름"} vs "이름" 같아?
  → A. 같음(46강, 문자열은 ""도 {""}도).
- Q. date input엔 왜 placeholder 안 보여?
  → A. type=date는 placeholder 무시(달력이라).
- Q. 제어 컴포넌트가 실무 용어야?
  → A.응! Controlled Component=공식 React 용어, 실무 표준.

---

## ✅ 50강 체크리스트

- [ ] 제어 컴포넌트 = value={state} + onChange
- [ ] 순환: 타이핑→onChange→setState→state→value
- [ ] setState(값)=인수 값을 state에 저장
- [ ] e.target.value = e→target(input)→value
- [ ] input type: text/password/number/date/checkbox/radio
- [ ] checkbox=다중 / radio=택1(name으로 묶기)
- [ ] label for=input id (React선 htmlFor)
- [ ] select option=value+텍스트, 초기값 맞춰야
- [ ] 제어 vs 비제어(useRef)
- [ ] 제어 컴포넌트 = value={state} + onChange
- [ ] 순환: 타이핑→onChange→setState→state→value
- [ ] setState(값)=인수 값을 state에 저장
- [ ] e.target.value = e→target(input)→value
- [ ] input type: text/password/number/date/checkbox/radio
- [ ] checkbox=다중 / radio=택1(name으로 묶기)
- [ ] label for=input id (React선 htmlFor)
- [ ] select option=value+텍스트, 초기값 맞춰야
- [ ] 제어 vs 비제어(useRef)

## 📚 input 종류 & 폼 요소 (HTML 기초 ↔ React)

> HTML input이 바탕, React는 여기에 value={state}+onChange 얹어 제어 컴포넌트로.

### 1. input type

- text = 일반 글자 (기본) / password 입력값 ●●● 로 가림 / number = 숫자만 / email = 이메일 형식
- date = 날짜 선택기 (달력) (※ placeholder 안 보임)
- checkbox = 체크박스 (다중 선택) / radio = 라디오 (택1) / file = 파일 업로드

### 2. input 속성

- value = 값 (React선 state로 제어) / placeholder = 빈칸 안내 문구 ("" 든 {""} 든 OK ) / disabled = 입력 잠금 (회색) / type = 위 종류

### 3. ⭐ checkbox vs radio

- checkbox = 여러 개 독립 선택 (다중) 안 묶음
- radio = (택1), 단 같은 name으로 묶어야! 택 1 !
  (name 없거나 다르면? -> 따로 놀아서 다중 선택됨. name = 한 그룹)

### 4. ⭐ label + input 연결 (2가지 , 둘 다 됨 )

- 방법①(감싸기): <label><input/>사과</label> → for/id (불필요 ! 감싸면 자동 연결 )
- 방법②(for/id): <label htmlFor="apple">사과</label><input id="apple"/> → 언제? : lable 태그안에 input 태그가 들어있지 않을 때
- 효과: label 클릭 → input에 포커스( 체크 토글 ) 클릭영역↑, 접근성↑
- React선 for → htmlFor ! (for 는 JS 예약어 ) / id는 그대로 id
- 감쌌으면 for/id 추가는 (불필요)

### 5. select / option (드롭 다운)

- <option>은 <select> 안에 담겨 → (자동 묶임 radio처럼 name으로 안 묶어도 됨! )
- option = value (저장값) + 텍슽트 (화면) -> 서로 다르게 가능
  <option value="ko">한국</option>   // ko 저장, 한국 표시
- select name = 폼 제출용 (React선 거의 X)
- select id = lable 연결용 (선택)
- 제어 select: value={state}+onChange, 초기값이 option 중 하나와 맞아야

### 6. textarea = 여러 줄 입력 (자기소개 등)

---

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. label 그냥 감싸면 연결 안 되고 for/id 해야 돼?
  → A. 아님! 감싸기만으로 연결됨. for/id는 떨어져 있을 때
- Q. radio 두 그룹인데 name 다 "gender"면?
  → A. 4개가 한 그룹 됨(택 1) . 그룹 나누려면 name 다르게 (gender1 / gender2)
- Q. select의 name = 옵션 묶는 거야?
  → A. 아님 ! option은 select 안에 담겨 자동 묶음. select name 은 폼 제출용
- Q. select의 id는?
  → A. lable 연결용 (선택) 옵션 그룹핑이랑 무관
- Q. name="" id="" 는 왜 떠?
  → A. IDE 자동완성. 빈 값이라 안 쓰면 지워도 됨

---

## ✅ input 종류 체크리스트

- [ ] input type: text/password/number/email/date/checkbox/radio/file
- [ ] 속성: value/placeholder/disabled/type
- [ ] checkbox=다중 / radio=택1(같은 name)
- [ ] label 연결 2가지: 감싸기(for/id 불필요) / for-id. React선 htmlFor
- [ ] select: option 자동 묶임, option=value+텍스트
- [ ] textarea=여러 줄

## 51강. State 객체 통합 + 통합 이벤트 핸들러

### 왜? (비효율 개선)

- 이전: 값마다 state 따로 (name , birth , country , bio ) + 핸들러 4개
- 문제: 핸들러들이 거의 똑같음(setXxx(e.target.value)), state도 반복 → 비효율
- 개선: state를 객체 하나로 묶고, 핸들러도 하나로 통합

### 1. State를 객체로 통합

    const [input, setInput] = useState({ name:"", birth:"", country:"", bio:"" });

- 초기값이 객체 → input state가 객체 (4개 값을 프로퍼티로)
- 값 접근: input.name , input.birth ...

### 2. 통합 이벤트 핸들러

    const onChange = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };

- 모든 input이 이 onChange 이벤트 핸들러 하나를 씀 (onChange = {onChange})

### ⭐ setInput({ ...input, [e.target.name]: e.target.value }) 뜯기

- ...input = spread (12번): 현재 input 다 복사 → 안 바뀌는 필드 유지
- [e.target.name]: value = 계산된 프로퍼티 이름 (computed property)
- 왜 spread 필요? setInput은 state를 "통째로 변경" → 없으면 나머지 필드 사라짐 !
  setInput({ [name]: value }) // 나머지 (3개 사라짐)
  setInput({ ...input, [name]: value }) // (기존 유지 + 하나만 갱신)

### ⭐ 계산된 프로퍼티 이름 [key] (새 문법!)

- key 자리에 대괄호 [] → 안의 변수/식의 "값"을 key로 사용
  const field = "name";
  { [field]: "채연" } // { name : "채연" } <- field의 값이 key
  { field: "채연" } // { field : "채연" } <- 대괄호 없으면 문자 그대로
- [e.target.name]: e.target.name "name"이면 → name : e.target.value / "birth"면 → birth : e.target.value

### name 속성

- 각 input에 name="name" , name= "birth"...붙임 → e.target.name이 그걸 읽음
- HTML name 속성 (폼 제출 때 백엔드가 보는 것과 같은 속성), 여기선 "어느 필드+state key" 용도
- ⚠️ name 값 = state 객체의 "key"와 일치해야! (name="name" ↔ input.name)

---

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. useState({}) 의 {}는 state 자체?
  → A. 맞음 ! 초기값이 객체 -> input state가 객체
- Q. [e.target.name]: value 문법?
  → A. 계산된 프로퍼티 . 대괄호 안 값(e.target.name)을 key 로 씀 "name" 이면 name: value , "birth" 면 birth : value (동적 키)
- Q. 왜 ...input 을 넣어야 해?
  → A. setInput은 통째 교체 . spread로 기존 필드 복사 안 하면 나머지 사라짐 (12번 불변 업데이트)
- Q. name = 백엔드가 보는 그거?
  → A. 같은 HTML name 속성 . 여기선 어느 필드인지 구분 + state Key 용도 . name 값 = state key 와 일치해야함

---

## ✅ 51강 체크리스트

- [ ] 여러 state → 객체 하나로 통합
- [ ] 핸들러 하나로 통합
- [ ] ...input = spread: 기존 유지 (12번)
- [ ] [e.target.name] = 계산된 프로퍼티: 대괄호 안 값을 key로
- [ ] spread 필수: setState는 통째 교체
- [ ] name 속성 = state key와 일치

## 52강. useRef

### ⭐ useRef 2가지 용도

    const countRef = useRef(0);   // 용도1: 리렌더 없이 값 유지
    const inputRef = useRef();    // 용도2: DOM 요소 접근

1. 리렌더 없이 값 유지: countRef.current++ → 값 바뀌어도 화면 안 그림
2. DOM 접근: <input ref={inputRef}/> → inputRef.current = <input/>태그가 그려진 "실제 DOM 요소" 그 DOM → .focus() 등

### useRef vs useState

- useState: 값 유지 (O) / 리렌더 (O) / 형태 = 배열 [ 값 , setter]
- useRef: 값 유지 (O) / 리렌더 (X) / 형태 = 객체 {current : 값}
  → 둘 다 주머니에 유지 . 차이 = 리렌더 하냐 (state) 안 하냐 (ref)

### useRef는 "객체" ({current: 값})

- useRef()는 { current : 값 } 객체 반환. 값은 .current 에
- useState 는 배열 , useRef 는 객체 ! (변수가 다 객체인것은 아님! , useRef 만 객체)

### 특정 DOM = 태그가 그려진 "실제 DOM 요소"

- <input ref={inputRef}/> → inputRef.current = React가 렌더 후 그 input DOM을 inputRef.current에 넣어줌
- inputRef.current = 그 input DOM 요소 (console.log 하면 태그 출력 )
- inputRef.current.focus() → 그 input에 커서

### 리셋 안 됨 = 주머니 ( 클로저 , 13번)

- useRef/useState 값은 React 주머니(slot)에 저장 → 리렌더돼도 유지 (리셋 X)
- 일반 let count=0은 리렌더 때 재 실행되어 0으로 리셋

### ⭐ 핵심 구분

- useRef = ① 값 유지 (리렌더 돼도) + ② 값 바뀌어도 리렌더 안 함
- ⚠️ useRef ≠ state 반영 ! "리렌더 안 하는 자기 값 + DOM 참조"

### 인스턴스 (붕어빵)

- 컴포넌트(함수) = 붕어빵 틀 / 인스턴스 = 틀로 찍어낸 붕어빵 하나하나
- <Register/> 쓸 때마다 인스턴스 1개. <Register/><Register/> = 인스턴스 2개 (각자 독립)
- import는 앱 시작 시 파일 1번 로드 / <Register/> 는 쓸 때마다 함수 호출

### 함수 밖 변수 vs 함수 안

- let count=0 (함수 밖) → 모든 인스턴스가 "공유" → 버그 (같이 카운팅)
- useRef/useState (함수 안) → 인스턴스마다 "독립"
- ※ let count=0 (함수 안)도 → 매 렌더 리셋 (항상 1) -> 그래서 useRef 를 사용해야 함 !

### inputRef를 핸들러에서 = 클로저

- 컴포넌트 스코프 선언 / onSubmit 내부 함수가 참조 = 클로저 (바깥 변수 봄 , 벽돌1)

---

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. useRef는 무조건 객체 형태? → A. 맞음 ! { current : 값 } . ( useState = 배열 / useRef = 객체 )
- Q. 특정 DOM = 태그? → A. 태그가 그려진 실제 DOM 요소
- Q. ref={inputRef} → current에 태그 담김? → A. 맞음 ! React 가 그 DOM을 current 에 넣음
- Q. 리셋 안 됨 = 주머니(클로저)? → A. 맞음 ! 주머니에 저장돼 유지
- Q. useRef = 값 유지 + 렌더링만 안 함? → A. 맞음 !
- Q. useRef = state 반영 함수? → A. 아님 ! state 와 무관 , 자기 값 보관 + DOM 참조.
- Q. inputRef 핸들러에서 씀 = 외부변수 참고? → A. 맞음 ! 클로저
- Q. <Register/> 2개 = 함수 2번 호출? → A. 맞음 ! import 1번 / 함수 호출 2 번 (독립 인스턴스)
- Q. 인스턴스가 뭐야? → A. 컴포넌트(틀)로 만든 하나하나의 개체 (붕어빵)

---

## ✅ 52강 체크리스트

- [ ] useRef 용도: ①값 유지 ②DOM 접근
- [ ] useRef = {current:값} 객체 (useState는 배열)
- [ ] state는 리렌더 O / ref는 X
- [ ] <input ref={r}/> → r.current = DOM → .focus()
- [ ] 리셋 안 됨 = 주머니(클로저)
- [ ] useRef ≠ state 반영
- [ ] 인스턴스 = 붕어빵 (독립)
- [ ] 함수 밖=공유(버그) / 함수 안=독립
- [ ] inputRef 핸들러에서 = 클로저

## 53강. React Hooks + 커스텀 훅

### Hooks란?

- Hooks = 함수 컴포넌트에서도 React 기능(State , Ref)을 쓰게 해주는 메서드
- 과거(2017년 이전): 클래스 컴포넌트만 기능 사용 / 함수 컴포넌트는 UI 렌더만
- 클래스가 문법이 복잡해서 → 함수 컴포넌트에서도 기능 쓰려고 -> Hooks 개발(클래스 기능 "낚아채오기")
- useState/useRef도 다 Hooks! 접두사 = "use". 각각을 단수형 "hook"이라부름
- 다른 훅 : useEffect , useReducer 등

### 클래스 vs 함수+hook (왜 hook이 생겼나)

### 클래스 vs 함수+hook (왜 hooks가 생겼나)

    // 😰 클래스 (옛날, 복잡): class, constructor, super, this.state, this.setState, render()
    class Counter extends Component {
      constructor(props){ super(props); this.state={count:0}; }
      render(){ return <button onClick={()=>this.setState({count:this.state.count+1})}>{this.state.count}</button>; }
    }
    // 😎 함수+hook (지금, 간결):
    function Counter(){
      const [count, setCount] = useState(0);
      return <button onClick={()=>setCount(count+1)}>{count}</button>;
    }

- ※ 클래스 컴포넌트는 지금 안 배워도 됨! "옛날엔 복잡했구나 → 그래서 hook" + 볼 줄만.

### ⭐ Hook 규칙 (3가지)

1. hook은 "함수 컴포넌트 안" / "커스텀 훅 안" 안에서만 호출 (일반 함수·클래스 X -> Invaild hook call)
2. 조건문 / 반복문 / 중첩함수 안 ❌ → "컴포넌트 함수 최상위에서만"
3. 나만의 훅(커스텀 훅) 만들 수 있음 (use 접두사)

### ⭐ 왜 조건문/반복문 X? (호출 순서 = slot 매칭)

- React는 hook을 "호출 순서(번호)"로 주머니(slot)에 매칭
  const [a]=useState(0); // 1번째 → slot 0
  const [b]=useState(""); // 2번째 → slot 1
- 매 렌더 같은 순서로 불려야 제대로 매칭됨
- 조건문 안 넣으면 : 어떤 렌더엔 안 불림 -> 순서 어긋남 -> b가 a의 slot을 받음 -> 값 뒤섞임 / 에러
- (반영 안 됨이 아니라 "엉뚱한 주머니에 연결" 됨 ) → 항상 최상위 같은 순서로 , 같은 순서로

### ⭐ 커스텀 훅 (Custom Hook)

- 접두사 "use" 로 시작 + 안에서 hook 쓰는 함수 → 반복 로직 재사용
  function useInput() {
  const [input, setInput] = useState(""); // 초기값 "" 권장
  const onChange = (e) => setInput(e.target.value);
  return [input, onChange]; // 배열로 반환 (useSate 흉내)
  }
- src/hooks 폴더에 관리

### 배열 return / 사용

- return [input, onChange] → 배열도 값(8번)·함수도 값(4번)이라 배열로 감싸 반환 . index 0 =input, index 1 =onChange (0부터!)
- const [input, onChange] = useInput() → 배열 구조분해(10번), 이름 (위치로!)
- ⭐ 호출마다 \*\*\* state! useInput() 두 번 = 독립 state 2개 (붕어빵). input과 input2는 (진짜 다른 state input≠input2 )

---

### ❓ 내 질문 & 답 (직접 채우기!)

- Q. 클래스 컴포넌트 예시? → A. class/constructor/this.state/this.setState/render()로 복잡. 지금은 함수+hook(간결). 볼 줄만 알면 됨.
- Q. hook은 조건문/반복문 X, 최상위에서만? → A. 맞음 ! 컴포넌트 함수 최상위(조건·반복·중첩함수 X)
- Q. 순서 엉키면 = 주머니 반영 안 됨? → A. 정확히는 "엉뚱한 주머니에 연결됨" 순서 = slot 매칭이라 순서 어긋나면 b가 a의 slot 받아 뒤섞임
- Q. 어떻게 배열로 return? → A. 배열도 값·함수도 값. index 0=input, 1=onChange.
- Q. useInput이 input2 return 안 했는데 input2 됨? → A. [input , onChange] 배열만 반환 . 구조분해는 위치로 받아 이름 자유
- Q. input과 input2는 이름만 바꾼 거? → A. 아님 ! 두번 호출 = 독립 state 2개
- Q. useState 구조분해 index? → A. 0 , 1 (0부터)

---

## ✅ 53강 체크리스트

- [ ] Hooks = 함수 컴포넌트에서 React 기능 (use)
- [ ] 클래스(복잡) vs 함수+hook(간결) — 볼 줄만
- [ ] Hook 규칙: 최상위에서만, 조건문·반복문 X
- [ ] 왜? 호출 순서=slot 매칭 → 어긋나면 엉뚱한 주머니
- [ ] 커스텀 훅 = use + 안에서 hook
- [ ] 배열 return = 배열도 값·함수도 값, index 0부터
- [ ] 커스텀 훅 = 구조분해, 이름 자유, 호출마다 독립 state
- [ ] useState("") 초기값
