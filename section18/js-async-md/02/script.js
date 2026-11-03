// 생성할 객체를 담을 변수 생성
// const promise = new Promise((resolve, reject) => {
//   // resolve("요청 완료");
//   reject("요청 실패");
// });
// console.log(promise);

// promise 가 비동기 처리를 할 수 있는지 확인
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("요청 완료");
    reject("요청 실패");
  }, 1000);
});

promise
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("프로미스 종료 !");
  });
