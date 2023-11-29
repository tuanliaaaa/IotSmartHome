var RoleList = [];
function isRoleNameExist(roles, roleNameToCheck) {
  return roles.some((role) => role.RoleName === roleNameToCheck);
}
if (localStorage.getItem("Token")) {
  checkUserLogin().then((result) => {
    RoleList = result;
    const roleNameToCheck = "Admin";
    if (isRoleNameExist(RoleList, roleNameToCheck)) {
        GetAllRoom();
        GetAllEquipmentAdmin();
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
function GetAllRoom() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.status == 200) {
      const xmlData = this.responseText; // Lấy dữ liệu XML
      var listRoom = JSON.parse(xmlData);
      var ListRoomHtml = "";
      var ListRoomElement = document.getElementById("Room");
      console.log(listRoom)
      for (var i = 0; i < listRoom.length; i++) {
        ListRoomHtml += `<option value="${listRoom[i]["id"]}">${listRoom[i]["RoomName"]}</option>`;
      }
      ListRoomElement.innerHTML=ListRoomHtml;
    } else if (this.status == 204) {
    } else if (this.status == 401 || this.status == 403) {
      // Xử lý khi không có quyền hoặc token không hợp lệ
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    } else {
    }
  };

  xhttp.open("GET", "/ApiV1/AllRoom", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  token = localStorage.getItem("Token");
  authorization = "Bearer " + token;
  xhttp.setRequestHeader("Authorization", authorization);
  xhttp.send();
}
function GetAllEquipmentAdmin() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      if (this.status == 200) {
        const xmlData = this.responseText; // Lấy dữ liệu XML
        var listEquipmentAdmin = JSON.parse(xmlData);
        var ListEquipmentAdminHtml = "";
        var ListEquipmentAdminElement = document.getElementById("EquipmentAdmin");
        for (var i = 0; i < listEquipmentAdmin.length; i++) {
          ListEquipmentAdminHtml += `<option value="${listEquipmentAdmin[i]["id"]}">${listEquipmentAdmin[i]["EquipmentAdminName"]}</option>`;
        }
        ListEquipmentAdminElement.innerHTML=ListEquipmentAdminHtml;
      } else if (this.status == 204) {
      } else if (this.status == 401 || this.status == 403) {
        // Xử lý khi không có quyền hoặc token không hợp lệ
        localStorage.removeItem("Token");
        window.location = "/Admin/Login";
      } else {
      }
    };
  
    xhttp.open("GET", "/ApiV1/AllEquipmentAdmin", true);
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
      window.location = "/Admin/EquipmentAdmin";
    } else if (xhttp.status == 204) {
    } else if (xhttp.status == 401) {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    } else if (xhttp.status == 403) {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    }
  };
  const RoomPost = {
    EquipmentName: document.getElementById("EquipmentName").value,
    EquipmentAdmin: document.getElementById("EquipmentAdmin").value,
    Room: document.getElementById("Room").value,
    EquipmentType:document.getElementById("EquipmentType").value,
    EquipmentKey:document.getElementById("EquipmentKey").value,
    StatusActive:0

  };
  var RoomPostJson = JSON.stringify(RoomPost);
  //khai báo phương thức và đường dẫn để request
  xhttp.open(
    "POST",
    "/ApiV1/AllEquipment" ,
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
