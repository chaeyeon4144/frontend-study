const user = {};

function setUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      user.name = "dora";
      user.age = 30;
      resolve(user);
    }, 1000);
  });
}

function printUser(user) {
  console.log(user);
}

function roleCheck(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.age >= 20) {
        user.role = "성인";
      } else {
        user.role = "학생";
      }
      reject(new Error("새로운 오류!"));
      resolve(user);
    }, 1000);
  });
}

// async / await 연습
async function registerUser() {
  try {
    const user = await setUser();
    const checkedUser = await roleCheck(user);
    printUser(checkedUser);
  } catch (error) {
    console.log();
    console.log(error);
  }
}
registerUser();
