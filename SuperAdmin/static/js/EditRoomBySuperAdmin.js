var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "SuperAdmin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetRoom();
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


async function GetRoom(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() 
    {
        if(xhttp.status==200)
        {
            
        var ResponseJson=xhttp.responseText;
        var Response= JSON.parse(ResponseJson);
       
        var RoomByIDElement =document.getElementById('RoomEdit__inFor');
        
        var RoomByIDHtml='<div class="Room__infor__RoomName"><label for="RoomName">RoomName</label><input type="text" id="RoomName" value="'+Response.RoomAdminName+'"></div>'
        RoomByIDHtml+='<div class="Room__infor__RoomName"><label for="RoomKey">Room Key</label><input type="text" id="RoomKey" value="'+Response.RoomAdminKey+'"></div>'
        RoomByIDHtml+='<div class="Room__infor__RoomName"><label for="RoomAdminStatus">Room Status</label><input type="text" id="RoomAdminStatus" value="'+Response.RoomAdminStatus+'"></div>'
        RoomByIDHtml+='<div class="Room__infor__RoomImg"><label for="RoomAdminImg">Room Img</label><img  id="RoomAdminImg" src="/Home/Media/Image/'+Response.RoomAdminImg+'"></div>'

       

        RoomByIDElement.innerHTML=RoomByIDHtml;
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
    xhttp.open("GET", "/ApiV1/RoomDetailBySuperAdmin/"+window.location.pathname.substring(31),false);
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
            window.location='/SuperAdmin/RoomSuperAdmin'
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
    const RoomPost ={
        RoomAdminName:document.getElementById('RoomName').value,
        RoomAdminKey:document.getElementById("RoomKey").value,
        RoomAdminStatus:document.getElementById("RoomAdminStatus").value
        
    }
    var RoomPostJson =JSON.stringify(RoomPost);
    //khai báo phương thức và đường dẫn để request
    xhttp.open("PATCH", "/ApiV1/RoomDetailBySuperAdmin/"+window.location.pathname.substring(31),false);
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


