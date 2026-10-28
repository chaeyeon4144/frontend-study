# 🌐 HTTP 통신 & fetch 공부 노트

> 떠먹는 비동기 - HTTP 통신 편 / 2026-10

<!-- 챗 내용 보면서 직접 타이핑하며 복기. "내가 헷갈렸던 것"은 내가 실제 물어본 질문들 -->

## 🗺️ 전체 지도 (7정거장)

1. 통신(클라↔서버) 2. Request/Response 3.메서드·CRUD
2. Ajax 5. XMLHttpReqeust→fetch 6. fetch 런타임 7. JSON·파싱

## 🚉 1강 — 통신이란? (클라이언트 ↔ 서버)

1. 통신 = 두 컴퓨터가 데이터 주고받는 것. 한쪽 "주세요" (요청) / 다른쪽 "여기요" (응답).

2. 클라이언트 / 서버 (★ 컴퓨터가 아니라 "역할"!)
   클라이언트 = 요청하는 쪽 (내 브라우저 , 프론트엔드가 여기서 돎)
   서버 = 응답하는 쪽 (저쪽 컴퓨터 , 벡엔드가 여기서 돎 , DB 가짐)
   같은 컴퓨터가 상황 따라 둘 다 될 수 있음 (역할이니까)

3. 요청(Request) = 주문서 📋 / 응답(Response) = 나온 음식 🍲

4. 웹 / 인터넷 / IP / 브라우저 / 웹페이지 구분
   웹(www) = 웹페이지·데이터가 사는 "공간" 🌐
   웹페이지 = 그 안의 "낱장 문서 하나"
   브라우저 = 웹을 "보는 프로그램" 🪟 (크롬·사파리)
   인터넷 = 컴퓨터를 잇는 "길"
   IP = 각 컴퓨터의 "집 주소" 🏠

5. HTTP = 웹에서 데이터 주고받는 "공용 약속(규칙)". JS랑 무관하게 원래 있던 것! (교통법규 같은)

### 🖼️ 그림 — 웹 안의 클라이언트 ↔ 서버

🌐 웹 (WWW) — 웹페이지·데이터가 사는 공간
┌────────────────────────────────────────┐
│ [클라이언트] ──요청(Request)──▶ [서버] │
│ 내 브라우저 ◀─응답(Response)── 저쪽 컴퓨터│
└────────────────────────────────────────┘
사이 길 = 인터넷 / 약속 = HTTP / 각 컴퓨터 = IP 주소

### ❓ 내가 헷갈렸던 것 (1강)

1. 클라이언트 = 프론트엔드(내 쪽) / 서버 = 백엔드(저 쪽, DB 있음) ✅
2. 클라/서버는 "컴퓨터"가 아니라 "역할"같은 컴퓨터도 상황 따라 둘 다 됨
3. 웹 = 공간 (회사X, 브라우저X) / 브라우저 = 보는 창 / 인터넷 = 길
4. HTTP 는 JS 위해 만든게 아님 - 원래 있던 웹의 약속
5. 왜 서버가 최종 확인? → 정답(DB)이 서버에만 + 보안 (클라는 조작 가능)

### 💡 한 줄 정리 (1강)

통신 = 클라이언트 (요청) ↔ 서버 (응답) HTTP는 그 공용 약속. 웹=공간/ 헤더(부가정보) / 바디(보낼내용)

## 🚉 2강 — Request / Response 안에 뭐가 담기나

1. Request(주문서) 안: URL(어디로) / 메서드(뭘할지) / 헤더(부가정보) / 바디(보낼내용)

2. Response(상자) 안: 바디(🎯실제데이터) / 헤더(정보) / 상태코드(성공·실패★) / URL

3. ★ Request ≠ Response (1:1 아님) - "요청"과 "그 결과"는 다른 내용. 주문서 ≠ 나온 음식.
   조회 (받기): 나는 "주세요"만 , 데이터는 서버가 Response로 줌 🎯
   보내기 (로그인) : 그때만 Request body에 내용 내용(아이디·비번) 넣음

4. 상태 코드 (200 / 404 / 500 / 503)
   200 성공 ✅ / 404 찾는 것 없음 (URL 대상 없음) / 500 서버 내부 에러 / 503 서버 과부하로 멈춤 / 2xx = 성공
   4xx = 내(클라) 탓 / 5xx = 서버 탓

5. Request·Response 둘 다 "객체" (서로 다른 객체, 이름만 겹침).→ .으로 꺼내 씀.

### ❓ 내가 헷갈렸던 것 (2강)

1. Request·Response 둘 다 객체 (fetch로 보냄)
2. ★Request ≠ Response (1:1 아님) — 받을 땐 데이터를 "서버가" 줌
3. body/header는 Request·Response "각자" 있음 (내용 다름)
4. URL은 "서버 주소"(브라우저 화면 url 아님). Requset URL = Response URL (같은 서버)
5. 404 = 찾는 것 없음 / 500 = 서버 내부 문제 (내 탓 아님)

### 💡 한 줄 정리 (2강)

Request = 요청(주문서) / Response = 결과 (상자 , 실제데이터 + 상태코드). 둘은 다른 객체.

## 🚉 3강 — HTTP 메서드 & CRUD

1. 메서드 = 요청할 때"뭘 할지"고르는 동사(요청 종류), 4개

2. GET (조회) / POST (생성) / PUT (수정) / DELETE (삭제)

3. CRUD 매핑 (C=POST / R=GET / U=PUT / D=DELETE)

C Create 생성 → POST (회원가입, 글쓰기)
R Read 조회 → GET (상품목록 보기)
U Update 수정 → PUT (프로필 수정)
D Delete 삭제 → \DELETE (글 삭게)

4. GET = (가져오기, body 비움 , "주세요" 만) vs POST(보내기, body 채움 , 내용 넣음) ← 제일 많이 씀

### ❓ 내가 헷갈렸던 것 (3강),

1. "데이터" = 서버가 관리하는 대상(회원·상품·글),Request/Response 객체 자체가 아님
2. 강의 "with"는 틀림 → R = Read(읽기)가 맞음 (뽀뽀야미가 잡아냄!)
3. 필터링해서 목록 가져오기 = GET(조회!) - POST 아님
4. "HTTP 메서드"(요청종류) ≠ "객체 메서드"(함수) — 이름만 같음

### 💡 한 줄 정리 (3강)

메서드 = 뭘 할지. C 생성POST/R조회GET/U수정PUT/D삭제DELETE. GET=가져오기/POST=보내기.

## 🚉 4강 — Ajax

1. Ajax = "방법/기술"의 이름 (언어X, 프레임워크X, "방법/기술") "새로고침 없이 부분만 바꾸는 통신 방법"

2. 이름 뜻 (Asynchronous JS And XML) (비동기+JS+XML, 지금은 주로 JSON).

3. 전체 새로고침(깜빡 😵) vs 부분만 리렌더링(안 깜빡 😊)
   리렌더링 = 화면을 "다시 그리는것" (re = 다시). Ajax는 바뀔 부분만 데이터 받아 그 부분만 다시 그림.

4. HTTP·Ajax·JS 관계
   HTTP = 규칙(언어) / Ajax = 그 HTTP를 "JS로·비동기로·부분만" 쓰는 방법 / JS코드 = 실제 일하는 주체

### ❓ 내가 헷갈렸던 것 (4강)

1. Ajax = 프로그래밍 / 언어 아님! "방법(기술)"의 이름
2. 리렌더링 = 화면 다시 그리기 (부분만 = 안 깜빡)
3. HTTP = 규칙 / Ajax = 방법 / 자바스크립트 = 내가 짠 코드 (브라우저 자체 아님)

### 💡 한 줄 정리 (4강)

Ajax = 새로고침 없이 부분만 바꾸는 통신 "방법". 내 JS코드가 Ajax방식으로 HTTP규칙 써서 통신.

## 🚉 5강 — XMLHttpRequest → fetch

1. 4개 용어 관계 (HTTP / HTTP Request / Ajax / XMLHttpRequest·fetch)
   HTTP = 규칙(언어)
   HTTP Request = 보내는 "요청 하나"(주문서) 📋
   Ajax = HTTP를 JS로 비동기로 쓰는 "방법"
   XMLHttpRequest / fetch = Ajax를 "실행하는 도구(코드)" 🛠️
   → XMLHttpRequest ≠ Http Request! (도구 vs 주문서, 이름만 비슷)
2. XMLHttpRequest(옛, 콜백 → 지옥 ) → fetch(신, Promise → 깔끔). 전화기만 바뀜. 하는 일(Ajax)은 같음.

3. fetch = 브라우저 API 함수(브라우저 API), Promise 반환 → .then/await 사용.

4. 포트(port) = 컴퓨터 안의 "문 번호" 🚪 (IP=건물주소 / 포트=몇 호실)
   80 = HTTP 기본 문 / 443 = HTTPS 기본 문 (자동 생략됨 , naver.com = naver.com:80)
   localhost:3001 의 3001 = 포트!

### ❓ 내가 헷갈렸던 것 (5강)

1. 넷 관계: HTTP = 규칙 / HTTP Request = 주문서 / Ajax = 방법 / fetch·XMLHttpRequest = 실행도구
2. XMLHttpRequest ≠ HTTP Requset (도구 vs 주문서)
3. fetch = 브라우저가 준 함수 (setTimeout도 같음 - 호출은 내가 , 일은 브라우저가)
4. 포트 = 문 번호 (localhost:3001의 3001) /80=HTTP, 443=HTTPS 자동
5. httpd·Spring = 백엔드 서버 내부 (Spring=자바 백엔드, React는 프론트)

### 💡 한 줄 정리 (5강)

Ajax = 방법 / fetch = 그걸 실행하는 "브라우저 함수" (Promise 반환). XMLHttpRequest(옛)→fetch(신).

## 🚉 6강 — fetch 실제로 쓰기 (런타임)

1. 기본 코드 (fetch → json → data)
   async function getData() {
   const response = await fetch("...") // 겹1 : 상자 받기
   const data = await response.json(); // 겹2 : 상자 열어 내용물
   console.log(data);
   }

2. 두 겹 상자 (선물 안에 또 선물🎁)
   겹1: Promise 상자 → await → Response 객체
   겹2: Response → response.json() → 실제 data
   → 그래서 await 두 번!

3. fetch도 setUser/Promise랑 똑같은 구조. 단 ①상자 안엔 Response ②resolve를 "브라우저가" 자동 ③두 번.

### 🖼️ 그림 — fetch 런타임 트레이스 (겹1 + 겹2)

[겹1 - fetch]
getData() 호출 → 상자0 생성(async) → 콜스택 push
fetch() "먼저" 실행 → 브라우저API에 위임 → 상자1(pending) 반환
await → getData 멈춤⏸️ → "뒤 코드" 상자1에 저장 → 콜스택 빔
(브라우저가 서버 갔다옴) → Response 만듦 → resolve(브라우저!) 📥
→ 상자1 fulfilled + 값 담기 + 저장된 뒤코드 마이크로큐로 🚚
이벤트루프 → 콜스택 → 재개 → await이 Response 꺼냄 📤 → response

[겹2 — json] ★ 똑같은 패턴!
response.json() "먼저" 실행 → 브라우저API 위임 → 상자2(pending)
await → 멈춤⏸️ → 뒤코드 상자2에 저장 → 콜스택 빔
(파싱 끝) → resolve(브라우저!) → 상자2 fulfilled + 마이크로큐로
이벤트루프 → 콜스택 → 재개 → data 꺼냄 📤 → console.log(data) 📺

상자 3개: 📦0(getData,async자동) 📦1(fetch) 📦2(json)

### ❓ 내가 헷갈렸던 것 (6강)

1. fetch 상자 안엔 “Response”가 담김 (request X, url X)
2. 담기(resolve)=브라우저가 자동 📥 / 꺼내기(await)=내가 📤
3. 두 겹 상자 → await 두 번 (선물 안에 또 선물)
4. fetch는 "부탁", 실제 통신은 [브라우저 API]가 (JS엔진은 네트워크 못함)
5. await 뒤 코드 = 상자 안에 "저장(등록)" / resolve가 마이크로큐로 "이동"
6. await보다 fetch/json이 "먼저 실행"(상자 생성) → await가 기다림

### 💡 한 줄 정리 (6강)

fetch = 상자 받기 → await로 Response 꺼냄 → json()으로 또 벗겨 data. 두 겹이라 await 두 번.

## 🚉 7강 — JSON / 파싱

1. JSON = 데이터를 "글자(문자열)"로 표현한 형식📝 (객체처럼 생겼지만 글자!)
   객체: {name: "dora" , age: 30} // 진짜 객체
   JSON: `{"name" : "dora" , "age" : 30}` // 글자 ! 키도 "큰 따음표"

2. 파싱 = 글자(JSON) → 🔄. response.json()이 함 (클라이언트에서!).

3. 대칭! (보내기 ↔ 받기)
   보낼 때 : 객체 → JSON 글자 = JSON.stringfy() (우리가 직접! 자동 아님)
   받을 때 : JSON 글자 → 객체 = response.json() (우리가 호출)

4. 인스턴스 / 형식별 메서드(.json/.text/.formData)

### ❓ 내가 헷갈렸던 것 (7강)

1. JSON = 글자(문자열) / 파싱 = 글자→객체 변환
2. 파싱은 "클라이언트(브라우저)"에서 response.json()으로 (서버는 글자로 보냄)
3. 주고받을 땐 항상 글자 (JSON = string) 그래서 백엔드가 → "string"이라 함
4. 보낼 때 객체 → JSON은 자동 아님! JSON.stringfy()로 직접
5. 이행 = fulfilled = resolve됨 (다 같은 말) / 인스턴스 = 틀로 직은 실제 하나

### 💡 한 줄 정리 (7강)

JSON = 글자 형식 / 파싱 = 글자 → 객체. 받기 response.json() ↔ 보내기 JSON.stringify() (대칭).

## 🧩 전체 헷갈렸던 것 한눈 정리

1. 클라/서버 = 역할(컴퓨터 X) / 클라=프론트 , 서버 = 백엔드(DB)
2. HTTP = 웹 공용 약속 (JS와 무관) / 웹 공간 , 인터넷 = 길 , IP = 집주소 , 포트 = 문번호
3. Request ≠ Response (1:1 X) / 받을 땐 데이터는 서버가 줌
4. 상태코드 : 200성공 / 404없음 / 500서버에러
5. 메서드 : GET조회(가져오기) / POST생성(보내기) / PUT수정 / DELETE삭제
6. Ajax = "방법" (언어X) / fetch = 그걸 실행하는 "브라우저 함수" (Promise 반환)
7. fetch: 상자 안 = Response, 담기 = 브라우저 , 꺼내기 = await , 두 겹→await 2번
8. JSON = 글자 / 파싱 (json) = 글자→객체 / stringfy = 객체→글자 (대칭)
9. 실제 통신은 [브라우저 API]가 (fetch는 부탁, JS엔진은 네트워크 못함)

## 🔁 2차 복습 Q&A (노트 다시 치면서 내가 또 물어본 것)

<!-- 질문 → 답 형식. 헷갈렸다가 두 번째에 정리된 것들 -->

### Q1. "담기 = 브라우저" 가 무슨 뜻?

(답: 우리가 new Promise 로 만든 상자는 우리가 resolve 로 채웠지만 , fetch 상자는 [브라우저]가 통신 끝나고 알아서 resolve(response)해줌. → "담기(resolve)를 브라우저가 대신" = 담기 = 브라우저)

### Q2. 보안은 왜 백엔드 책임이 더 커?

답: "믿을 수 있는 최종 판정"이 서버에서 일어나니까 (비번 대조, 권한 체크). 클라(브라우저) 코드는 사용자가 F12로 조작 가능해서 못 믿음. 그래서 정답을 쥔 백엔드가 보안 무게 큼. (프론트도 https·토큰은 챙김)

### Q3. ⭐ fetch 전체 그림 — url + options, body만 글자, Request는 누가 만드나

a) options는 객체 , 그 안 body 값만 "글자(string)"
b) fetch 인수로 Request 객체를 넘기나? → 아니 (보통 url 글자 + options 객체), Request는 [브라우저 API]가
내부에서 만듦
c) Response는 [브라우저] 가 서버 답으로 만들어 상자에 담아줌

**fetch 문법**

```
fetch(url, options)
//    ①URL글자   ②options객체(생략가능, 생략시 GET)
```

**경우 1 — GET (받기, body 없음)**

```
fetch("https://shop.com/products")   // 인수: URL 글자 1개뿐
   │
   ▼ [브라우저 API]
   1. Request 내부에서 만듦 📋 { url, method:GET, body:없음 }
   2. 선로로 글자 전송 ──▶ [서버]
   3. 즉시 pending 빈 상자 반환 📦
   │
   ▼ (서버 답) → [브라우저]가 Response 객체 만듦 → resolve → 상자 채움
const response = Response 객체 📦 (아직 글자 덩어리)
   ▼ response.json() → 또 상자 → await
const data = { ... } ✅ 진짜 객체
```

**경우 2 — POST (보내기, body 있음)**

```
fetch("https://shop.com/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: "dora", pw: "1234" })  // 객체 → 글자!
})
      │ options 객체 안에서 body 값만 "글자(string)"
      ▼ [브라우저 API]가 Request 만들어 선로로 전송 ──▶ [서버]
```

**⭐ fetch 전체 그림 -세 줄 정리**

- a) options는 ( 객체 ), 그 안 body 값만 ( "글자" (string) )
- b) fetch 인수로 Request 객체를 넘기나? → 아니(보통 url 글자 + options 객체), Request는 (브라우저 API)가 내부에서 만듦
- c) Response는 (브라우저)가 서버 답으로 만들어 상자에 담아줌

### Q4. CRUD 는 어디서 나온 개념? HTTP랑 관계는?

(답: CRUD = (데이터베이스 (DB)) 세계(1980s)에서 나온 ( 데이터 분류 개념 (Create/Read/Update/Delete).HTTP 메서드가 그걸 빌려와 (매핑해) 씀 (C→POST, R→GET, U→PUT , D→DELETE). CRUD가 먼저, HTTP가 나중.))

### Q5. Ajax 재정리 (4가지)

```
Ajax = 새로고침 없이 (   부분만     ) 바꾸기   ← 목적
  + (   비동기     )  (Asynchronous)
  + (   Javascript    ) 로 조작
  + 데이터는 (   JSON     ) 형식(글자)으로 주고받음
```

### Q6. 포트 80 / 443 과 http / https

(답: 포트 번호 자체는 보안 X, 그냥 ( 문 번호 🚪 ) /
암호화하는 건 ( https )라는 약속 🔒 → 기본 문이 443 /
http 는 암호화 X → 기본 문이 80)
(순서 : "https(암호화)를 쓰니까 안전" → 걔 기본 문이 443"이지, “443이라서 안전”이 아님!)



## 🎟️ 토큰 (로그인 후 받는 "출입증")
<!-- 서러웠던 단어 정복! HTTP는 기억을 못 한다(stateless) → 그래서 출입증이 필요 -->

### 1) 왜 필요한가 (★핵심)
HTTP = ("상태 없음(stateless)" 성질 → [서버]는 요청 하나하나를 ( "처음 보는 남" )으로 대함. 방금 로그인한 사람인지 ( 기억 못함).
→ 식당 점원이 ( 기억상실 )증이라, 주문마다 "누구세요?" 묻는 꼴.

### 2) 비유
( 클럽 입장 팔찌. 입구에서 신분 확인(로그인) 한 번 하면 팔찌 채워주고, 안에서는 팔찌만 보여주면 통과. 매번 신분증 안 봐도 됨. )

### 3) 생애주기 — 시간순
```
[t0] 아직 토큰 ( 없음 ) (처음이니까)
     로그인 요청: 클라 ──▶ 서버
       body: { id, pw }        ← 민증 제출 📋
       header: 토큰 ( 없음 )    ← 아직 못 받았으니까

[t1] 서버: DB 대조 → "맞네 통과" → 토큰🎟️ 생성
     서버 ──▶ 클라
       Response ( body )에 토큰 담겨 옴 📦   ← 보통 JSON

[t2] 클라의 "내 JS 코드"가 토큰 꺼내 저장 (★누가? 내 JS 코드 )
       localStorage.setItem("token", data.token)

[t3] 이후 다른 요청들 (장바구니·내정보)
     클라 ──▶ 서버
       header: { Authorization: "Bearer 토큰🎟️" }  ← 토큰만!
       body: 비번 ( 없음 )   ← ⚠️ 다신 안 보냄

[t4] 서버: 토큰 검증 → 통과 ✅
```

### 4) 네 질문 4개 (정리)
- Q. 토큰은 로그인 때만? → 발급은 ( 로그인 때 한 번 ), 사용은 ( 그 후 로그인 필요한 모든 요청마다 )
- Q. 순서? → 처음엔 토큰 없음 → ( id+pw(body) ) 보내 → 서버가 ( 토큰 ) 발급
- Q. 로그인 후에도 id+pw 다시 보내? → 아니. ( 토큰 ) 만 보냄
- Q. 토큰 저장은 브라우저가 자동? → ( 아니 ). resolve는 ( Response를 상자에 담기 )까지만, 저장은 ( 우리 JS 코드가 직접 )

### 5) 토큰 안엔 뭐가?
토큰🎟️ 안에 이미 "( 나 dora야 (누인지) )" 정보가 암호로 들어있음 → 서버가 까보면 누구인지 앎
→ 그래서 보통 ( 아이디 )도 생략, 토큰 하나만. (팔찌에 이름표가 붙은 셈)

### 💡 한 줄 정리
HTTP는 ( 기억 )를 못 하니까 → 로그인 때 비번 보내 ( 토큰 ) 받고 →
이후엔 비번 대신 ( 토큰 )만 들고 다님. 저장은 브라우저 자동 아님, (우리 손/JS 코드)!

