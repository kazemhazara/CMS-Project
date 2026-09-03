/* users */
const containerUsers = document.querySelector(".table__body--users");
const containerUsersMobile = document.querySelector(".container__card--users");
const usersCount = document.querySelector("#users-count");
/* products */
const productsCount = document.querySelector("#products-count");
const containerProducts = document.querySelector(".table__body--products");
const containerProductsMobile = document.querySelector(
  ".container__card--products",
);

/* Legal */
let allUsers = [];
let allProducts = [];

/* Handler Users */
const showUsers = (allUsers) => {
  const lastUsers = allUsers.slice(-4);

  lastUsers.forEach((user) => {
    containerUsers.insertAdjacentHTML(
      "beforeend",
      `
         <tr class="table__row">
           <td class="table__row--text user__fullName">${user.firstname} ${user.lastname}</td> 
           <td class="table__row--text user__gmail">${user.email}</td>
         </tr>
        `,
    );
  });
};
/* Handler Users Mobile */
const showUsersMobile = (allUsers) => {
  const lastUsers = allUsers.slice(-4);
  lastUsers.forEach((user) => {
    containerUsersMobile.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
                <div class="card__item">
                  <span class="card__label">نام و نام‌خانوادگی :</span>
                  <span class="card__value">${user.firstname} ${user.lastname}</span>
                </div>
                <div class="card__item">
                  <span class="card__label">آدرس ایمیل :</span>
                  <span class="card__value">${user.email}</span>
                </div>
      </div>
    `,
    );
  });
};

/* Handler Products */
const showProducts = (allProducts) => {
  const lastProdcuts = allProducts.slice(-4);

  lastProdcuts.forEach((product) => {
    containerProducts.insertAdjacentHTML(
      "beforeend",
      `
             <tr class="table__row">
                <td class="table__row--text product__titel">${product.title}</td>

                <td class="table__row--text product__shortName">${product.shortname}</td>
            </tr>
            `,
    );
  });
};
/* Handler Products Mobile */
const showProductsMobile = (allProducts) => {
  const lastProdcuts = allProducts.slice(-4);
  lastProdcuts.forEach((product) => {
    containerProductsMobile.insertAdjacentHTML(
      "beforeend",
      `
       <div class="card">
          <div class="card__item">
            <span class="card__label">عنوان محصول:</span>
            <span class="card__value"> ${product.title}</span>
          </div>
          <div class="card__item">
            <span class="card__label">عنوان کوتاه:</span>
            <span class="card__value">${product.shortname}</span>
          </div>
        </div>
      `,
    );
  });
};

window.addEventListener("load", async () => {
  try {
    const response = await fetch(
      "https://api-cms-45f2d-default-rtdb.firebaseio.com/users.json",
    );
    if (!response.ok) {
      throw new Error(`خطای سرور : ${response.status}`);
    }
    const data = await response.json();
    const users = Object.values(data);
    usersCount.innerHTML = users.length;

    allUsers = users;
    showUsers(allUsers);
    showUsersMobile(allUsers);
  } catch (error) {
    console.log(error);
  }
  try {
    const response = await fetch(
      "https://api-cms-45f2d-default-rtdb.firebaseio.com/products.json",
    );
    if (!response.ok) {
      throw new Error(`خطای سرور : ${response.status}`);
    }
    const data = await response.json();
    const products = Object.values(data);
    productsCount.innerHTML = products.length;

    allProducts = products;
    showProducts(allProducts);
    showProductsMobile(allProducts);
  } catch (error) {
    console.log(error);
  }
});
