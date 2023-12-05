var RoleList = [];
function isRoleNameExist(roles, roleNameToCheck) {
  return roles.some((role) => role.RoleName === roleNameToCheck);
}
if (localStorage.getItem("Token")) {
  checkUserLogin().then((result) => {
    RoleList = result;
    const roleNameToCheck = "Admin";
    if (isRoleNameExist(RoleList, roleNameToCheck)) {
       
    } else {
      localStorage.removeItem("Token");
      window.location = "/SuperAdmin/Login";
    }
  });
} else {
  window.location = "/SuperAdmin/Login";
}
function getUserLoginFetch() {
  return new Promise((resolve, reject) => {
    //khai báo phương thức và đường dẫn để request
    fetch("/ApiV1/UserByLogin", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          resolve([]); // Trả về một mảng rỗng nếu không có dữ liệu
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("Token");
          window.location = "/SuperAdmin/Login";
        } else {
          reject("Error fetching data");
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function checkUserLogin() {
  var userLogin = await getUserLoginFetch();
  return userLogin["roles"];
}

function LogOut() {
  window.location = "/SuperAdmin/Login";
  localStorage.removeItem("Token");
}

function Save() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (xhttp.status == 200) {
      window.location = "/SuperAdmin/EquipmentSuperAdmin";
    } else if (xhttp.status == 204) {
    } else if (xhttp.status == 401) {
      localStorage.removeItem("Token");
      window.location = "/SuperAdmin/Login";
    } else if (xhttp.status == 403) {
      localStorage.removeItem("Token");
      window.location = "/SuperAdmin/Login";
    }else if (xhttp.status == 400) {
      console.log(xhttp.responseText)
    }
  };
  const RoomPost = {
    EquipmentAdminName: document.getElementById("EquipmentName").value,
    EquipmentAdminType:document.getElementById("EquipmentType").value,
    EquipmentAdminKey:document.getElementById("EquipmentKey").value,
    EquipmentAdminStatus:0

  };
  var RoomPostJson = JSON.stringify(RoomPost);
  //khai báo phương thức và đường dẫn để request
  xhttp.open(
    "POST",
    "/ApiV1/AllEquipmentSuperAdmin" ,
    false
  );
  //định dạng gửi đi787
  xhttp.setRequestHeader("Content-type", "application/json");
  token = localStorage.getItem("Token");
  authorization = "Bearer " + token;
  xhttp.setRequestHeader("Authorization", authorization);
  xhttp.send(RoomPostJson);
}
//cuộn màn hình
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

//thanh srearch
var search = document.querySelector(".header__categoryInfor__search input");
search.addEventListener("focus", function () {
  document
    .querySelector(".header__categoryInfor__search i:first-of-type ")
    .classList.add("focus");
});
search.addEventListener("blur", function () {
  document
    .querySelector(".header__categoryInfor__search i:first-of-type ")
    .classList.remove("focus");
});
function searchApear() {
  document.querySelector(".header__categoryInfor__search input").focus();
}
