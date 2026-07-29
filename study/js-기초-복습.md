# 🧩 JS 기초 복습 노트 (세션 그대로 전체 정리)

> 우리가 함께 공부한 JS 기초 세션들을 **순서대로 전부** 정리.
> 각 세션: **배운 개념 + 비유 + 예시 + 내가 헷갈렸던 것(교정) + React 어디서 나오나**
> React 하다 막히면 → 여기서 해당 세션 찾아 복습 🔁

---

## 🚨 먼저 — 내가 계속 헷갈린 "뿌리 약점" (여기가 핵심!)

| 순위 | 약점 | 세션 |
|---|---|---|
| 1 | 🏠 참조값/주소값 (객체·함수는 "주소"로 다뤄짐, 새로 만들면 새 주소) | 세션4 |
| 2 | 🪞 구조분해 (특히 매개변수 `({content})`) | 세션7 |
| 3 | 📦 배열(위치로) vs 객체(이름으로) | 세션5·7 |
| 4 | ↩️ 콜백 중괄호 쓰면 return 필수 | 세션6 |
| 5 | 💎 함수도 값·객체도 값 (어디든 담김) | 세션2 |

→ **React 최적화(memo/useCallback/useMemo/Context)가 어려운 건 거의 다 세션4(참조값) 때문.** 막히면 세션4로!

---

# 📖 세션 1 — 변수와 상수 / 자료형 / 함수 기본

## 변수와 상수
- `let` = 재할당 O / `const` = 재할당 X
- ⚠️ `const`라도 **객체 내부 값**은 바뀜 (`user.name="x"` OK / `user={}` X)

## 자료형
- **primitive(원시값)**: 숫자, 문자, 불리언(true/false), undefined, null
- **객체**: `{}`, `[]`, 함수
- `typeof 값` → 타입 확인 (`typeof sum` → `"function"`)

## 함수 기본
- **함수 선언 ≠ 실행!** 정의만 해두고, `()` 붙여야 실행
  ```js
  function greet(){ return "하이" }
  greet      // 함수 자체 (실행 X)
  greet()    // 실행! → "하이"
  ```
- ⚠️ **괄호 `()` = 실행 버튼!**
- ⚠️ `console.log`(화면에 찍기) ≠ `return`(값 돌려주기)
- ⚠️ **return 없으면 → `undefined`** 돌려줌

### 😵 내가 헷갈렸던 것
- "함수 선언 줄이 undefined인 건 호출 안 해서" → ❌ 선언은 "명령문"이라 결과값이 없는 것 (호출 무관)
- `console.log`가 찍은 것 ≠ return값 (하이는 log가 찍은 것)

### 👉 React 연결
- 컴포넌트도 함수. `return` 없으면 화면 안 나옴. `onClick={fn}`(정의) vs `fn()`(즉시 실행)

---

# 📖 세션 2 — 함수(매개변수/인자) / 함수 표현식 / 화살표 함수

## 매개변수 vs 인자
- **매개변수(parameter)** = 받는 자리 / **인자(argument)** = 넣는 값
  ```js
  function sum(a, b){ return a + b }  // a, b = 매개변수
  sum(1, 2)                           // 1, 2 = 인자
  ```
- ⚠️ 인자 부족하면 → `undefined` (에러 아님!) → 계산하면 `NaN`

## 함수 표현식
- **함수도 "값"** 이라 변수에 담김: `const f = function(){}`
- ⭐ "호출 자리는 return값으로 대체된다" (`const x = f()` → x = f의 return값)

## 화살표 함수
- 함수 표현식의 짧은 버전: `const f = () => {}`
- `=>` 뒤 **중괄호 없으면 암묵적 반환** / **있으면 return 필수** (세션6 함정!)

### 😵 내가 헷갈렸던 것
- "`const`는 정수 타입" → ❌ `const`/`let`(재할당 축)과 타입(number/function)은 **다른 축** (`typeof sum`→"function"으로 증명함)
- 단어: **반환(return)** vs 변환(형 변환) 혼동 / `===`(비교) vs `=`(할당)

### 👉 React 연결
- **함수도 값** → 이벤트 핸들러, 콜백, `return [count, {함수들}]`, Context Provider 등 다 이 원리

---

# 📖 세션 3 — 객체 (object)

- `{ key: value }` = **서랍장**
  - 프로퍼티 = 쌍 전체 / 프로퍼티 이름 = key / 값 = value
  - **key = "객체 안 변수 이름"** (내가 자유롭게 지음!)
- 점 표기법: `user.name` (읽기), `user.name = "x"` (쓰기/추가)
- 없는 키 접근 → `undefined`

### ⭐ 이 세션의 핵심 (뿌리!)
- **변수는 객체를 직접 안 들고 "화살표(참조)"로 가리킨다** 🏠→
- `const`는 **화살표(가리키는 대상)를 잠그고**, 속 내용물은 자유
  → `user.name=...` OK / `user={...}` TypeError

### 😵 내가 헷갈렸던 것
- 프로퍼티 = 쌍 전체 (값 자체 아님), "프로퍼티 이름" = key
- "화살표가 무슨 말?" → ASCII 그림으로 이해함 (변수 → 🏠서랍장)

### 👉 React 연결
- todo = `{ id, isDone, content, date }` (프로퍼티 이름 내가 정함), props = 객체

---

# 📖 세션 4 — ⭐ 참조에 의한 복사 (제일 중요! 뿌리)

- `=` = "오른쪽이 든 것을 베껴 왼쪽에 넣기"
- **primitive(숫자/문자)** = **값 자체 복사** → 독립 (남남, 한쪽 바꿔도 무관)
- **객체/함수** = **화살표(주소)만 복사** → 공유 (같은 집, 한쪽 바꾸면 둘 다!)
  ```js
  const a = { x: 1 };
  const b = a;        // 화살표 복사 → 같은 집!
  b.x = 99;
  a.x                 // 99 (둘 다 바뀜! 같은 집이니까)
  ```
- **`===`** = 객체에선 "**같은 집(주소)이냐**" 비교 (내용 아님!)
  ```js
  const a = {x:1}; const b = {x:1};
  a === b   // false! (내용 같아도 따로 지은 집)
  const c = a;
  a === c   // true! (복사해서 같은 집)
  ```
- ⭐ **새로 만들면 새 집(새 주소)** → 내용 같아도 `===` false

### 😵 내가 헷갈렸던 것
- "따로 복사됐는데 같이 바뀜" (메커니즘 모순) → 화살표(주소) 공유라 그럼
- 단어: "참고" → **"참조(reference)"** (참조 = 화살표 = 주소, 다 같은 말!)
- 복사(`=`, 화살표 베끼기) vs 비교(`===`, 같은 집이냐) — 다른 동작!

### 👉 React 연결 (★ 최적화 전체의 뿌리!)
- 리렌더마다 객체/함수 `{}`/`()=>{}`가 **새 주소**로 생김 → memo가 "바뀌었다" 오판
- → useCallback/useMemo로 주소 고정. state 직접 수정 금지(불변, 새로 만들어 교체)

---

# 📖 세션 5 — 배열 (array)

- `[ ]` = 순서대로 줄세운 목록. **인덱스 0부터** (첫째 = `arr[0]`)
- 없는 인덱스 → `undefined`
- 배열 = **번호(0,1,2)를 key로 쓰는 특별한 객체** (0:/1:/length 다 프로퍼티)
- `.length` = 요소 개수. 마지막 = `arr[arr.length-1]` (개수는 1부터, 인덱스 0부터라 1 차이)
- `push(x)` = 맨 뒤 추가
- ⭐ **배열도 객체** → 참조 복사 적용 (`arr2 = arr1` = 화살표만, 같은 사물함)

### 😵 내가 헷갈렸던 것
- "개수 프로퍼티" = 프로퍼티의 개수로 오해 / key에 3 포함 오해

### 👉 React 연결
- todos = 배열. state 직접 `push` 금지 (참조 그대로라 React가 못 알아챔) → spread로 새 배열

---

# 📖 세션 6 — ⭐ 배열 메서드 (map/filter/find/forEach)

| 메서드 | 하는 일 | 반환 | 못 찾으면 |
|---|---|---|---|
| `forEach` | 각 요소 실행만 (결과 버림) | undefined | - |
| `map` | 각 요소 **변환** | 새 배열 (같은 개수) | - |
| `filter` | **조건 true인 것만** | 새 배열 | `[]` (빈 배열) |
| `find` | **첫 true 요소 하나** | 요소 | `undefined` |

```js
[1,2,3].map(n => n*2)        // [2,4,6]
[1,2,3,4].filter(n => n>2)   // [3,4]
```

### ⭐ 콜백 작성 함정 (내 약점!)
- 중괄호 쓰면 **`return` 필수!** 안 쓰면 조용히 `undefined` → 버그
  ```js
  n => n*2            // OK (암묵적 반환)
  n => { return n*2 } // OK
  n => { n*2 }        // ❌ undefined! (map이면 [undefined,...])
  ```

### ⭐ 3분할 (계속 헷갈림 → 표로!)
| 이름 | 정체 | 비유 |
|---|---|---|
| 요소 | 배열 안 데이터 | 재료 |
| 콜백 | 우리가 주는 함수 | 쪽지(레시피) 📝 |
| 메서드 | map/filter 자체 | 알바생 👷 |
→ **콜백 ≠ 메서드!** map(알바생)이 콜백(쪽지)을 각 요소(재료)에 실행

- map/filter는 **새 배열** 만듦 (원본 안 건드림, 세션4 연결) → React가 좋아함

### 😵 내가 헷갈렸던 것
- "콜백이 map/filter야?" (콜백=메서드로 2번 혼동) → 3분할 표
- filter 못 찾으면 `[]`(find는 undefined)

### 👉 React 연결
- `todos.map(todo => <TodoItem/>)` (목록 렌더), `filter`(검색/삭제)

---

# 📖 세션 7 — ⭐ 구조 분해 할당 (내 약점 2위!)

- **객체**: `const { name, age } = user` → **key 이름으로** 꺼냄, `{}`는 거울
- **배열**: `const [a, b] = arr` → **위치로** 꺼냄, `[]`는 거울, **이름 자유**
- ⭐ "객체 = 이름 중요/순서 무관 / 배열 = 위치 중요/이름 자유" (반대!)
  ```js
  const { name } = user;        // user.name 을 name에 (이름 맞춤)
  const [a, b] = [10, 20];      // a=10, b=20 (위치로)
  ```

### ⭐ 매개변수 구조분해 (제일 헷갈림!)
```js
function TodoItem({ content, isDone }) {}
// = function TodoItem(props){ const {content,isDone}=props } 의 줄임!
```
→ "객체 받으면서 바로 꺼내기"

### 😵 내가 헷갈렸던 것
- "왜 user.이 사라지고 {}가 붙나" → `=user`가 상자 지정, `user.` 반복 불필요
- 매개변수 `({content})` 가 뭔지 반복해서 까먹음 (거울 🪞 + 긴버전→줄임으로 복습)

### 👉 React 연결
- props `({ content })`, useState `const [count, setCount]`, useContext `const {onCreate}`

---

# 📖 세션 8 — 옵셔널 체이닝 `?.`

- `user?.address?.city` = `.` 앞이 **null/undefined면 멈추고 undefined** 반환 (에러 X)
- 핵심: `.` 앞이 **객체여야** 칸을 연다
  ```js
  user.city          // user가 객체면 OK (없는 키면 undefined)
  undefined.city     // ❌ TypeError! (undefined는 객체 아님)
  user?.city         // user가 없으면 → 멈추고 undefined (에러 X)
  ```
- 멈추는 조건 = null **또는** undefined, 돌려주는 값 = 항상 undefined
- 실무: 진짜 없을 수 있는 곳(서버 데이터)에만. 남용 금지(버그 숨김)

### 👉 React 연결
- 서버 데이터, props 안전 접근 등

---

# 📖 세션 9 — ⭐ Rest / Spread `...` (React 필수!)

`...`는 정반대 둘:

## Spread (펼치기) — 등호 오른쪽
- `[...arr]`, `{...obj}` = 봉지 풀어 새 봉지에 흩뿌림 → **독립 복사(새 주소)**
- ⭐ `{...user, age: 8}` = 기존 유지 + 뒤에 쓴 key가 이김 = **불변 업데이트**
  ```js
  [...todos, newTodo]              // 기존 + 새거 (새 배열)
  { ...todo, isDone: !todo.isDone } // 기존 유지 + isDone만 바꿈
  ```

## Rest (모으기) — 등호 왼쪽 / 함수 매개변수
- `const [a, ...rest] = arr` / `function f(...nums)` = 나머지 전부 모음
- 모을 게 없으면 `[]` (빈 배열)

### ⚠️ 얕은 복사
- `[...nested]`는 맨 위 봉지만 새로, 안의 객체는 화살표 공유 (`nested[0]===a` true)

### 😵 내가 헷갈렸던 것
- **배열에 산수 직접 X**: `[1,2,3]*2` → NaN (요소별 X). 요소마다 변환은 무조건 `map`

### 👉 React 연결
- `setTodos([...todos, newTodo])`, `{...todo, isDone:!isDone}` (불변 업데이트)

---

# 📖 세션 10 — ⭐ 클로저 (마지막 보스)

- **벽돌1**: 함수는 바깥 변수 본다 (안→밖 OK / 밖→안 X = ReferenceError)
- **벽돌2**: 함수 안의 함수, 안쪽이 바깥 변수 봄
- **벽돌3**: `return inner`(괄호 없이!)로 함수 자체를 내보내면 → 그 함수가 쓰던 변수를 **"주머니에 챙겨"** 나감 → outer 끝나도 변수 살아있음 = **클로저**

```js
function outer(){
  let count = 0;
  function inner(){ return count++ }  // count를 주머니에 챙김
  return inner;                        // 함수 자체 내보냄 (괄호 X!)
}
```

- 내 정의(정확함): "클로저 = 안의 함수를 return으로 내보낼 때 참고하는 변수를 같이 챙겨 내보내는 것"
- 비유: 변수를 **주머니/가방에 챙겨 나간다** 👜

### 😵 내가 헷갈렸던 것
- `console.log`(찍기) vs `return`(돌려주기) — 클로저에서도 또 헷갈림
- ReferenceError(이름 못찾음) vs TypeError(쓰는 방식 틀림)
- 함수는 `()`로 호출해야 실행 (`return greet`는 정의만 내보냄)

### 👉 React 연결
- useState 값 유지(주머니=slot), useCallback deps, stale closure, dispatch/ref가 "밖에서 참고"

---

# 🔑 그 외 꼭 아는 것

## 표현식 vs 문
- **표현식** = 값이 되는 것 → `const x = ___`에 담김 (5, "hi", 3+2, ()=>{}, 함수())
- **문** = 동작/명령 → 값 안 됨 → 못 담음 (if, for, while)
- 👉 `const x = useMemo(...)`, `const f = useCallback(...)` → 값 반환하니 담김

## 메서드 = "객체에 속한 함수"
- `객체.함수()` 형태. "어디 사느냐"로 정함 (뭘 다루냐 X)
- `todos.map()`, `날짜.toDateString()`, `React.memo()`, `"x".toLowerCase()`
- `.` = 안의 것에 다가가기 / `()` = 실행

## 대문자 규칙
- 대문자 = 컴포넌트/생성자 (`<Footer>`, `new Date()`, `Array`)
- 소문자 = HTML 태그 (`<div>`, `<input>`)

---

# 🎯 자주 헷갈린 것 총모음 (실수 방지 체크!)

- [ ] `console.log`(찍기) ≠ `return`(돌려주기)
- [ ] 괄호 `()` = 실행 (`onClick={fn}` vs `fn()`)
- [ ] 배열(위치로 `[0]`) vs 객체(이름으로 `.key`)
- [ ] 콜백 중괄호 → `return` 필수
- [ ] `[]`(빈 배열, useEffect deps=mount만) ≠ 생략(undefined=매번)
- [ ] 객체/함수 = 새로 만들면 새 주소 (내용 같아도 `===` false)
- [ ] 복사(`=`, 베끼기) ≠ 비교(`===`, 같은 집이냐)
- [ ] state 직접 수정 X → spread로 새로 만들어 교체 (불변)
- [ ] 함수도 값·객체도 값 (변수/배열/return/인수 어디든 담김)
- [ ] 참조 = 화살표 = 주소 (다 같은 말!)

---

> 📌 **최종 결론**: React 최적화·Context가 어려우면 → **세션4(참조/주소)** 로 돌아오기. 그게 모든 것의 뿌리!
