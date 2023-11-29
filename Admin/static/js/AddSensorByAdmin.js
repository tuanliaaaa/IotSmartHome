var RoleList = [];
function isRoleNameExist(roles, roleNameToCheck) {
  return roles.some((role) => role.RoleName === roleNameToCheck);
}
if (localStorage.getItem("Token")) {
  checkUserLogin().then((result) => {
    RoleList = result;
    const roleNameToCheck = "Admin";
    if (isRoleNameExist(RoleList, roleNameToCheck)) {
        GetAllEquipment();
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
function GetAllEquipment() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.status == 200) {
      const xmlData = this.responseText; // Lấy dữ liệu XML
      var listEquipment = JSON.parse(xmlData);
      var ListEquipmentHtml = "";
      var ListEquipmentElement = document.getElementById("Equipment");
      for (var i = 0; i < listEquipment.length; i++) {
        ListEquipmentHtml += `<option value="${listEquipment[i]["id"]}">${listEquipment[i]["EquipmentName"]}</option>`;
      }
      ListEquipmentElement.innerHTML=ListEquipmentHtml;
    } else if (this.status == 204) {
    } else if (this.status == 401 || this.status == 403) {
      // Xử lý khi không có quyền hoặc token không hợp lệ
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    } else {
    }
  };

  xhttp.open("GET", "/ApiV1/AllEquipment", true);
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
      window.location = "/Admin/SensorAdmin";
    } else if (xhttp.status == 204) {
    } else if (xhttp.status == 401) {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    } else if (xhttp.status == 403) {
      localStorage.removeItem("Token");
      window.location = "/Admin/Login";
    }
  };
  const SensorPost = {
    SensorName: document.getElementById("SensorName").value,
    Equipment: document.getElementById("Equipment").value,
    SensorIP:document.getElementById("SensorKey").value,
    StatusSensor:0
  };
  var SensorPostJson = JSON.stringify(SensorPost);
  //khai báo phương thức và đường dẫn để request
  xhttp.open(
    "POST",
    "/ApiV1/AllSensor" ,
    false
  );
  //định dạng gửi đi787
  xhttp.setRequestHeader("Content-type", "application/json");
  token = localStorage.getItem("Token");
  authorization = "Bearer " + token;
  xhttp.setRequestHeader("Authorization", authorization);
  xhttp.send(SensorPostJson);
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
