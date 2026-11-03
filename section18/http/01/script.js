// XMLHttpRequest를 사용한 AJAX 요청 예시
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    // console.log(data);
  }
};
// xhr.send();

// 콜백 지옥에 빠짐으로 요즘엔 사용하지 않음

// fetch API를 사용한 Ajax 요청 예시
// 메서드 : GET (조회)
// const result = fetch("https://eduapi.weniv.co.kr/1/blog");
// console.log(result);

// -> 콘솔 결과가 일단 TypeError: Failed to fetch 에러 발생
// -> Uncaught (in promise) = 이게 catch 안 넣어서 생긴 부분. reject 된 Promise 를 아무도 안 받아서 그대로 터짐

// Uncaught (in Promise) 해결하기
// 📌 fetch 흐름 추적 (내가 설명한 버전)
//
// try = 성공 대본 📜 / catch = 실패 대본 🚨
// 실행 전엔 성공/실패 모름 → 일단 성공 대본을 try에 써둔다

async function getBlog() {
  // await 쓰려면 async 필수 (await는 async 안에서만)
  try {
    // ── 성공 대본 ──
    // [브라우저 API]가 url을 Request로 만들어 서버에 배달
    // 성공(resolve)하면 Response 객체가 상자에 담김 → await로 꺼내 result에
    // const result = await fetch("https://eduapi.weniv.co.kr/1/blog");

    // 서버가 준 건 글자(JSON 문자열) → .json()으로 객체화
    // .json()도 또 Promise(상자 2번째) → await 한 번 더 꺼냄 🎁🎁
    const data = await result.json();

    // console.log(data); // 성공하면 data = 객체!
  } catch (err) {
    // ── 실패 대본 ──
    // await가 reject 만나면 → throw 💥 → try 중단 → 여기로 점프
    // 지금 url: 도메인(DNS)을 못 찾음 → 서버 도착 전 reject
    // err = 에러 객체 (TypeError: Failed to fetch)
    // console.log("에러 잡음:", err);
  }
}

getBlog(); // ③ 함수는 "정의"만 한 상태 → 호출해야 Call Stack에 push되어 실행됨

// 실제 URL 사용해서 fetch() 요청
// GET
const result = fetch("https://jsonplaceholder.typicode.com/posts");
console.log(result);

result.then((response) => response.json()).then((json) => console.log(json));

// 성공 URL
async function getSuccessBlog() {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await result.json();
  console.log(data);
}
getSuccessBlog();

// ============================================
// 🔁 fetch 복습 3종 세트 (돌려보고 콘솔 비교하기)
// ============================================
//
// 핵심 2줄:
// 1) data ≠ err  : 한 실행에 둘 중 하나만 생김 (성공→data / 실패→err)
// 2) 404 ≠ Failed to fetch : "서버에 도착했냐"로 갈림
//      - 404           = 도착함 → resolve ✅ → catch 안 탐 (함정!)
//      - Failed to fetch = 도착 못 함 → reject ❌ → catch 탐

// ① 실패 길 🚨 — 서버 도착 못 함 → catch 로 점프
async function testFail() {
  try {
    const result = await fetch("https://no-such-domain-1234.com/blog"); // 없는 도메인
    const data = await result.json();
    console.log("성공 data:", data); // ⛔ 여기 안 옴
  } catch (err) {
    console.log("① 에러 잡음:", err); // ✅ 여기 뜸 (TypeError: Failed to fetch)
  }
}
testFail();

// ② 성공 길 📜 — data 100개 → try 끝까지
async function testSuccess() {
  try {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json(); // 글자 → 객체 (상자 2번째 🎁)
    console.log("② 성공 data:", data); // ✅ (100) [{…}, …] 배열
  } catch (err) {
    console.log("에러 잡음:", err); // ⛔ 여기 안 옴 (사고 없음)
  }
}
// testSuccess();

// ③ 404 함정 ⚠️ — resolve 되지만 ok=false → 내가 직접 체크해야
async function test404() {
  try {
    const result = await fetch("https://jsonplaceholder.typicode.com/unknown");
    console.log("③ ok?", result.ok, "/ status:", result.status);

    if (!result.ok) {
      throw new Error("웅답 실패: " + result.status);
    }
    const data = await result.json();
    console.log("③ data:", data);
  } catch (err) {
    console.log("③ 에러 잡음:", err);
  }
}
test404();
