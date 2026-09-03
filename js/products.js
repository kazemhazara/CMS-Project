/* ToastBar */
const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast__content");
const toastProgress = document.querySelector(".process");
/* Create Products */
const btnCreateProducts = document.querySelector("#create-product");
const inputProductsTitle = document.querySelector("#product-title");
const inputProductsPrice = document.querySelector("#product-price");
const inputProductsShortName = document.querySelector("#product-shortName");
const modalScreen = document.querySelector(".modal__screen");
const modalCreateProducts = document.querySelector(".modal__products--create");
const btnCloseModalCreate = document.querySelector(
  "#modal-create-product-close",
);
const btnCancelModalCreate = document.querySelector("#modal-create-cancel");
const productsCreateForm = document.querySelector("#product-create-form");
/* Show Products */
const containerTableBody = document.querySelector(".table__body");
const showProductsData = document.querySelector(".products--data");
/* Show Products Mobile */
const containerCardMobile = document.querySelector(".container__card");
/* Remove Products */
const modalRemoveProducts = document.querySelector(".modal__products--remove");
const btnCloseModalRemove = document.querySelector(
  "#modal-remove-product-close",
);
const productsRemoveForm = document.querySelector("#product-remove-form");
const btnCancelModalRemove = document.querySelector("#modal-remove-cancel");
/* Edit Products */
const modalEditProducts = document.querySelector(".modal__products--edit");
const editInputTitle = document.querySelector("#edit-product-title");
const editInputPrice = document.querySelector("#edit-product-price");
const editInputShortName = document.querySelector("#edit-product-shortName");
const btnCloseModalEdit = document.querySelector("#modal-edit-product-close");
const btnCancelModalEdit = document.querySelector("#modal-edit-cancel");
const productsEditForm = document.querySelector("#product-edit-form");

/* Pagination */
const containerPagination = document.querySelector(".pagination");
/* Legal */
let allProducts = [];
let page = 1;
let productsPerPage = 4;
let productsRemoveId = null;
let productsEditId = null;

/* Handler clear Inputs */
const clearInputs = () => {
  inputProductsTitle.value = "";
  inputProductsPrice.value = "";
  inputProductsShortName.value = "";
};
/* Handler close AllModal */
const closeAllModal = () => {
  modalScreen.classList.add("hidden");
  modalCreateProducts.classList.add("hidden");
  modalRemoveProducts.classList.add("hidden");
  modalEditProducts.classList.add("hidden");
};
/* Handler TaostBar */
const showToast = (style, message) => {
  toast.classList.remove("hidden");
  toast.className = `toast ${style}`;
  toastMessage.innerHTML = message;
  let toastStepProgress = 0;
  const intervalToast = setInterval(() => {
    toastStepProgress++;
    toastProgress.style.width = `${toastStepProgress}%`;
    if (toastStepProgress > 120) {
      toastProgress.style.width = "1%";
      toast.classList.add("hidden");
      clearInterval(intervalToast);
    }
  }, 45);
};
/* Handler Create Products */

const openModalCreateProducts = () => {
  closeAllModal();
  modalScreen.classList.remove("hidden");
  modalCreateProducts.classList.remove("hidden");
};
const createNewProducts = async (event) => {
  event.preventDefault();
  const title = inputProductsTitle.value.trim();
  const price = +inputProductsPrice.value.trim();
  const shortname = inputProductsShortName.value.trim();
  if (!title || !Number.isFinite(price) || price <= 0 || !shortname) {
    showToast("failed", "لطفا تمام فیلد ها را با اطلاعات درست پرکنید.");
    closeAllModal();
  } else {
    const newProduct = {
      title,
      price,
      shortname,
    };
    try {
      const response = await fetch(
        "https://api-cms-45f2d-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newProduct),
        },
      );
      if (response.ok) {
        fetchProducts();
        closeAllModal();
        clearInputs();
        showToast("success", "محصول با موفقیت اضافه شد.");
      }
    } catch {
      showToast(
        "failed",
        "متاسفانه به دلیل مشکل پیش آمده در سرور، کاربر اضافه نشد .",
      );
    }
  }
};
/* Handler Fetch Products */
const fetchProducts = async (event) => {
  try {
    const response = await fetch(
      "https://api-cms-45f2d-default-rtdb.firebaseio.com/products.json",
    );
    if (!response.ok) {
      throw new Error(`خطای سرور : ${response.status}`);
    }
    const data = await response.json();
    const products = Object.values(data);
    const productsId = Object.keys(data);

    products.forEach((product, index) => {
      product.id = productsId[index];
    });
    showProductsData.innerHTML = products.length;
    allProducts = products;
    showProdcuts(allProducts);
    showProductsMobile(allProducts);
    generatePagination(allProducts);
  } catch {
    showToast(
      "failed",
      "ارتباط با سرور میسر نیست. لطفا اتصال اینترنت خود را برسی کنید.",
    );
  }
};
/* Handler Show Products */
const showProdcuts = (allProducts) => {
  let startIndex = (page - 1) * productsPerPage;
  let lastIndex = startIndex + productsPerPage;
  let shownProducts = allProducts.slice(startIndex, lastIndex);
  containerTableBody.innerHTML = "";

  shownProducts.forEach((product) => {
    containerTableBody.insertAdjacentHTML(
      "beforeend",
      `
        <tr class="table__row">
          <td class="table__row--text product__titel">${product.title}</td>
          <td class="table__row--text product__price">${product.price.toLocaleString()}</td>
          <td class="table__row--text product__shortName">${product.shortname}</td>
          <td>
            <div class="box__manage">
              <button
                class="button button__edit"
                onclick ='openModalEditProducts(${JSON.stringify(product)})'
                type="button"
                aria-label="ویرایش محصول"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="button button__remove"
                onclick ="openModalRemoveProducts('${product.id}')"
                type="button"
                aria-label="حذف محصول"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>
      `,
    );
  });
};
/* Handler Show Products Mobile */
const showProductsMobile = (allProducts) => {
  let startIndex = (page - 1) * productsPerPage;
  let lastIndex = startIndex + productsPerPage;
  let shownProductsMobile = allProducts.slice(startIndex, lastIndex);
  containerCardMobile.innerHTML = "";
  shownProductsMobile.forEach((product) => {
    containerCardMobile.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
              <div class="card__item">
                <span class="card__label fw-900">عنوان محصول :</span>
                <span class="card__value">${product.title}</span>
              </div>
              <div class="card__item">
                <span class="card__label fw-900">قیمت محصول :</span>
                <span class="card__value">${product.price.toLocaleString()}</span>
              </div>
              <div class="card__item">
                <span class="card__label fw-900">عنوان کوتاه :</span>
                <span class="card__value">${product.shortname}</span>
              </div>

              <div class="card__buttons">
                <button class="button button__edit"
                onclick ='openModalEditProducts(${JSON.stringify(product)})'>ویرایش</button>
                <button class="button button__remove"
                onclick= "openModalRemoveProducts('${product.id}')">حذف</button>
              </div>
        </div>
      `,
    );
  });
};
/* Handler Remove Products */
const openModalRemoveProducts = (productsId) => {
  productsRemoveId = productsId;
  closeAllModal();
  modalScreen.classList.remove("hidden");
  modalRemoveProducts.classList.remove("hidden");
};
const removeProducts = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(
      `https://api-cms-45f2d-default-rtdb.firebaseio.com/products/${productsRemoveId}.json`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      closeAllModal();
      await fetchProducts();
      showToast("success", "محصول مورد نظر با موفقیت حذف شد.");
      generatePagination(allProducts);
    } else {
      closeAllModal();
      showToast("failed", "متاسفانه محصول مورد نظر حذف نشد.");
    }
  } catch {
    showToast(
      "failed",
      "متاسفانه به دلیل مشکل پیش آمده در سرور، محصول مورد نظر حذف نشد .",
    );
  }
};
/* Handler Edit Products */
const openModalEditProducts = (product) => {
  productsEditId = product.id;
  editInputTitle.value = product.title;
  editInputPrice.value = product.price;
  editInputShortName.value = product.shortname;
  closeAllModal();
  modalScreen.classList.remove("hidden");
  modalEditProducts.classList.remove("hidden");
};
const editProducts = async (event) => {
  event.preventDefault();
  const title = editInputTitle.value.trim();
  const price = +editInputPrice.value.trim();
  const shortname = editInputShortName.value.trim();
  const editedProduct = {
    title,
    price,
    shortname,
  };
  try {
    const response = await fetch(
      `https://api-cms-45f2d-default-rtdb.firebaseio.com/products/${productsEditId}.json`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      },
    );
    if (response.ok) {
      closeAllModal();
      await fetchProducts();
      showToast("success", "محصول مورد نظر با موفقیت ویرایش شد.");
      generatePagination(allProducts);
    } else {
      closeAllModal();
      showToast("failed", "متاسفانه محصول مورد نظر ویرایش نشد.");
    }
  } catch {
    showToast(
      "failed",
      "متاسفانه به دلیل مشکل پیش آمده در سرور، محصول ویرایش نشد.",
    );
  }
};

/* Handler Page */
const generatePagination = () => {
  containerPagination.innerHTML = "";
  const pageCount = Math.ceil(allProducts.length / productsPerPage);
  for (let i = 0; i < pageCount; i++) {
    containerPagination.insertAdjacentHTML(
      "beforeend",
      `
       <span class="page ${i === 0 ? "active-page" : ""}"
        onclick= "changePageHandler(${i + 1})">

       ${i + 1}</span>
      `,
    );
  }
};
const changePageHandler = (selectedPage) => {
  page = selectedPage;
  const pageNumbers = document.querySelectorAll(".page");
  pageNumbers.forEach((pageNumber) => {
    if (+pageNumber.innerHTML === page) {
      pageNumber.classList.add("active-page");
    } else {
      pageNumber.classList.remove("active-page");
    }
  });
  showProdcuts(allProducts);
  shownProductsMobile(allProducts);
};
/* Legal */
window.addEventListener("load", fetchProducts);
/* Create Products */
btnCreateProducts.addEventListener("click", openModalCreateProducts);
btnCloseModalCreate.addEventListener("click", closeAllModal);
btnCancelModalCreate.addEventListener("click", closeAllModal);
productsCreateForm.addEventListener("submit", createNewProducts);
/* Remove Products */
btnCloseModalRemove.addEventListener("click", closeAllModal);
btnCancelModalRemove.addEventListener("click", closeAllModal);
productsRemoveForm.addEventListener("submit", removeProducts);
/* Edit Products */
btnCloseModalEdit.addEventListener("click", closeAllModal);
btnCancelModalEdit.addEventListener("click", closeAllModal);
productsEditForm.addEventListener("submit", editProducts);
