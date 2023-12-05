var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "SuperAdmin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetAllRoom();
        } else {
            localStorage.removeItem("Token");
            window.location="/SuperAdmin/Login";
        }
    });;
}else{
    window.location="/SuperAdmin/Login";
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
                window.location = "/SuperAdmin/Login";
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
    window.location="/SuperAdmin/Login";
    localStorage.removeItem("Token");
}
function searchRoom()
{
    var Roomname =document.getElementById('search__Room').value;
    if(Roomname=='')
    {
        GetAllRoom();
    }else{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() 
        {
            if(xhttp.status==200)
            {
                var ResponseJson=xhttp.responseText
                var Response= JSON.parse(ResponseJson)
                var tableRoomElement = document.getElementById('table__Rooms');
                
                var tableRoomHtml ='<thead><tr><th>Room Name</th><th>Room Key</th><th>Action</th></tr></thead><tbody>';
                for (var i =0;i<Response.length;i++){
                    tableRoomHtml+='<tr><td>'+Response[i].RoomAdminName+'</td><td>'+Response[i].RoomAdminKey+'</td><td><div class="action__Room"><div class="action__Room__Edit"><i class="fa-solid fa-pen-to-square" onclick="editRoom('+Response[i].id+')"></i></div><div class="action__Room__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
                }
                tableRoomHtml+='</body>';
                tableRoomElement.innerHTML=tableRoomHtml;
            }else if(xhttp.status==204){
               
            }
            else if(xhttp.status==401)
            {
                localStorage.removeItem("Token");
                window.location="/SuperAdmin/Login";
            }
            else if(xhttp.status==403)
            {
                localStorage.removeItem("Token");
                window.location="/SuperAdmin/Login";
            }
        }         
        //khai báo phương thức và đường dẫn để request
        xhttp.open("GET", "/ApiV1/SearchRoomBySuperAdmin/"+Roomname,false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send();
    }
}
function GetAllRoom(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            var ResponseJson=xhttp.responseText
            var Response= JSON.parse(ResponseJson)
            var tableRoomElement = document.getElementById('table__Rooms');
           
            
            var tableRoomHtml ='<thead><tr><th>Room Name</th><th>Home Key</th><th>Action</th></tr></thead><tbody>';
            for (var i =0;i<Response.length;i++){
                tableRoomHtml+='<tr><td>'+Response[i].RoomAdminName+'</td><td>'+Response[i].RoomAdminKey+'</td><td><div class="action__Room"><div class="action__Room__Edit" ><i class="fa-solid fa-pen-to-square" onclick="editRoom('+Response[i].id+')"></i> </div><div class="action__Room__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
            }
            tableRoomHtml+='</body>';
            tableRoomElement.innerHTML=tableRoomHtml;
        }else if(xhttp.status==204){
           
        }
        else if(xhttp.status==401)
        {
            localStorage.removeItem("Token");
            window.location="/SuperAdmin/Login";
        }
        else if(xhttp.status==403)
        {
            localStorage.removeItem("Token");
            window.location="/SuperAdmin/Login";
        }
    }         
    //khai báo phương thức và đường dẫn để request
    xhttp.open("GET", "/ApiV1/AllRoomSuperAdmin",false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}  

function Delete(RoomID){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            
        }else if(xhttp.status==204){
           GetAllRoom();
        }
        else if(xhttp.status==401)
        {
            localStorage.removeItem("Token");
            window.location="/SuperAdmin/Login";
        }
        else if(xhttp.status==403)
        {
            localStorage.removeItem("Token");
            window.location="/SuperAdmin/Login";
        }
    }         
    //khai báo phương thức và đường dẫn để request
    xhttp.open("DELETE", "/ApiV1/RoomDetailByAdmin/"+RoomID,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}
function editRoom(RoomID){
    window.location="/SuperAdmin/EditRoomSuperAdmin/"+RoomID;
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
var search=document.querySelector(".header__userInfor__search input");
search.addEventListener("focus",function(){
    document.querySelector(".header__userInfor__search i:first-of-type ").classList.add("focus");
});
search.addEventListener("blur",function(){
    document.querySelector(".header__userInfor__search i:first-of-type ").classList.remove("focus");
});
function searchApear(){
    document.querySelector(".header__userInfor__search input").focus();
}

