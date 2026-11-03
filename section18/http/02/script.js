//  Fetch API 실습
// GET , POST , PUT , DELETE 메서드 요청 실습

// https://api-guide.weniv.co.kr/

// 00. GET 요청 실습
function getBlog() {
  const result = fetch(
    "https://dev.wenivops.co.kr/services/fastapi-crud/1/blog",
  );
  console.log(result);

  result.then((response) => response.json()).then((data) => console.log(data));
}

// 01. POST 요청 실습
function postBlog(title, content) {
  fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title, // 게시글 제목
      content: content, // 게시글 내용
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
// postBlog("안녕하세요!", "첫 번째 게시글 내용입니다!");
getBlog();

// 02. PUT 요청 실습
// async / await 문법을 활용해서 PUT 요청
async function putBlog(id, title, content) {
  try {
    const response = await fetch(
      `https://dev.wenivops.co.kr/services/fastapi-crud/1/blog/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title, // 게시글 제목
          content: content, // 게시글 내용
        }),
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
putBlog(1, "수정된 제목", "수정된 내용");

// try catch 문법 사용해서 PUT 요청

// script.js:40  PUT https://dev.wenivops.co.kr/services/fastapi-crud/1/blog/$%7Bid%7D 422 (Unprocessable Content)
// putBolg @ script.js:40
// (익명) @ script.js:56
// script.js:54 {detail: Array(1)}detail: Array(1)0: input: "${id}"loc: Array(2)0: "path"1: "blog_id"length: 2[[Prototype]]: Array(0)msg: "Input should be a valid integer, unable to parse string as an integer"type: "int_parsing"[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (…)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()length: 1[[Prototype]]: Array(0)[[Prototype]]: Object

// 03. DELETE 요청 실습
async function deleteBlog(id) {
  try {
    const response = await fetch(
      `https://dev.wenivops.co.kr/services/fastapi-crud/1/blog/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
deleteBlog(1);
