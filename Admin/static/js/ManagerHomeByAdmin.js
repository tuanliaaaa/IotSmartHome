var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "Admin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetAllHome();
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
function searchHome()
{
    var Homename =document.getElementById('search__Home').value;
    if(Homename=='')
    {
        GetAllHome();
    }else{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() 
        {
            if(xhttp.status==200)
            {
                var ResponseJson=xhttp.responseText
                var Response= JSON.parse(ResponseJson)
                var tableHomeElement = document.getElementById('table__Homes');
                
                var tableHomeHtml ='<thead><tr><th>HomeName</th><th>UserName</th><th>Action</th></tr></thead><tbody>';
                for (var i =0;i<Response.length;i++){
                    tableHomeHtml+='<tr><td>'+Response[i].HomeName+'</td><td>'+Response[i].User.FullName+'</td><td><div class="action__Home"><div class="action__Home__Edit"><i class="fa-solid fa-pen-to-square" onclick="editHome('+Response[i].id+')"></i></div><div class="action__Home__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
                }
                tableHomeHtml+='</body>';
                tableHomeElement.innerHTML=tableHomeHtml;
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
        xhttp.open("GET", "/ApiV1/SearchHomeByAdmin/"+Homename,false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send();
    }
}
function GetAllHome(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            var ResponseJson=xhttp.responseText
            var Response= JSON.parse(ResponseJson)
            var tableHomeElement = document.getElementById('table__Homes');
           
            
            var tableHomeHtml ='<thead><tr><th>HomeName</th><th>UserName</th><th>Action</th></tr></thead><tbody>';
            for (var i =0;i<Response.length;i++){
                tableHomeHtml+='<tr><td>'+Response[i].HomeName+'</td><td>'+Response[i].User['FullName']+'</td><td><div class="action__Home"><div class="action__Home__Edit" ><i class="fa-solid fa-pen-to-square" onclick="editHome('+Response[i].id+')"></i> </div><div class="action__Home__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
            }
            tableHomeHtml+='</body>';
            tableHomeElement.innerHTML=tableHomeHtml;
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
    xhttp.open("GET", "/ApiV1/AllHome",false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}  

function Delete(homeID){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            
        }else if(xhttp.status==204){
           GetAllHome();
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
    xhttp.open("DELETE", "/ApiV1/HomeDetailByAdmin/"+homeID,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}
function editHome(homeID){
    window.location="/Admin/EditHome/"+homeID;
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

