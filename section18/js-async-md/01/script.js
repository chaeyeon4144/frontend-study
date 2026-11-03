// 동기적으로 동작하는 코드
// console.log("Hello");
// console.log("world");

// // 비동기적으로 동적하는 코드
// setTimeout(() => {
//   console.log("Hello");
// }, 0);
// console.log("world");

// 콜스택이 함수를 어떤 순서로 관리하는지 확인하기
// const 참깨빵 = () => {
//   console.log("Call 참깨빵");
//   순쇠고기패티();
//   console.log("End 참깨빵");
// };
// const 순쇠고기패티 = () => {
//   console.log("Call 순쇠고기패티 ");
//   특별한소스();
//   console.log("End 순쇠고기패티");
// };
// const 특별한소스 = () => {
//   console.log("Call 특별한소스");
//   console.log("End 특별한소스");
// };

// 참깨빵();
// console.log("-- 함수 호출 종료 --");

// 비동기 제어
// const user = {};

// setTimeout(() => {
//   user.name = "weniv";
// }, 0);

// console.log(user);

// 비동기 제어 - 콜백 함수
const user = {};

function setUser(callback) {
  setTimeout(() => {
    user.name = "weniv";
    user.age = 20;
    callback(user);
  }, 1000);
}

function printUser(user) {
  console.log(user);
}

// setUser(printUser);
// 화살표 함수
// setUser((user) => console.log(user));

function roleCheck(user, callback) {
  setTimeout(() => {
    if (user.age >= 20) {
      user.role = "성인";
    } else {
      user.role = "힉셍";
    }
    callback(user);
  }, 1000);
}

setUser((user) => roleCheck(user, printUser));
