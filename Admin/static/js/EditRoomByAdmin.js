var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "Admin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetRoom();
        } else {
            localStorage.removeItem("Token");
            window.location="/Admin/Login";
        }
    });;
}else{
    window.location="/Admin/Login";
}
function getUserLoginFetch() {
    return new Promise((resolve, reject) => {
        //khai báo phương thức và đường dẫn để request
        fetch("/ApiV1/UserByLogin", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("Token")
            },
        })
        .then(response => {
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
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
}
async function checkUserLogin(){
    var userLogin=await getUserLoginFetch(); 
    return userLogin["roles"];
}

function LogOut(){
    window.location="/Admin/Login";
    localStorage.removeItem("Token");
}
function GetAllHome() {
    return new Promise((resolve, reject) => {
        try {
            

            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                    if (this.status == 200) {
                        const xmlData = this.responseText;  // Lấy dữ liệu XML
                        resolve(JSON.parse(xmlData));
                    } else if (this.status == 204) {
                        // Xử lý khi không có dữ liệu (status code 204)
                        console.log('No data available.');
                        resolve([]);
                    } else if (this.status == 401 || this.status == 403) {
                        // Xử lý khi không có quyền hoặc token không hợp lệ
                        localStorage.removeItem("Token");
                        window.location = "/Admin/Login";
                        console.error('Unauthorized');
                        reject('Unauthorized');
                    } else {
                        console.error('Error:', this.status);
                        reject('Error');
                    }
                
            };

            xhttp.open("GET", "/ApiV1/AllHome", true);
            xhttp.setRequestHeader("Content-type","application/json")
            token = localStorage.getItem("Token");
            authorization ='Bearer '+token
            xhttp.setRequestHeader("Authorization",authorization);
            xhttp.send();
        } catch (error) {
            // Xử lý lỗi
            console.error('Error:', error);
            reject(error);
        }
    });
}
function GetAllRoomAdmin(){
    return new Promise((resolve, reject) => {
        try {
            

            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                    if (this.status == 200) {
                        const xmlData = this.responseText;  // Lấy dữ liệu XML
                        resolve(JSON.parse(xmlData));
                    } else if (this.status == 204) {
                        // Xử lý khi không có dữ liệu (status code 204)
                        console.log('No data available.');
                        resolve([]);
                    } else if (this.status == 401 || this.status == 403) {
                        // Xử lý khi không có quyền hoặc token không hợp lệ
                        localStorage.removeItem("Token");
                        window.location = "/Admin/Login";
                        console.error('Unauthorized');
                        reject('Unauthorized');
                    } else {
                        console.error('Error:', this.status);
                        reject('Error');
                    }
                
            };

            xhttp.open("GET", "/ApiV1/AllRoomAdmin", true);
            xhttp.setRequestHeader("Content-type","application/json")
            token = localStorage.getItem("Token");
            authorization ='Bearer '+token
            xhttp.setRequestHeader("Authorization",authorization);
            xhttp.send();
        } catch (error) {
            // Xử lý lỗi
            console.error('Error:', error);
            reject(error);
        }
    });
}


async function GetRoom(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() 
    {
        if(xhttp.status==200)
        {
            
        var ResponseJson=xhttp.responseText;
        var Response= JSON.parse(ResponseJson);
        var tableRoomElement =document.getElementById('table__Rooms');
        var tableHtml=' <thead><tr><th>Equipment Name</th><th>Equipment Type</th><th>Equipment Admin Name</th><th>Action</th></tr></thead><tbody>';
        console.log(Response);
        for (var i=0;i<Response.Equipments.length;i++){
            tableHtml+='<tr><td>'+Response.Equipments[i].EquipmentName+'</td><td> '+Response.Equipments[i].EquipmentType+'</td><td><p>'+Response.Equipments[i]['EquipmentKey']+'</td><td><div class="action__Room"><div class="action__Room__Edit"><a href="/Admin/EditRoom/'+Response.Equipments[i].id+'"><i class="fa-solid fa-pen-to-square" ></i></a></div></div></td></tr>'
        }
        tableHtml+='</tbody>';
        tableRoomElement.innerHTML=tableHtml;
        var RoomByIDElement =document.getElementById('RoomEdit__inFor');
        var listHome= await GetAllHome();
        
        var RoomByIDHtml='<div class="Room__infor__RoomName"><label for="RoomName">RoomName</label><input type="text" id="RoomName" value="'+Response.RoomName+'"></div><div class="Room__infor__HomeName"> <label for="Home">Home</label><select id="Home">'
        for(var i=0;i<listHome.length;i++){
            if(listHome[i]['id']==Response.Home["id"]){
                RoomByIDHtml+=`<option value="${listHome[i]['id']}" selected>${listHome[i]['HomeName']}</option>`;
            }else{
                RoomByIDHtml+=`<option value="${listHome[i]['id']}">${listHome[i]['HomeName']}</option>`;
            }
        }
        
        RoomByIDHtml+='</select></div><div class="Room__infor__RoomAdminName"> <label for="Home">Room Admin</label><select id="AdminRoom">';
        
        var listRoomAdmin= await GetAllRoomAdmin();
        console.log(listRoomAdmin);
        for(var i=0;i<listRoomAdmin.length;i++){
            if(listRoomAdmin[i]['id']==Response.RoomAdmin["id"]){
                RoomByIDHtml+=`<option value="${listRoomAdmin[i]['id']}" selected>${listRoomAdmin[i]['RoomAdminName']}</option>`;
            }else{
                RoomByIDHtml+=`<option value="${listRoomAdmin[i]['id']}">${listRoomAdmin[i]['RoomAdminName']}</option>`;
            }
        }
        
        RoomByIDHtml+='</select></div>';
        RoomByIDElement.innerHTML=RoomByIDHtml;
        }else if(xhttp.status==204){
           
        }
        else if(xhttp.status==401)
        {
            localStorage.removeItem("Token");
            window.location="/Admin/Login";
        }
        else if(xhttp.status==403)
        {
            localStorage.removeItem("Token");
            window.location="/Admin/Login";
        }
    }         
    //khai báo phương thức và đường dẫn để request
    xhttp.open("GET", "/ApiV1/RoomDetailByAdmin/"+window.location.pathname.substring(16),false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}
function Save(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            window.location='/Admin/RoomAdmin'
        }else if(xhttp.status==204){
           
        }
        else if(xhttp.status==401)
        {
            localStorage.removeItem("Token");
            window.location="/Admin/Login";
        }
        else if(xhttp.status==403)
        {
            localStorage.removeItem("Token");
            window.location="/Admin/Login";
        }
    }         
    const RoomPost ={
        RoomName:document.getElementById('RoomName').value,
        Home:document.getElementById("Home").value,
        RoomAdmin:document.getElementById("AdminRoom").value
        
    }
    var RoomPostJson =JSON.stringify(RoomPost);
    //khai báo phương thức và đường dẫn để request
    xhttp.open("PATCH", "/ApiV1/RoomDetailByAdmin/"+window.location.pathname.substring(16),false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send(RoomPostJson);
}
//cuộn màn hình
window.addEventListener('scroll', () => {
if (window.scrollY > 0) {
    header.classList.add('scroll');
} else {
    header.classList.remove('scroll');
}
});

//thanh srearch
var search=document.querySelector(".header__categoryInfor__search input");
search.addEventListener("focus",function(){
    document.querySelector(".header__categoryInfor__search i:first-of-type ").classList.add("focus");
});
search.addEventListener("blur",function(){
    document.querySelector(".header__categoryInfor__search i:first-of-type ").classList.remove("focus");
});
function searchApear(){
    document.querySelector(".header__categoryInfor__search input").focus();
}


