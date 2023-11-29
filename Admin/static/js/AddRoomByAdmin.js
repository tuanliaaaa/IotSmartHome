var RoleList = [];
function isRoleNameExist(roles, roleNameToCheck) {
  return roles.some((role) => role.RoleName === roleNameToCheck);
}
if (localStorage.getItem("Token")) {
  checkUserLogin().then((result) => {
    RoleList = result;
    const roleNameToCheck = "Admin";
    if (isRoleNameExist(RoleList, roleNameToCheck)) {
        GetAllHome();
        GetAllRoomAdmin();
    } else {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    }
  });
} else {
  window.location = "/Admin/Login";
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
          window.location = "/Admin/Login";
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
  window.location = "/Admin/Login";
  localStorage.removeItem("Token");
}
function GetAllHome() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.status == 200) {
      const xmlData = this.responseText; // Lấy dữ liệu XML
      var listHome = JSON.parse(xmlData);
      var ListHomeHtml = "";
      var ListHomeElement = document.getElementById("Home");
      console.log(listHome)
      for (var i = 0; i < listHome.length; i++) {
        ListHomeHtml += `<option value="${listHome[i]["id"]}">${listHome[i]["HomeName"]}</option>`;
      }
      ListHomeElement.innerHTML=ListHomeHtml;
    } else if (this.status == 204) {
    } else if (this.status == 401 || this.status == 403) {
      // Xử lý khi không có quyền hoặc token không hợp lệ
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    } else {
    }
  };

  xhttp.open("GET", "/ApiV1/AllHome", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  token = localStorage.getItem("Token");
  authorization = "Bearer " + token;
  xhttp.setRequestHeader("Authorization", authorization);
  xhttp.send();
}
function GetAllRoomAdmin() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      if (this.status == 200) {
        const xmlData = this.responseText; // Lấy dữ liệu XML
        var listRoomAdmin = JSON.parse(xmlData);
        var ListRoomAdminHtml = "";
        var ListRoomAdminElement = document.getElementById("RoomAdmin");
        for (var i = 0; i < listRoomAdmin.length; i++) {
          ListRoomAdminHtml += `<option value="${listRoomAdmin[i]["id"]}">${listRoomAdmin[i]["RoomAdminName"]}</option>`;
        }
        ListRoomAdminElement.innerHTML=ListRoomAdminHtml;
      } else if (this.status == 204) {
      } else if (this.status == 401 || this.status == 403) {
        // Xử lý khi không có quyền hoặc token không hợp lệ
        localStorage.removeItem("Token");
        window.location = "/Admin/Login";
      } else {
      }
    };
  
    xhttp.open("GET", "/ApiV1/AllRoomAdmin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    token = localStorage.getItem("Token");
    authorization = "Bearer " + token;
    xhttp.setRequestHeader("Authorization", authorization);
    xhttp.send();
  }
function Save() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (xhttp.status == 200) {
      window.location = "/Admin/RoomAdmin";
    } else if (xhttp.status == 204) {
    } else if (xhttp.status == 401) {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    } else if (xhttp.status == 403) {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    }
  };
  const homePost = {
    RoomName: document.getElementById("RoomName").value,
    RoomAdmin: document.getElementById("RoomAdmin").value,
    Home: document.getElementById("Home").value,

  };
  var homePostJson = JSON.stringify(homePost);
  //khai báo phương thức và đường dẫn để request
  xhttp.open(
    "POST",
    "/ApiV1/AllRoom" ,
    false
  );
  //định dạng gửi đi787
  xhttp.setRequestHeader("Content-type", "application/json");
  token = localStorage.getItem("Token");
  authorization = "Bearer " + token;
  xhttp.setRequestHeader("Authorization", authorization);
  xhttp.send(homePostJson);
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
