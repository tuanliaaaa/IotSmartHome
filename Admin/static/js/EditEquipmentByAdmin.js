var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "Admin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetEquipment();
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
function GetAllRoom() {
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

            xhttp.open("GET", "/ApiV1/AllRoom", true);
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
function GetAllEquipmentAdmin(){
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

            xhttp.open("GET", "/ApiV1/AllEquipmentAdmin", true);
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


async function GetEquipment(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() 
    {
        if(xhttp.status==200)
        {
            
        var ResponseJson=xhttp.responseText;
        var Response= JSON.parse(ResponseJson);
        var tableEquipmentElement =document.getElementById('table__Equipments');
        var tableHtml=' <thead><tr><th>Equipment Name</th><th>Equipment Type</th><th>Equipment Admin Name</th><th>Action</th></tr></thead><tbody>';
        console.log(Response);
        for (var i=0;i<Response.Sensors.length;i++){
            tableHtml+='<tr><td>'+Response.Sensors[i].id+'</td><td> '+Response.Sensors[i].id+'</td><td><p>'+Response.Sensors[i]['SensorName']+'</td><td><div class="action__Equipment"><div class="action__Equipment__Edit"><a href="/Admin/EditEquipment/'+Response.Sensors[i].id+'"><i class="fa-solid fa-pen-to-square" ></i></a></div></div></td></tr>'
        }
        tableHtml+='</tbody>';
        tableEquipmentElement.innerHTML=tableHtml;
        var EquipmentByIDElement =document.getElementById('EquipmentEdit__inFor');
        var listRoom= await GetAllRoom();
        
        var EquipmentByIDHtml='<div class="Equipment__infor__EquipmentName"><label for="EquipmentName">EquipmentName</label><input type="text" id="EquipmentName" value="'+Response.EquipmentName+'"></div><div class="Equipment__infor__EquipmentName"><label for="EquipmentKey">EquipmentKey</label><input type="text" id="EquipmentKey" value="'+Response.EquipmentKey+'"></div><div class="Equipment__infor__EquipmentName"><label for="EquipmentType">EquipmentType</label><input type="text" id="EquipmentType" value="'+Response.EquipmentType+'"></div><div class="Equipment__infor__RoomName"> <label for="Room">Room</label><select id="Room">'
        for(var i=0;i<listRoom.length;i++){
            if(listRoom[i]['id']==Response.Room["id"]){
                EquipmentByIDHtml+=`<option value="${listRoom[i]['id']}" selected>${listRoom[i]['RoomName']}</option>`;
            }else{
                EquipmentByIDHtml+=`<option value="${listRoom[i]['id']}">${listRoom[i]['RoomName']}</option>`;
            }
        }
        
        EquipmentByIDHtml+='</select></div><div class="Equipment__infor__EquipmentAdminName"> <label for="Room">Equipment Admin</label><select id="AdminEquipment">';
        
        var listEquipmentAdmin= await GetAllEquipmentAdmin();
        for(var i=0;i<listEquipmentAdmin.length;i++){
            if(listEquipmentAdmin[i]['id']==Response.EquipmentAdmin["id"]){
                EquipmentByIDHtml+=`<option value="${listEquipmentAdmin[i]['id']}" selected>${listEquipmentAdmin[i]['EquipmentAdminName']}</option>`;
            }else{
                EquipmentByIDHtml+=`<option value="${listEquipmentAdmin[i]['id']}">${listEquipmentAdmin[i]['EquipmentAdminName']}</option>`;
            }
        }
        
        EquipmentByIDHtml+='</select></div>';
        EquipmentByIDElement.innerHTML=EquipmentByIDHtml;
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
    xhttp.open("GET", "/ApiV1/EquipmentDetailByAdmin/"+window.location.pathname.substring(21),false);
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
            window.location='/Admin/EquipmentAdmin'
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
    const EquipmentPost ={
        EquipmentName:document.getElementById('EquipmentName').value,
        EquipmentType:document.getElementById('EquipmentType').value,
        EquipmentKey:document.getElementById('EquipmentKey').value,
        
        Room:document.getElementById("Room").value,
        EquipmentAdmin:document.getElementById("AdminEquipment").value
        
    }
    var EquipmentPostJson =JSON.stringify(EquipmentPost);
    //khai báo phương thức và đường dẫn để request
    xhttp.open("PATCH", "/ApiV1/EquipmentDetailByAdmin/"+window.location.pathname.substring(21),false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send(EquipmentPostJson);
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


