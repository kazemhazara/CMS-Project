/* ToastBar */
const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast__content");
const toastProgress = document.querySelector(".process");
/* Create users */
const btnCreateUsers = document.querySelector("#create-user");
const modalScreen = document.querySelector(".modal__screen");
const modalCreateUsers = document.querySelector(".modal__user--create");
const btnCloseModalCreate = document.querySelector("#modal-create-close");
const btnCancelModalCreate = document.querySelector("#modal-create-cancel");
const userCreateForm = document.querySelector("#user-create-form");
const userFirstName = document.querySelector("#user-Firstname");
const userLastName = document.querySelector("#user-Lastname");
const userUsername = document.querySelector("#user-userName");
const userEmail = document.querySelector("#user-email");
const userCity = document.querySelector("#user-city");
/* show users */
const containerTableBody = document.querySelector(".table__body");
/* Show Users Mobile */
const containerCardMobile = document.querySelector(".container__card");

const showUsersData = document.querySelector(".users--data");

/* remove users */
const modalRemove = document.querySelector(".modal__user--remove");
const btnCloseModalRemove = document.querySelector("#modal-remove-close");
const btnCancelModalRemove = document.querySelector("#modal-remove-cancel");
const userRemoveForm = document.querySelector("#user-remove-form");
/* edit users */
const modalEdit = document.querySelector(".modal__user--edit");
const btnCloseModalEdit = document.querySelector("#modal-edit-close");
const btnCancelModalEdit = document.querySelector("#modal-edit-cancel");
const userEditForm = document.querySelector("#user-edit-form");
const userNewFirstName = document.querySelector("#edit-user-Firstname");
const userNewLastName = document.querySelector("#edit-user-Lastname");
const userNewUsername = document.querySelector("#edit-user-userName");
const userNewEmail = document.querySelector("#edit-user-email");
const userNewCity = document.querySelector("#edit-user-city");
/* Page */
const containerPagination = document.querySelector(".pagination");
/* Legal */
let page = 1;
let userPerPage = 4;
let allUsers = [];
console.log(allUsers);
let removeUserId = null;
let editUserId = null;
/* Handler Close AllModal */
const closeAllModal = () => {
  modalScreen.classList.add("hidden");
  modalCreateUsers.classList.add("hidden");
  modalRemove.classList.add("hidden");
  modalEdit.classList.add("hidden");
};
/*handler open/CloseModalCreateUser */
const openModalCreateUser = () => {
  closeAllModal();
  modalScreen.classList.remove("hidden");
  modalCreateUsers.classList.remove("hidden");
};

/*handler ClearInputs */
const clearInputs = () => {
  userFirstName.value = "";
  userLastName.value = "";
  userUsername.value = "";
  userEmail.value = "";
  userCity.value = "";
};
/*Handler CreateUser */
const createNewUsers = async (event) => {
  event.preventDefault();
  const firstname = userFirstName.value.trim();
  const lastname = userLastName.value.trim();
  const username = userUsername.value.trim();
  const email = userEmail.value.trim();
  const city = userCity.value.trim();
  if (!firstname || !lastname || !username || !email || !city) {
    closeAllModal();
    showToast("failed", "لطفا تمام فیلد ها را با اطلاعات درست پر کنید!");
  } else {
    const newUser = {
      firstname,
      lastname,
      username,
      email,
      city,
    };
    try {
      const response = await fetch(
        "https://api-cms-45f2d-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        },
      );
      if (response.ok) {
        fetchUsers();
        closeAllModal();
        clearInputs();
        showToast("success", "کاربر مورد نظر با موفقیت اضافه شد.");
      } else {
        closeAllModal();
        clearInputs();
        showToast("failed", "متاسفانه کاربر مورد نظر اضافه نشد.");
      }
    } catch (error) {
      closeAllModal();
      clearInputs();
      showToast(
        "failed",
        "متاسفانه به دلیل مشکل پیش آمده در سرور، کاربر اضافه نشد .",
      );
    }
  }
};
/* ShowUsers */
const showUsers = (allUsers) => {
  let startIndex = (page - 1) * userPerPage;
  let lastIndex = startIndex + userPerPage;
  let shownUsers = allUsers.slice(startIndex, lastIndex);
  console.log(shownUsers);

  containerTableBody.innerHTML = "";
  shownUsers.forEach((user) => {
    containerTableBody.insertAdjacentHTML(
      "beforeend",
      `
        <tr class="table__row">
          <td class="table__row--text user__fullName">${user.firstname} ${user.lastname}</td>
          <td class="table__row--text user__userName">${user.username}</td>
          <td class="table__row--text user__email">${user.email}</td>
          <td class="table__row--text user__city">${user.city}</td>
          <td>
            <div class="box__manage">
              <button
                class="button button__edit"
                onclick='modalEditUser(${JSON.stringify(user)})'
                type="button"
                aria-label="ویرایش کاربر"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="button button__remove"
                onclick="modalRemoveUser('${user.id}')"
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
/* Handler Show Users Mobile */
const showUsersMobile = (allUsers) => {
  console.log("hi");

  let startIndex = (page - 1) * userPerPage;
  let lastIndex = startIndex + userPerPage;
  let shownUsersMobile = allUsers.slice(startIndex, lastIndex);

  console.log(shownUsersMobile);

  containerCardMobile.innerHTML = "";

  shownUsersMobile.forEach((user) => {
    containerCardMobile.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
              <div class="card__item">
                <span class="card__label fw-900">نام و نام‌خانوادگی:</span>
                <span class="card__value">${user.firstname} ${user.lastname}</span>
              </div>
              <div class="card__item">
                <span class="card__label fw-900">نام کاربری:</span>
                <span class="card__value">${user.username}</span>
              </div>
              <div class="card__item">
                <span class="card__label fw-900">آدرس ایمیل:</span>
                <span class="card__value">${user.email}</span>
              </div>
              <div class="card__item">
                <span class="card__label fw-900">شهر:</span>
                <span class="card__value">${user.city}</span>
              </div>
              <div class="card__buttons">
                <button class="button button__edit"
                onclick='modalEditUser(${JSON.stringify(user)})'>ویرایش</button>
                <button class="button button__remove"
                onclick="modalRemoveUser('${user.id}')">حذف</button>
              </div>
        </div>
      `,
    );
  });
};
/* fetchUsers */
const fetchUsers = async () => {
  try {
    const response = await fetch(
      "https://api-cms-45f2d-default-rtdb.firebaseio.com/users.json",
    );
    if (!response.ok) {
      throw new Error(`خطای سرور : ${response.status}`);
    }
    const data = await response.json();

    const users = Object.values(data);
    const usersId = Object.keys(data);
    users.forEach((user, index) => {
      user.id = usersId[index];
    });
    showUsersData.innerHTML = users.length;

    allUsers = users;

    showUsers(allUsers);
    showUsersMobile(allUsers);
    generatePagination(allUsers);
  } catch {
    showToast(
      "failed",
      "ارتباط با سرور میسر نیست. لطفا اتصال اینترنت خود را برسی کنید.",
    );
  }
};

/* show Toast */
const showToast = (style, message) => {
  toast.classList.remove("hidden");
  toast.className = `toast ${style}`;
  toastMessage.innerHTML = message;

  let toastStepProgress = 0;
  const intervalToast = setInterval(() => {
    toastStepProgress++;
    toastProgress.style.width = `${toastStepProgress}%`;
    if (toastStepProgress > 110) {
      toastProgress.style.width = "1%";
      toast.classList.add("hidden");
      clearInterval(intervalToast);
    }
  }, 45);
};
/* page */
const generatePagination = () => {
  containerPagination.innerHTML = "";

  const pageCount = Math.ceil(allUsers.length / userPerPage);
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
const changePageHandler = (userSelectedPage) => {
  page = userSelectedPage;
  const pageNumbers = document.querySelectorAll(".page");
  pageNumbers.forEach((pageNumber) => {
    if (+pageNumber.innerHTML === page) {
      pageNumber.classList.add("active-page");
    } else {
      pageNumber.classList.remove("active-page");
    }
  });
  showUsers(allUsers);
  showUsersMobile(allUsers);
};
/*Handlerr  Remove User */

const modalRemoveUser = (userId) => {
  removeUserId = userId;
  closeAllModal();
  modalScreen.classList.remove("hidden");
  modalRemove.classList.remove("hidden");
};
const removeUser = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(
      `https://api-cms-45f2d-default-rtdb.firebaseio.com/users/${removeUserId}.json`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      closeAllModal();
      await fetchUsers();
      showToast("success", "کاربر مورد نظر با موفقیت حذف شد.");
    } else {
      showToast("failed", "متاسفانه کاربر مورد نظر حذف نشد.");
    }
  } catch {
    showToast(
      "failed",
      "متاسفانه بدلیل مشکل پیش آمده در سرور، کاربر مورد نظر حذف نشد.",
    );
  }
};
/* Handler Edit User */

const modalEditUser = (user) => {
  editUserId = user.id;
  userNewFirstName.value = user.firstname;
  userNewLastName.value = user.lastname;
  userNewUsername.value = user.username;
  userNewEmail.value = user.email;
  userNewCity.value = user.city;
  closeAllModal();
  modalScreen.classList.remove("hidden");
  modalEdit.classList.remove("hidden");
};
const editUser = async (event) => {
  event.preventDefault();
  const firstname = userNewFirstName.value.trim();
  const lastname = userNewLastName.value.trim();
  const username = userNewUsername.value.trim();
  const email = userNewEmail.value.trim();
  const city = userNewCity.value.trim();

  const userUpdated = {
    firstname,
    lastname,
    username,
    email,
    city,
  };
  try {
    const response = await fetch(
      `https://api-cms-45f2d-default-rtdb.firebaseio.com/users/${editUserId}.json`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userUpdated),
      },
    );
    if (response.ok) {
      fetchUsers();
      closeAllModal();
      showToast("success", "کاربر مورد نظر با موفقیت ویرایش شد.");
    } else {
      closeAllModal();
      clearInputs();
      showToast("failed", "متاسفانه کاربر مورد نظر با موفقیت ویرایش نشد. ");
    }
  } catch (error) {
    closeAllModal();
    clearInputs();
    showToast(
      "failed",
      "متاسفانه به دلیل مشکل پیش آمده در سرور، کاربر مورد نظر ویرایش نشد.",
    );
  }
};

window.addEventListener("load", fetchUsers);

/* add */
btnCreateUsers.addEventListener("click", openModalCreateUser);
btnCloseModalCreate.addEventListener("click", closeAllModal);
btnCancelModalCreate.addEventListener("click", closeAllModal);
userCreateForm.addEventListener("submit", createNewUsers);
/* remove */
btnCloseModalRemove.addEventListener("click", closeAllModal);
btnCancelModalRemove.addEventListener("click", closeAllModal);
userRemoveForm.addEventListener("submit", removeUser);
/* edit */

btnCloseModalEdit.addEventListener("click", closeAllModal);
btnCancelModalEdit.addEventListener("click", closeAllModal);
userEditForm.addEventListener("submit", editUser);
