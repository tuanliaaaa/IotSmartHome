var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "SuperAdmin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetAllEquipment();
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
function searchEquipment()
{
    var Equipmentname =document.getElementById('search__Equipment').value;
    if(Equipmentname=='')
    {
        GetAllEquipment();
    }else{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() 
        {
            if(xhttp.status==200)
            {
                var ResponseJson=xhttp.responseText
                var Response= JSON.parse(ResponseJson)
                var tableEquipmentElement = document.getElementById('table__Equipments');
                
                var tableEquipmentHtml ='<thead><tr><th>Equipment Name</th><th>Equipment Type</th><th>Action</th></tr></thead><tbody>';
                for (var i =0;i<Response.length;i++){
                    tableEquipmentHtml+='<tr><td>'+Response[i].EquipmentAdminName+'</td><td>'+Response[i].EquipmentAdminType+'</td><td><div class="action__Equipment"><div class="action__Equipment__Edit"><i class="fa-solid fa-pen-to-square" onclick="editEquipment('+Response[i].id+')"></i></div><div class="action__Equipment__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
                }
                tableEquipmentHtml+='</body>';
                tableEquipmentElement.innerHTML=tableEquipmentHtml;
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
        xhttp.open("GET", "/ApiV1/SearchEquipmentBySuperAdmin/"+Equipmentname,false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send();
    }
}
function GetAllEquipment(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            var ResponseJson=xhttp.responseText
            var Response= JSON.parse(ResponseJson)
            var tableEquipmentElement = document.getElementById('table__Equipments');
           
            console.log(Response)
            var tableEquipmentHtml ='<thead><tr><th>Equipment Name</th><th>Equipment Type</th><th>Action</th></tr></thead><tbody>';
            for (var i =0;i<Response.length;i++){
                tableEquipmentHtml+='<tr><td>'+Response[i].EquipmentAdminName+'</td><td>'+Response[i].EquipmentAdminType+'</td><td><div class="action__Equipment"><div class="action__Equipment__Edit" ><i class="fa-solid fa-pen-to-square" onclick="editEquipment('+Response[i].id+')"></i> </div><div class="action__Equipment__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
            }
            tableEquipmentHtml+='</body>';
            tableEquipmentElement.innerHTML=tableEquipmentHtml;
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
    xhttp.open("GET", "/ApiV1/AllEquipmentSuperAdmin",false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}  

function Delete(EquipmentID){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            
        }else if(xhttp.status==204){
           GetAllEquipment();
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
    xhttp.open("DELETE", "/ApiV1/EquipmentDetailBySuperAdmin/"+EquipmentID,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}
function editEquipment(EquipmentID){
    window.location="/SuperAdmin/EditEquipmentSuperAdmin/"+EquipmentID;
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

