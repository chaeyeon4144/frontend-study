// console.log("연결됨!");

// 상품 목록 API (GET)
async function getProducts() {
  try {
    const response = await fetch(
      "https://dev.wenivops.co.kr/services/fastapi-crud/1/product",
    );

    const data = await response.json();
    console.log(data);
    // 카드 1개 만들기
    const list = document.querySelector("#list");

    // const card = `
    // <div>
    // <img src="${data[0].thumbnailImg}" width="150"/>
    // <h2>${data[0].productName}</h2>
    // <p>${data[0].price}</p>
    // </div>
    // `;

    const cards = data.map(
      (product) => `
    <div class="card" onclick="getProductDetail(${product.id})">
    <img src="${product.thumbnailImg}" width="150"/>
    <h2>${product.productName}</h2>
    <p>${product.price.toLocaleString()}원</p>
    </div>`,
    );
    list.innerHTML = cards.join("");
  } catch (error) {
    console.error(error);
  }
}
getProducts();

// 상품 상세 정보 확인하기
async function getProductDetail(id) {
  try {
    const response = await fetch(
      `https://dev.wenivops.co.kr/services/fastapi-crud/1/product/${id}`,
    );
    const data = await response.json();
    console.log(data);

    // 상품 상세를 표시할 영역
    const detail = document.querySelector("#detail");
    detail.innerHTML = `
    <div class="detail-card">
    <img src="${data.thumbnailImg}" width="510"/>
    <div class="detail-info">
    <div class="detail-title">
    <h2>상품명: ${data.productName}</h2>
    <p>가격: ${data.price.toLocaleString()}원</p>
    </div>
    <ul class="detail-description">
    <li>업데이트 날짜: ${data.pubDate}</li>
    <li>재고 수량: ${data.stockCount}</li>
    </ul>
    </div>
    </div>
    `;
  } catch (error) {
    console.error(error);
  }
}
// getProductDetail(1);
