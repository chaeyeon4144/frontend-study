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
