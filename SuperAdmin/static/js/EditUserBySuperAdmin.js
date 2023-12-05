var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "Admin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetUser();
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
function GetUser(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
        var ResponseJson=xhttp.responseText;
        var Response= JSON.parse(ResponseJson);
        console.log(Response)
          var userByIDElement =document.getElementById('userEdit__inFor');
          var userByIDHtml='<div class="User__infor__UserName"><label for="UserName">UserName</label><input type="text" id="UserName" value="'+Response.UserName+'"></div><div class="User__infor__FullName"><label for="FullName">FullName</label><input type="text" id="FullName" value="'+Response.FullName+ '"></div><div class="User__infor__Password"><label for="Password">Password</label><input type="text" id="Password" value="'+Response.Password+'"> </div>';
          userByIDElement.innerHTML=userByIDHtml;
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
    xhttp.open("GET", "/ApiV1/UserDetailBySuperAdmin/"+window.location.pathname.substring(31),false);
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
            window.location='/SuperAdmin/UserSuperAdmin'
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
    const userPost ={
        UserName:document.getElementById('UserName').value,
        Password: document.getElementById('Password').value,
        FullName: document.getElementById('FullName').value
    }
    
    var userPostJson =JSON.stringify(userPost);
    //khai báo phương thức và đường dẫn để request
    xhttp.open("PATCH", "/ApiV1/UserDetailBySuperAdmin/"+window.location.pathname.substring(31),false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send(userPostJson);
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


