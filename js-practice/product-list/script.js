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
    <div class="card">
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
