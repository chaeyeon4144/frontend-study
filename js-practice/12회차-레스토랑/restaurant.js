// ========================================
// 문제 1: 총 식사 비용 계산 (Number, 사칙연산)
// 스토리: 스테이크 2개(각 35000), 파스타 1개(25000), 피자 1개(28000) 주문
// 요구사항:
//   1. steakPrice 변수에 35000
//   2. pastaPrice 변수에 25000
//   3. pizzaPrice 변수에 28000
//   4. totalPrice 계산 후 출력 (스테이크는 2개!)
// ========================================

// ↓ 여기에 직접 작성

const steakPrice = 35000;
const pastaPrice = 25000;
const pizzaPrice = 28000;

const totalPrice = steakPrice * 2 + pastaPrice + pizzaPrice;
console.log(totalPrice);

// ========================================
// 문제 2: 할인 후 최종 금액 (Number, 사칙연산)
// 스토리: VIP 할인 - 총 금액에서 15000원 할인
// 요구사항:
//   1. originalPrice 변수에 123000
//   2. discount 변수에 15000
//   3. finalPrice 계산 후 출력
// ========================================

// ↓ 여기에 직접 작성

const originalPrice = 123000;
const discount = 15000;
const finalPrice = originalPrice - discount;
console.log(finalPrice);

// ========================================
// 문제 3: 1인당 금액 계산 (Number, 나눗셈)
// 스토리: 108000원을 4명이 나눠 냄
// 요구사항:
//   1. totalAmount 변수에 108000
//   2. people 변수에 4
//   3. perPerson 계산 후 출력
// ========================================

// ↓ 여기에 직접 작성

const totalAmount = 108000;
const people = 4;
const perPerson = totalAmount / people;
console.log(perPerson);

// ========================================
// 문제 4: 가족 구성원 정보 배열 (Array)
// 스토리: 김민준(부), 박지영(모), 김도윤(아들), 김서연(딸)
// 요구사항:
//   1. familyMembers 배열 선언
//   2. '김민준','박지영','김도윤','김서연' 순서대로
//   3. 아들(3번째), 딸(4번째) 출력
// ========================================

// ↓ 여기에 직접 작성

const familyMembers = ["김민준", "박지영", "김도윤", "김서연"];
console.log(familyMembers[2], familyMembers[3]);

// ========================================
// 문제 5: 음료 주문 추가 (Array)
// 스토리: ['스테이크','파스타','피자']에 '와인','오렌지주스' 추가
// 요구사항:
//   1. orderList = ['스테이크','파스타','피자']
//   2. '와인','오렌지주스' 추가해 새 배열 만들기
//   3. 전체 출력
// ========================================

// ↓ 여기에 직접 작성

const orderList = ["스테이크", "파스타", "피자"];
const addOrderList = [...orderList, "와인", "오렌지주스"];
console.log(addOrderList);

// ========================================
// 문제 6: 예약 정보 객체 (Object)
// 스토리: 예약자 김민준, 인원 4, 시간 19, 테이블 12
// 요구사항:
//   1. reservation 객체 선언
//   2. name(김민준), people(4), time(19), table(12) 속성
//   3. 예약자 이름, 테이블 번호 출력
// ========================================

// ↓ 여기에 직접 작성

const reservation = {
  name: "김민준",
  people: 4,
  time: 19,
  table: 12,
};
console.log(reservation.name, reservation.table);

// ========================================
// 문제 7: 메뉴 정보 객체 (Object)
// 스토리: 안심 스테이크, 35000원, 인기 메뉴(true)
// 요구사항:
//   1. menu 객체 선언
//   2. name(안심 스테이크), price(35000), isPopular(true)
//   3. 이름, 가격, 인기 여부 모두 출력
// ========================================

// ↓ 여기에 직접 작성

const menu = {
  name: "안심 스테이크",
  price: 35000,
  isPopular: true,
};
console.log(menu.name, menu.price, menu.isPopular);

// ========================================
// 문제 8: 존재하지 않는 속성 확인 (Undefined)
// 스토리: 생일 정보는 등록 안 됨
// 요구사항:
//   1. customer 객체: name(김민준), age(45)
//   2. customer.name 출력
//   3. customer.birthday 출력 (등록 안 된 속성)
// ========================================

// ↓ 여기에 직접 작성

const customer = {
  name: "김민준",
  age: 45,
};
console.log(customer.name, customer.birthday);

// ========================================
// 문제 9: 의도적으로 비워둔 알레르기 정보 (Null)
// 스토리: 알레르기 없어서 의도적으로 null 입력
// 요구사항:
//   1. allergy 변수에 null 할당
//   2. allergy 출력
// ========================================

// ↓ 여기에 직접 작성

const allergy = null;
console.log(allergy);

// ========================================
// 문제 10: 재할당 가능한 변수 (let, 재할당)
// 스토리: '콜라' → '사이다'로 변경
// 요구사항:
//   1. drink 변수에 '콜라'
//   2. drink를 '사이다'로 재할당
//   3. drink 두 번 출력 (재할당 전후)
// ========================================

// ↓ 여기에 직접 작성

let drink = "콜라";
console.log(drink);
drink = "사이다";
console.log(drink);

// ========================================
// 문제 11: 재할당 불가능한 변수 (const)
// 스토리: 테이블 번호 12번 고정 (절대 변경 X)
// 요구사항:
//   1. tableNumber 상수에 12
//   2. tableNumber 출력
// ========================================

// ↓ 여기에 직접 작성

const tableNumber = 12;
console.log(tableNumber);

// ========================================
// 문제 12: 할인 계산 함수 (function, 매개변수, return)
// 스토리: 원래 가격, 할인율 입력 → 할인된 금액 계산
// 요구사항:
//   1. calculateDiscount 함수 (매개변수: 원래가격, 할인율)
//   2. return (원래가격 - 원래가격 * 할인율)
//   3. 호출: 100000, 0.1 → 결과 출력
// ========================================

// ↓ 여기에 직접 작성

const calculateDiscount = (price, discount) => {
  return price - price * discount;
};
console.log(calculateDiscount(100000, 0.1));

// ========================================
// 문제 13: 인사 메시지 함수 (function, 매개변수)
// 스토리: 이름 받아서 '환영합니다, [이름]님' 인사
// 요구사항:
//   1. greet 함수 (매개변수: 이름)
//   2. 함수 안에서 '환영합니다, [이름]님' 출력
//   3. 호출: '김민준'님에게 인사
// ========================================

// ↓ 여기에 직접 작성

const great = (name) => {
  console.log(`환영합니다, ${name}님`);
};

great("김민준");

// ========================================
// 문제 14: 주문 확인 조건문 (if문, Boolean)
// 스토리: 주문 확정되면 '주문이 확정되었습니다' 출력
// 요구사항:
//   1. isOrdered 변수에 true
//   2. if문으로 isOrdered가 true일 때만 '주문이 확정되었습니다' 출력
// ========================================

// ↓ 여기에 직접 작성

const isOrdered = true;
if (isOrdered) {
  console.log("주문이 확정되었습니다.");
}

// ========================================
// 문제 15: 결제 방법 선택 조건문 (if-else문)
// 스토리: 카드 가능 여부에 따라 다른 메시지
// 요구사항:
//   1. canPayByCard 변수에 true
//   2. if-else: true면 '카드로 결제합니다', false면 '현금으로 결제합니다'
//   3. false로 바꿔서 다시 테스트
// ========================================

// ↓ 여기에 직접 작성

const canPayByCard = false;
if (canPayByCard) {
  console.log("카드로 결제합니다.");
} else {
  console.log("현금으로 결제합니다.");
}
