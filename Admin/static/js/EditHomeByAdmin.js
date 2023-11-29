var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "Admin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetHome();
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
function GetAllUser() {
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

            xhttp.open("GET", "/ApiV1/AllUserByAdmin", true);
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



async function GetHome(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() 
    {
        if(xhttp.status==200)
        {
            
        var ResponseJson=xhttp.responseText;
        var Response= JSON.parse(ResponseJson);
        var tableRoomElement =document.getElementById('table__Rooms');
        var tableHtml=' <thead><tr><th>RoomName</th><th>Image</th><th>Room Admin Name</th><th>Action</th></tr></thead><tbody>';
        
        for (var i=0;i<Response.rooms.length;i++){
            tableHtml+='<tr><td>'+Response.rooms[i].RoomName+'</td><td> <div class="imgRoom"><img src="/Home/Media/Image/'+Response['rooms'][i]['RoomAdmin']['RoomAdminImg']+'" alt="" ></div></td><td><p>'+Response.rooms[i]['RoomAdmin']['RoomAdminName']+'</td><td><div class="action__Room"><div class="action__Room__Edit"><a href="/Admin/EditRoom/'+Response.rooms[i].id+'"><i class="fa-solid fa-pen-to-square" ></i></a></div></div></td></tr>'
        }
        tableHtml+='</tbody>';
        tableRoomElement.innerHTML=tableHtml;
        var HomeByIDElement =document.getElementById('HomeEdit__inFor');
        var listUser= await GetAllUser();
        
        var HomeByIDHtml='<div class="Home__infor__HomeName"><label for="HomeName">HomeName</label><input type="text" id="HomeName" value="'+Response.HomeName+'"></div><div class="Home__infor__UserName"> <label for="Category">User</label><select id="User">'
        for(var i=0;i<listUser.length;i++){
            if(listUser[i]['UserName']==Response.User["UserName"]){
                HomeByIDHtml+=`<option value="${listUser[i]['id']}" selected>${listUser[i]['UserName']}</option>`;
            }else{
                HomeByIDHtml+=`<option value="${listUser[i]['id']}">${listUser[i]['UserName']}</option>`;
            }
        }
        
        HomeByIDHtml+='</select></div>';
        HomeByIDElement.innerHTML=HomeByIDHtml;
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
    xhttp.open("GET", "/ApiV1/HomeDetailByAdmin/"+window.location.pathname.substring(16),false);
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
            window.location='/Admin/HomeAdmin'
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
    const homePost ={
        HomeName:document.getElementById('HomeName').value,
        User:document.getElementById("User").value
        
    }
    var homePostJson =JSON.stringify(homePost);
    //khai báo phương thức và đường dẫn để request
    xhttp.open("PATCH", "/ApiV1/HomeDetailByAdmin/"+window.location.pathname.substring(16),false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send(homePostJson);
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


