# 비동기 공부 노트 (떠먹는 자바스크립트 비동기)

> 강의: 떠먹는 자바스크립트 비동기 (제주코딩베이스캠프)
> 2026-10

<!-- 아래 구조대로 직접 타이핑하면서 복기하기. 내용은 챗 참고 -->

## 🧠 한눈 요약
동기 = 기다림 🧍 / 비동기 = 안 기다림 🔔 (진동벨)
JS 엔진 = Heap(보관,냉장고) + Call Stack (실행 , 조리대)
Call Stack 1개 = 단일 스레드 = JS는 원래 동기
오래 걸리는 일은 [브라우저 API]에 맡김 → 대기줄 → 비동기



## 📖 1강 — 동기 vs 비동기
동기(synchronous) = 하나 끝나야 다음 (가만히 서서 기다림 🧍 )
비동기(非동기 = Asynchronous ) = "동기가 아님" = 안 기다리고 딴 일 (진동벨 🔔 )
setTimeout(콜백 , 시간) = [브라우저API]가 ① 시간 셈  ② 콜백을 대기줄(큐)에 넣음
console.log("1") → setTimeout(... , 2000) 맡기고 넘어감 → console.log("3") -> (2초) -> 2 = 132
⭐ 0 초여도 132 → 비동기는 "시간"이 아니라 대기줄을 "거치느냐". 동기 코드 다 끝나야 대기줄을 봄 (콜백은 새치기 못함)
콜백 = 다른 함수에 통째로 넘기는 함수 ( () => {...} 전체)



## 📖 2강 — JS 엔진 & 콜 스택
1) JS 엔진 = 브라우저 내장 해석·실행기 (V8,SpiderMonkey). 두 영역 = Heap + Call stack
2) Heap vs Call Stack (냉장고 vs 조리대)

                               담는것                               비유
        Heap                  함수·객체·배열 본체 보관                  🧊냉장고
        Call Stack            함수 실행(실행 컨텍스트=접시)              🍳조리대

const 참깨빵 = () => {...} → 본체는 Heap에 저장 , 변수는 그 주소(화살표) 가리킴 (세션 5참조값)
참깨빵() → 냉장고에서 꺼내 조리대 (Call Stack)에 접시로 올려 실행
두번 호출 = 레시피(Heap) 1개, 조리대 접시만 두 번

3) 스택(자료구조) = 쌓고 맨 위부터 빼기. 후입선출(LIFO = last in fisrt out) = 나중에 쌓은게 먼저 나감

4) 실행 컨텍스트 = 접시 한장
호출하면 → 접시 push / 함수 끝나면 → pop
⭐push/pop은 [JS엔진]이 자동 (console.log은 눈에 보여주는 표시일 뿐). push = 호출(괄호), pop = 함수 끝

5) 참꺠빵 트레이스 🍔
Call 참깨빵 → Call 순쇠고기패티 → Call 특별한소스 → End 특별한소스 (맨 위부터 !) → End 순쇠고기패티 → End 참꺠빵 → -- 함수 호출 종료 --

→ 안쪽이 완전이 끝나야 바깥이 이어감 (pop되면 밑 접시가 멈췄던 자리에서 계속)

```
[콜 스택 변화]  아래 = 바닥, 위로 쌓임 (아래→오른쪽으로 시간 순)

STEP 1  참깨빵() 호출 ─ push ▲        출력: Call 참깨빵
  ┌───────────────┐
  │ 참깨빵         │
  └───────────────┘

STEP 2  순쇠고기패티() 호출 ─ push ▲   출력: Call 순쇠고기패티
  ┌───────────────┐
  │ 순쇠고기패티   │ ◀ 맨 위
  ├───────────────┤
  │ 참깨빵         │
  └───────────────┘

STEP 3  특별한소스() 호출 ─ push ▲     출력: Call 특별한소스 / End 특별한소스
  ┌───────────────┐
  │ 특별한소스     │ ◀ 맨 위
  ├───────────────┤
  │ 순쇠고기패티   │
  ├───────────────┤
  │ 참깨빵         │
  └───────────────┘

STEP 4  특별한소스 끝 ─ pop ▼          출력: End 순쇠고기패티
  ┌───────────────┐
  │ 순쇠고기패티   │ ◀ 특별한소스 치워짐, 여기서 이어감
  ├───────────────┤
  │ 참깨빵         │
  └───────────────┘

STEP 5  순쇠고기패티 끝 ─ pop ▼        출력: End 참깨빵
  ┌───────────────┐
  │ 참깨빵         │ ◀ 순쇠고기패티 치워짐, 여기서 이어감
  └───────────────┘

STEP 6  참깨빵 끝 ─ pop ▼              출력: -- 함수 호출 종료 --
  ┌───────────────┐
  │ (텅 빔)        │ ◀ 콜 스택 비었으니 다음 코드 실행
  └───────────────┘

핵심: push는 ▲ 위로 쌓고, pop은 ▼ 맨 위부터 치움 (후입선출).
      맨 위 접시가 치워져야 그 밑 접시가 멈췄던 자리에서 이어감.
```

6) 단일 스레드 = 동기
Call Stack 하나뿐 = 한 번에 접시 하나 = JS는 원래 동기
2초 걸리는게 쌓이면 = 그동안 다 멈춤(화면 얼어붙음) → 그레서 오래 걸리는건 [브라우저 API]에 맡김 = 비동기



### ❓ 내가 헷갈렸던 것
1. 함수 저장 위치 = Call Stack 아님 , Heap(냉장고). Call Stack은 "살행"을 쌓는 조리대
2. console.log이 push/pop 시키는 거 아님 → [JS엔진] 이 자동으로
3. 선언(const A = () => {}) ≠ 호출 (A()) - 세선1
4. 노란 박스 여러 개 = 같은 Call Stack 1개의 시간 스냅샷
5. 접시 = 실행 컨텍스트 = 함수 하나의 실행 공간



### 💡 한 줄 정리
JS 엔진 = Heap(보관=냉장고) + Call Stack(실행 = 조리대 , 1개 = 단일스레드 = 동기 ). 오래 걸리는 일은 [브라우저 API]에 맡겨 비동기로.



### 🔗 세션 연결
세션5 참조값 (변수 = Heap 속 함수의 주소)
세션1 선언 ≠ 실행, 괄호 = 실행버튼
세션2 함수도 값
Day1 비동기 (단일 스레드라 막혀서 브라우저 API로)



## 📖 3강 — 런타임 & 이벤트 루프

1) 런타임이란? (엔진 ≠ 런타임, 주방 비유)
런타임 = JS가 돌아가는 작업장(주방)전체
엔진은 런타임 안의 부품 하나 (엔진 ≠ 런타임)
🍳엔진 = 요리사(순수 JS 계산만) / 런타임 = 주방 전체 (요리사 + 타이며·오븐 = Web API + 대기선반 = Queue + 주방장 = Event Loop)
요리사 혼자선 타이머(setTimeout)·배달(fetch)못 함 → 주방(런타임)이 도구 줘서 비동기 가능
구성 = JS 엔진 + Web API + Callback Queue + Event Loop

2) 런타임 두 종류 (브라우저 / node.js)
브라우저(크롬 등):웹페이지에서 JS실행 / 엔진 = V8 / API=DOM,fetch,setTimeout
node.js:브라우저 밖(내 컴퓨터·서버)에서 JS 실행 / 엔진=V8(크롬과 같음)/ API = 파일 읽기 , 서버 등
둘 다 안에 JS 엔진을 품고 있어서 JS 실행 가능 (node 파일.js, npm, Vite가 node.js 위에서 돎)

3) 비동기 전체 흐름 (콜스택 → Web API → 콜백큐 → 이벤트루프)
① 콜스택이 setTimeout/fetch 같은 Web API 기능 만남
② 그 작업을 Web API에 맡기고 setTimeout은 바로 pop (콜스택은 다음 줄 계속)
③ Web API가 백그라운드에서 처리 (타이머/요청) ← 병렬
④ 처리 끝나면 콜백 함수를 Callback Queue에 넣음
⑤ EventLoop: 콜스텍 비면 → 콜백큐에서 꺼내 콜스택으로 → 실행

4) Callback Queue (큐 = 선입선출 FIFO)
스택(접시,후입선출)과 달리 입력·출력 위치가 달라 → 들어온 순서대로 나감 (First In First Out)
큐에 오는 건 "실행 준비된 콜백 함수 그 자체" (결과 값 아님 ! 실행 전)
예 : setTimeout 콜백 , 클릭 핸들러 , fetch , .then 콜백

5) Event Loop (콜스택 비면 → 콜백큐에서 꺼내 콜스택으로)
역할 = 순서 결정 담당
콜스택이 비어 있을 때만 콜백큐 작업을 콜스택으로 옮겨 실행
⚠️방향: 콜백큐 → 콜스택 

6) 0초 setTimeout 트레이스 (world → hello)
setTimeout(() => console.log("hello"), 0);
console.log("world");

setTimeout push → Web API에 맡기고 pop → (0초 타이머) → world push·출력·pop → 콜스택 빔 → Evnet Loop가 hello콜백을 콜스택으로 → "hello"
출력:world,hello (0초여도 ! 콜백은 큐 거쳐 콜스택 빌 때까지 기다림)

7) Micro vs Macro 큐 (promise=micro 우선 / setTimeout=macro)
Macrotask Queue ← setTimeout , 이벤트
Microtask Queue ← Promise 결과 (우선순위 높음)
Event Loop : 콜스텍 비면 → Mico 먼저 다 비우고 → Macro 하나
👉 지금은 "Promis(micro)"가 setTimeout(macro)보다 먼저"만 기억 (Promise 때 다시)



### ❓ 내가 헷갈렸던 것 (3강)
1. 런타임 = 엔진 아님 ! 엔진 포함한 환경 전체 (엔진 + Web API + Callback Queue + Event Loop)
2. node.js = 브라우저 밖에서 JS 돌리는 또 다른 런타임 (안에 V8 엔진 있음)
3. 이동 방향 = 콜백큐 → 콜스택
4. 콜백큐에 오는건 "결과값" 아니라 콜백 함수 그 자체 (실행전)
5. 컨텍스트 = 함수 실행 자체 (접시) , 콜스택에 올리는게 = push



### 💡 한 줄 정리 (3강)
JS 엔진은 단일 스레드·동기지만, 런타임(엔진 + Web API + Queue + Event Loop) 덕분에 비동기 처리 가능. Web API가 백 그라운드 병렬 처리 → 콜백큐 → 콜스택이 비면 Event Loop이 꺼내 실행.


### 🔗 연결
Day1·2: 콜스택 단일 스레드(동기) → 막히니까 런타임이 비동기 가능하게
콜백 = 다른 함수에 넘긴 함수 (세션6)
다음: Promise → 왜 micro가 먼저인지 실제로 봄



## 📖 4강 — 콜백으로 비동기 제어

1) 왜 제어가 필요? (비동기라 순서 안 보장)
setTimeout 안의 코드는 콜백큐를 거쳐 나중에 실행됨 → console.log(user)가 먼저 실행돼 빈 {}가 찍힘. "순서를 내가 원하는 대로 보장"하는 게 목적 = 비동기 제어


2) 콜백이란? (다른 함수에 넘기는 "할 일" 함수)
콜백 = 다른 함수에게 넘겨지는 함수 (나중에 실행하라고 맡겨둔 "할일") setUser(printUser)가 콜백 , setUser는 받는 함수


3) 콜백을 왜 넘겨? (비동기 끝난 뒤 실행하려고)
setUser는 비동기라 언제끝날지 모름 → "끝나면 할 일"을 미리 맡겨둠. 밖에서 바로 쓰면 너무 일찍 실행됨 → 콜백으로 맡겨야 비동기 끝난 뒤 실행 (순서 보장)


4) 매개변수 vs 인자 (호출 순간 채워짐)
매개변수 = 정의할 때 빈 받는 자리 / 인자(=인수)= 호출할 때 넣는 값. 호출하는 순간 → 접시(컨텍스트)생성 + 매개변수 ← 인자 채움 + push  + 실행.
이름은 그 함수 안에서만 쓰는 별명 (안 맞아도 됨)


5) 데이터 주고받기 (callback(user)로 주고 → (user)로 받음)
setUser 안 callback(user) = user 를 건네줌 (인자) 콜백 (user) => ... 의 (user) = 받는 손 (매개변수) 왜? 다음 단계가
"완성된 user"를 써야 하니까


6) 화살표 wrapper 왜 필요? (인자 개수 맞추기)
setUser는 콜백을 callback(user) - 인자 1개로 부름 . roleCheck 는 roleCheck(user , printUser) - 2개 필요. 그래서
(user) => roleCheck(user , printUser) 껍데기로 감싸서 개수 맞춤


7) 중첩 (단계 추가 = 안쪽으로)
단계 추가 = 이전 단계의 callback 자리 안에 다음 함수 넣기 -> 한 겹 더 깊어짐.
setUser((user) => roleCheck(user , (user) => pay(user , printUser)))
깊어질수록 오른쪽 계단 = 콜백지옥 → Promise 로 폄


### ❓ 내가 헷갈렸던 것 (4강)
1. 매개변수 vs 인자 자꾸 섞임 → 만들 때 = 매개변수(빈자리) / 부를 때 = 인자(값). 인자 = 인수 동의어
2. 대입은 "선언 자리"말고 "쓰인 자리"에 → function setUser(callback)는 그대로 , 본체의 callback(user) 에만 대입
3. 콜백에 (user)가 왜 ? → setUser가 callback(user)로 건네주니까 받을 손
4. (함수)(값) 호출 문법 → 뒤 괄호 = 실행버튼 + 인자 (단 , "펼쳐보기"용. 실제론 fn(5))
5. 중첩 3단계 (user) => pay(user , showReceipt) → 1단계랑 같은 모양 반복 (한 겹 더일 뿐)
6. heap 저장은 콜스택에서만 → Web API(백그라운드)·Queue(대기줄)는 코드 실행 X


### 💡 한 줄 정리 (4강)
비동기는 순서가 안 보장돼서 , "끝나면 할 일"을 콜백으로 넘겨 끝난 뒤 실행시킨다. 데이터는 callback(user)로 주고 (user)로 받고 , 단계가 늘면 안쪽으로 중첩(=콜백 지옥)

### 🔗 연결
세션6 콜백 / 세션3 매개변수·인자 / 세션5 참조(주고받기) / 세션2 함수도 값. Day1~3(비동기·콜스택·이벤트루프) 위에 올라감. 다음: Promise → 이 중첩을 .then()으로 폄.



## 📖 5강 — Promise

0) 왜 Promise? (콜백지옥 펴기)
콜백으로 비동기 순서를 맞추면 안으로 안으로 중첩됨(콜백지옥). Promise는 상자를 돌려받아 .then 으로 바깥에
이어붙여서 그 계단을 일자로 편다.


1) Promise = 결과를 나중에 주는 약속 상자(객체) — 함수 아님
📌강의: "Promise는 약속을 의미하는 객체. 상태 정보를 알려주겠다는 약속." → 풀면: 비동기 작업의 결과 (성공값/에러)
와 지금 상태를 담아 알려주는 객체.

🧾비유: "운송장(상태 라벨)이 붙은 상자" 하나 — 운송장=지금 상태 / 상자 안=결과 담길 공간 (한 몸!). 주문하면 물건 대신 이 상자(약속)를 먼저 받음.
⚠️함수 아니라 객체(상자). (콜백 = 함수 / Promise = 객체 )
new Promise() 즉시 상자 생성 , 상태는 pending으로 시작.


2) 3가지 상태 (pending / fulfilled / rejected, 택배 비유)
📌강의:"pending = 로직이 완료되지 않음." → "로직" = 그 비동기 작업(코드) 가 하는 일 (예 : setTimeout으로 데이터 준비)

pending(대기) = 작업 진행 중 , 결과 없음(undefined)🚚 배송중
fulfilled(이행=성공) = 성공 , resolve한 값 담김 ✅ 도착
rejected(실패) = 실패/오류 , reject한 에러 담김  ❌ 분실
📌"한 번 이행/거부되면 안 바뀜" → 도착한 택배가 다시 배송중 안 되듯, pending → 성공 OR 실패 (딱 하나, 한 번, 고정)

3) 상자 ≠ 내용물 
상자(Promise 객체) = fetchUser() 가 돌려주는값
내용물(user 등) = 상자 안의 결과값
console.log(상자) → Promise {<fulfilled> : {name : "도라"}} (통째)
.then((user) => console.log(user)) → 내용물만 {name: "도라"} (.then 이 열어서 알맹이만 건넴)


4) 만들기: new Promise(executor) — 생성자 / executor / resolve·reject
📌강의: "생성자 함수로 생성. executor라는 함수를 전달받음." → 풀면 :

생성자 함수 = 객체 찍어내는 틀 , new 붙여 호출 (new Date()가 생성자!)
new Promise((resolve , reject) => {...}) 의 화살표 함수 = executor ("상자 만들 때 할 일" , 즉시 실행 됨)
resolve , reject = JS(시스템)가 만들어서 executor에 건네주는 함수 . executor 함수는 매개변수로 받기만 함
(callback(user)로 user 받던거랑 같음!) → function resolve(){} 안써도됨.


5) resolve / reject = 상자에 담기 + 상태 바꾸기
resolve(값) 3가지 : ① 상태→fulfilled ② 값 담기 ③ 등록된 .then 콜백을 마이크로큐로
reject(값) : ① 상태→rejected ② 에러 담기 ③ .catch 콜백을 큐로
담는 값 = 아무 자료형 OK (보통 객체·문자열 / reject는 에러). 함수도 가능하나 보통 안 넣음


6) 꺼내기: .then / .catch / .finally
.then((성공값) => 할일) = 성공하면 → 성공값 꺼내 할 일
.catch((에러) => 할일) = 실패하면 → 에러 꺼내 할 일
.finally(() => 할일) = 성공/실패 상관없이 항상 실행
매개변수 이름 자유 (단 , 받은 이름 그대로 몸통에서 사용)
📌 "then/catch 가 promise 반환해서 체이닝..."← 깊은 반환 메커니즘은 아직 몰라도 OK(고급). 지금은
"then"이 또 Promise를 돌려줘서 .then().then() 이어 붙일 수 있다" 만!

⚠️ .then vs resolve — 헷갈림 주의! (둘이 다른 일을 함)
 · .then(콜백)  = 콜백을 "상자 안에 등록"만 함 (상태 변경 ❌)
 · resolve(값) = 상태→fulfilled + 값 담기 + 등록된 콜백을 마이크로큐로 (상태 변경 ✅)
 → .then = 등록(대기 걸어두기) / resolve = 실행 발동 스위치. 다른 함수·다른 일·다른 시점!
 → "등록된 .then 콜백" = 상자(Promise 객체) "안"에 저장해둔 그 콜백 (콜스택·큐 아님!)


7) return = 상자를 밖으로
fetchUser 는 상자를 return 해야 → 부른 쪽이 받아서 .then 붙임 (return 없으면 .then() 못 함)
📌순서: 상자를 먼저 "완성"해야 return 가능. 완성 = executor 실행 = setTimeout을 web API에 맡기기.
→ setTimeout 맡기기 (먼저) → 상자 완성 → return (나중). (1초 안 기다리고 pending 상자 바로 돌려줌)


8) 실행 흐름 (콜스택 / Web API / 큐 / 이벤트루프)
① fetchUser() → new Promise 즉시 → executor 실행 → setTimeout을 web API에 맡김
② 상자(pending) return → fetchUser pop
③ .then 콜백은 "상자 안"에 등록·대기 (큐 아님!)
④ (1초 뒤) 타이머 끝 → setTimeout 콜백  →  Task Queue(매크로)  →  콜스택 
⑤ resolve(user)  →  fulfilled + 상자 안 .then 콜백을 Microtask Queue(마이크로)로
⑥ 이벤트루프: 콜스택 비면  →  .then 콜백 콜스택으로  →  출력

핵심:.then 콜백 여정 = 상자 안(등록·대기) → [resolve] → 마이크로큐 → [이벤트루프] → 콜스택,/setTimeout = 매크로큐, Promise = 마이크로큐(우선)

9) 저장 위치 = Heap
Promise 상자(객체)·콜백(함수) = Heap 저장. (Call Stack = 실행만 / Heap = 객체·함수 보관=2일차 냉장고 🧊)
상자가 Heap에 살아있으니 resolve될 때까지 콜백도 유지 (참조 있어 GC 안 됨)


### ❓ 강의에서 못 알아들었던 문장들 (풀이와 함께)
1. "상태 정보를 알려주겠다는 약속" → 결과 + 상태를 담아 알려주는 객체
2. "로직이 완료되지 않음" → "로직" = 그 비동기 작업(코드)
3. "생성자 함수" → 객체 찍어내는 틀 (new Date 같은)
4. "executor를 전달받음" → new Promise(여기)에 내가 넣는 함수 resolve/reject는 JS가 그 안에 건네줌
5. "then/catch"가 promise 반환해서 체이닝" 지금은 → "이어붙일 수 있다"로만 (깊은 건 나중)
6. <fulfilled> → 진짜 키 아니라 내부 상태 표기 (값은 .then으로)
7. 상자 vs 내용물 / return 순서 / 등록·대기 위치 → 3·7·8 참고


### 💡 한 줄 정리
Promise = 비동기 결과를 담는 상자 (객체). new Promise + resolve/reject 로 만들어 담고,
.then/.catch로 꺼낸다. 콜백지옥을 체인으로 편다. 상자는 Heap, 흐름은 콜스택↔Web API↔마이크로큐↔이벤트루프.

### 🔗 연결
세션5 참조(상자=객체=Heap, 주소) / 세션6 콜백 / 세션10 클로저(안에서 바깥 변수 봄) / Day1~4(비동기·콜스택·이벤트루프)

### ★ 로직 쓰기 방법: "값 출처 묻기"
값마다 "어디서 와?" → 바깥에서 옴=매개변수 / 안에서 만듦=const / 상위에 있음=클로저. 시스템 콜백 매개변수는 시스템이 채움. 코드 전에 "출처→목적지" 화살표 먼저!



## ▶️ 다음 강의
runtime 편 = [브라우저 API] + 대기줄(Task Queue) + 이벤트 루프 (Day1에 맛본 것)
그 다음: Promise / .then / .catch / async·await



## 🎯 트랙 목표 체크
 동기 vs 비동기 / setTimeout=브라우저 API / 콜백·콜백지옥
 JS 엔진(Heap+Call Stack) / 콜 스택(push·pop, LIFO, 단일스레드=동기)
 runtime(이벤트 루프) / Promise / .then·.catch / async·await / fetch