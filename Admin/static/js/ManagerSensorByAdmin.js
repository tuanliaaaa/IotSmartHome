var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "Admin";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            GetAllSensor();
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
function searchSensor()
{
    var Sensorname =document.getElementById('search__Sensor').value;
    if(Sensorname=='')
    {
        GetAllSensor();
    }else{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() 
        {
            if(xhttp.status==200)
            {
                var ResponseJson=xhttp.responseText
                var Response= JSON.parse(ResponseJson)
                var tableSensorElement = document.getElementById('table__Sensors');
                
                var tableSensorHtml ='<thead><tr><th>Sensor Name</th><th>Equipment Name</th><th>Sensor Key</th><th>Action</th></tr></thead><tbody>';
                for (var i =0;i<Response.length;i++){
                    tableSensorHtml+='<tr><td>'+Response[i].SensorName+'</td><td>'+Response[i].Equipment.EquipmentName+'</td><td>'+Response[i].SensorIP+'</td><td><div class="action__Sensor"><div class="action__Sensor__Edit"><i class="fa-solid fa-pen-to-square" onclick="editSensor('+Response[i].id+')"></i></div><div class="action__Sensor__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
                }
                tableSensorHtml+='</body>';
                tableSensorElement.innerHTML=tableSensorHtml;
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
        xhttp.open("GET", "/ApiV1/SearchSensorByAdmin/"+Sensorname,false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send();
    }
}
function GetAllSensor(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            var ResponseJson=xhttp.responseText
            var Response= JSON.parse(ResponseJson)
            var tableSensorElement = document.getElementById('table__Sensors');
           
            
            var tableSensorHtml ='<thead><tr><th>Sensor Name</th><th>Equipment Name</th><th>Sensor Key</th><th>Action</th></tr></thead><tbody>';
            for (var i =0;i<Response.length;i++){
                tableSensorHtml+='<tr><td>'+Response[i].SensorName+'</td><td>'+Response[i].Equipment['EquipmentName']+'</td><td>'+Response[i].SensorIP+'</td><td><div class="action__Sensor"><div class="action__Sensor__Edit" ><i class="fa-solid fa-pen-to-square" onclick="editSensor('+Response[i].id+')"></i> </div><div class="action__Sensor__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
            }
            tableSensorHtml+='</body>';
            tableSensorElement.innerHTML=tableSensorHtml;
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
    xhttp.open("GET", "/ApiV1/AllSensor",false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}  

function Delete(SensorID){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            
        }else if(xhttp.status==204){
           GetAllSensor();
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
    xhttp.open("DELETE", "/ApiV1/SensorDetailByAdmin/"+SensorID,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}
function editSensor(SensorID){
    window.location="/Admin/EditSensor/"+SensorID;
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

