# DOM 다루기 (요소 찾기 → 내용 넣기 → 화면 그리기)

> 상품 목록 프로젝트(js-practice/product-list)에서 쓴 것 정리

## 1. DOM 이 뭐야?
❓ HTML 과 DOM 의 차이는? 왜 객체로 변환해야 하지?
- **HTML = 글자**, **DOM = [브라우저]가 그 글자를 읽어서 만든 "객체(만질 수 있는 것)"**
- 왜 변환? → [JS엔진]은 **글자는 못 만지고 객체만** 만질 수 있음. 그래서 브라우저가  글자 → 객체로 바꿈 = ** 파싱 (parsing) **
- (서버 JSON 글자 → `response.json()` → 객체 랑 똑같은 원리!)
- **DOM = Document Object Model** (문서를 객체로 만든 모델)
- **node = 트리의 각 "마디"** (태그 하나 = 객체 하나). 마디가 또 자식 마디를 품음 → "DOM 트리"
❓ node 가 뭐야? node.js 랑 같은 거야?
-⚠️ **node ≠ node.js** - node 는 "마디"란 영어 단어 / Node.js 는 JS를 컴퓨터에서 돌리는 프로그램 이름. 철자만 같고 무관.
❓ document 는 뭐야?
- **document = DOM 트리 전체를 가리키는 최상위 객체.**

비유 🧱 - html 파일 = 레고 설명서(글자) / DOM = 조립해 놓은 레고 (실물)  / JS = 레고 잡는 손.

## 2. 요소 찾기 — querySelector
❓ `document.querySelector("...")` 는 뭘 하지? 괄호 안엔 뭐가 들어가?
- **`document.querySelector("CSS선택자")`** = 조건 맞는 요소 (마디) **첫 하나**를 찾아 돌려줌.
- 괄호 안엔 **CSS 선택자 그대로**: '"h1"'(태그) '.box(클래스)' `#list`(dkdlel) `:nth-child` 등.

❓ 못 찾으면 뭘 돌려줘?
- **못 찾으면 `null`** 반환.
- 집어온 걸 변수에 담아 두고 만짐: `const list = document.querySelector("#list");`
- (참고) 'querySelectorAll' = 맞는 거 전부 / 'getElementById("id")' = 같은 가족.

비유 📣 - CSS 와 JS 가 같은 "이름표(선택자)"로 요소를 부름. CSS는 불러서 꾸미고, JS는 불러서 집어옴.

```js
document.querySelector("h1");     // h1 요소
document.querySelector("#list");  // id=list 요소
document.querySelector(".없는거"); // null
```

## 3. 내용 넣기 — textContent vs innerHTML
- **`집어온요소.textContent = "..."`** → 넣은 걸 **글자 그대로** (태그도 글자로 보임)
- **`집어온요소.innerHTML = "..."`** → 넣은 글자를 **브라우저가 파싱 → 객체(node)로** 만들어 넣음 (태그가 진짜 태그로 적용)
- ⭐ 넣는 건 **둘 다 "글자"**. 차이는 innerHTML 이 그 글자를 **파싱해 객체로** 바꾼다는 것 (= 1번 "글자→객체"가 작은 규모로 또 일어남).
- **속성(property)이라 괄호 없음**: `.textContent` `.innerHTML` (vs `.querySelector()`·`.json()` 은 메서드, 괄호 있음)
- 요소도 **객체**라 `점 표기법`으로 접근 (세션6): `user.name` 처럼 `list.innerHTML`.

```js
// 예시 직접 써보기
const list = document.querySelector("#list");
list.textContent = "<b>안녕</b>";  // 화면: <b>안녕</b> (글자 그대로)
list.innerHTML  = "<b>안녕</b>";   // 화면: 안녕 (굵게)


## 4. 실전 — fetch 배열을 화면에 카드로
- **map** = 배열의 각 요소를 변환해 **새 배열**을 만듦. 여기선 상품객체 → 카드 HTML 글자.
  - `product` = "지금 돌고 있는 상품" (1바퀴 data[0], 2바퀴 data[1]...). `data[0]` 은 0번 고정이라 ❌.
- **`.join("")`** = 카드 글자 배열을 **하나의 긴 글자**로 이어붙임 (innerHTML 은 글자 하나만 받으니까). 안 하면 카드 사이에 쉼표 `,` 생김.
- `${}` = JS가 값 넣는 구멍 / `src="..."` 의 따옴표 = HTML 속성 감싸는 따옴표 (다른 것!).

```js
const list = document.querySelector("#list");
const cards = data.map((product) => `
  <div class="card">
    <img src="${product.thumbnailImg}" />
    <h2>${product.productName}</h2>
    <p>${product.price.toLocaleString()}원</p>
  </div>
`).join("");
list.innerHTML = cards;
```

전체 흐름: `fetch`(받기) → `map`+백틱(카드 글자 만들기) → `join`(합치기) → `innerHTML`(화면에).
## ❓ 헷갈렸던 것
- **node vs node.js** → 마디(영어단어) vs 프로그램 이름. 무관.
- **"콘솔이라서 파싱된 거야?"** → 아니. **`innerHTML` 에 대입해서** 파싱된 것. 콘솔이든 script.js든 똑같음.
- **콘솔 빨간 글씨 vs 화면 결과** → 콘솔에 나온 건 "대입식이 돌려준 값(내가 넣은 글자)"일 뿐. 진짜 결과는 **화면**에 있음.
- **`src="${...}"` 따옴표** → `${}` 는 JS 값 구멍, `"..."` 는 HTML 속성 따옴표. 둘은 다른 일. (퍼블리싱 때 `<img src="...">` 쓰던 그거)
- **object-fit 은 왜 height 필요?** → cover 는 "액자에 꽉 채우고 넘치면 자르기". **액자(상자) 크기가 고정돼야** 자를지 결정 가능. height 없으면 상자가 사진 따라 늘어나 자를 게 없어서 안 보임.