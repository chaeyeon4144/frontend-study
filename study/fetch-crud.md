# fetch 로 CRUD (POST / GET / PUT / DELETE)

> eduAPI 연습: https://dev.wenivops.co.kr/services/fastapi-crud/1/blog
> CRUD = 데이터로 할 수 있는 4가지 기본 동작

## 1. CRUD 4종 한눈

|             | 하는 일     | 메서드 | 주소에 id?          | body? |
| ----------- | ----------- | ------ | ------------------- | ----- |
| **C** reate | 새로 만들기 | POST   | ❌                  | ✅    |
| **R** ead   | 읽어오기    | GET    | ❌(전체) / ✅(하나) | ❌    |
| **U** pdate | 수정하기    | PUT    | ✅ (백틱!)          | ✅    |
| **D** elete | 삭제하기    | DELETE | ✅ (백틱!)          | ❌    |

❓ body 가 뭐지? 왜 POST·PUT 엔 있고 GET·DELETE 엔 없을까?

- **body = "서버로 보낼 내용"** — 만들기(POST)·수정(PUT)은 보낼 내용이 있으니 body O(있음).
- 읽기(GET)·삭제(DELETE)는 "뭘 보낼" 게 없음(id만 알면 됨) → body X.

## 2. 템플릿 리터럴 — 백틱(`` ` ``) vs 따옴표(`"`)

`${변수}` 는 백틱 안에서만 값으로 바뀐다. 따옴표 안이면 그냥 글자.

❓ `"blog/${id}"` 와 `` `blog/${id}` `` 는 각각 뭐라고 찍힐까? 왜?

```js
const id = 1;
// 백틱 vs 따옴표 예시
// -> "blog/${id}"   ❌ 글자 그대로 (복사기)
// → "blog/1"        ✅ 값으로 바뀜 (계산기)
```

❓ 내가 겪은 422 / `int_parsing` 에러는 왜 났지? (힌트: `$%7Bid%7D`)
: 주소를 따옴표로 써서  `${id}`가 글자 그대로 서버로 감
(`.../blog/$%7Bid%7D` = `.../blog/${id}`). 서버: "이건 숫자가 아닌데?" `int_parsing` → 422.
👉 id 들어가는 주소엔 **무조건 백틱.**



## 3. fetch 는 인자 몇 개? — fetch 인자는 2개 `fetch(URL, 옵션)`
[브라우저 API] fetch 한테 종이 2장을 한 손 (괄호)에  쥐여준다
❓ 괄호 안에 순서대로 뭐가 들어가지?
- 1 번째 = 주소 (URL) - 필수
- 2 번째 = 옵션 객체 `{method , headers , body}` - 선택

```js
fetch(`...blog/${id}`, { method: "PUT", ... })
//                   ↑쉼표              ↑괄호는 옵션 다 끝나고 닫는다
```

⚠️ **내가 한 실수**: URL 뒤에서 괄호를 먼저 닫음 → 옵션이 괄호 밖으로 나감
→ method 를 못 봐서 기본 GET 으로 동작함.

❓ 괄호를 URL 뒤에서 먼저 닫아버리면 무슨 일이 생겨? (왜 PUT 이 GET 처럼 동작했지?)

## 4. try / catch 구조 - 중괄호 3세트

❓ 중괄호가 몇 세트? (무엇 / 무엇 / 무엇)

- 함수 `{ }` / try `{ }` / catch `{ }` 세 세트. try 와 catch 는 `} catch (error) {` 로 한 세트.

❓ try 와 catch 는 어떻게 붙어야 하지?

```js
async function fn() {        // 함수 열기
  try {                      // try 열기
    // ... 성공 대본
  } catch (error) {          // try 닫고 catch 열기
    // ... 비상구
  }                          // catch 닫기
}                            // 함수 닫기 (맨 끝!)
```

## 5. 응답 처리 + "쓰기 후 GET 재확인"

❓ `response.json()` 은 뭘 하는 거지?

- `const data = await response.json();` → [브라우저 API] 가 글자 응답을 객체로 바꿔줌 (두 겹 상자).

❓ PUT / DELETE 응답은 뭘 돌려줬지? 실제 바뀐 내용은 어떻게 확인해?

- PUT / DELETE 응답은 "성공 영수증"만 준다 : `{ message: "Blog updated successfully" }`
- 실제 바뀐 내용을 보려면 → **GET 을 다시 돌려서 확인** (강사도 같은 말 함).
- 비유 📮: "주소 바꿔주세요"(PUT) → "네 바꿨어요"(영수증). 바뀐 주소록 보려면 다시 펼쳐봐야(GET).

## 6. 실제 코드 4종 (직접 쳐보기)

```js
const BASE = "https://dev.wenivops.co.kr/services/fastapi-crud/1/blog";

// R — getBlog (전체 읽기)
async function getBlog() {
  try {
    const response = await fetch(BASE);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// C — postBlog (만들기)
async function postBlog(title , content) {
  try {
    const response = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// U — putBlog (수정 — 백틱 id + body)
async function putBlog(id, title, content) {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// D — deleteBlog (삭제 — 백틱 id, body 없음)
async function deleteBlog(id) {
  try {
    const response = await fetch(`${BASE}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

> 참고: GET·POST 는 `.then().then().catch()` 로도 쓸 수 있다.
> async/await 가 더 평평하게 읽혀서 요즘 메인. (`JSON.stringify({ title, content })` 는
> `{ title: title, content: content }` 의 줄임 - key 와 변수 이름이 같으면 한 번만 써도 됨.
> )

## ❓ 헷갈렸던 것

- **"1 넣었는데 왜 0번에?"** → 숫자 "1"이 3개나 있다:
  ① 배열 자리번호(0,1,2… **0부터!**) ② `index` 속성 ③ `id`(긴 UUID).
  `deleteBlog(1)` 의 1 은 ③ 쪽(서버가 아는 글) → ① 배열 자리랑 무관.
- **`getblog` 는 에러, `getBlog` 는 됨** → JS 는 대소문자를 완전히 구별한다.
- **삭제했는데 왜 계속 5개?** → 연습용(mock) API 라 내 변경을 저장 안 함.
  증거: GET 할 때마다 `id` 가 매번 바뀜 = 서버가 매번 새 더미 5개를 만들어 줌. 내 코드 잘못 아님.


### 🎢 놀이공원 비유 (내가 이해한 거)
한 사람한테도 번호가 여러 개다:
- 줄 선 순서(앞에서 3번째) = **배열 자리번호** (단, JS는 0부터라 "0번째")
- 주민등록번호 970... = **id** (글마다 붙은 고유 암호)
- 놀이공원 표번호 59585 = **index** (서버가 매긴 또 다른 순번)

→ 같은 사람(글)인데 번호가 3개, 서로 다름.

→ `deleteBlog(1)` 의 1 은 **서버가 아는 글 번호(③ id 쪽)** 를 가리키고,
그 글이 목록에선 **배열 0번 칸**에 보인다.
= 배열 자리(①) 랑 서버 번호(③) 는 **전혀 다른 번호!**
배열은 0부터 세니까 맨 앞 = 0번 ("1 넣었으니 1번 칸" 아님)

> index 가 null 인 이유는 서버 맘이라 100% 확언은 못 함 (수정된 글이라 비워둔 걸로 보임).
> 핵심 = 배열자리 / index / id 는 같은 글의 서로 다른 번호 3개.