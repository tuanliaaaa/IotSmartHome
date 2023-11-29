var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "User";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            allroom();
            getTemprature();
            getHumiditi();
        } else {
            localStorage.removeItem("Token");   
            window.location="/Login";
        }
    });;
}else{
    window.location="/Login";
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
                window.location = "/Login";
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
    window.location="/Login";
    localStorage.removeItem("Token");
}
function toggleNav() {
    var navigation = document.querySelector('#navbar .navigation');
    var menuIcon = document.querySelector('#navbar .menu-button');
    var navbar = document.getElementById("navbar");
    navbar.classList.add("unshow");
    menuIcon.classList.add("hidden");
    navigation.style.left = '0';
}
var navbar = document.getElementById("navbar");
navbar.addEventListener("click",(e)=>{
    if(e.target.classList.contains("unshow")){  
        e.target.classList.remove("unshow");
        var navigation = document.querySelector('#navbar .navigation');
        setTimeout(()=>{
            menuIcon.classList.remove("hidden");
        },200);
        navigation.style.left = '-255px';
        var menuIcon = document.querySelector('#navbar .menu-button');
    }else{

    }
   
})
var navigation = document.querySelector("#navbar .navigation");
navigation.addEventListener("click",(e)=>{
    e.stopPropagation();
})

function allroom(){
    const xhttp = new XMLHttpRequest();
        //nhận dự liệu về (http response)
        xhttp.onload = function() 
        {
            //lấy dữ liệu dạng json
            var ResponseJson=xhttp.responseText
            //chuyển về dữ liệU javascript
            var Response= JSON.parse(ResponseJson)
            console.log(Response)
            if(xhttp.status==200)
            {
                
                var s = document.getElementById('home');
                var s1 = '<ul>'
                for(var i=0;i<Response.length;i++){
                    s1+='<li><div class = "homename"><span>'+Response[i]['HomeName']+'</span></div><div class="listRoom"><ul>'
                    for(var j =0;j<Response[i]['rooms'].length;j++){
                        s1+='<li onclick="roomDetail('+Response[i]['rooms'][j]['id']+')">'
                        +'<div class="roomDetail">'
                          +'  <div class="roomDetail__logo">'
                                +'<div class="logo__content"></div>'
                                +'<div class="logo__img">'
                                    +'<img src="Home/Media/Image/'+Response[i]['rooms'][j]['RoomAdmin']['RoomAdminImg']+'" alt="">'
                                +'</div>'
                            +'</div>'
                            +'<div class="roomDetail__content">'
                                +'<p>'+Response[i]['rooms'][j]['RoomName']+'</p>'
                            +'</div>'
                        +'</div>'
                    +'</li>'
                    }
                    s1+='</ul></div></li>'
                }
                s1+='</ul>'
                
                s.innerHTML = s1;
                
            }
            else
            {
               
            }
        }         
        //khai báo phương thức và đường dẫn để request
        xhttp.open("GET", "http://127.0.0.1:8000/ApiV1/HomeByUserLogin",false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send();
}
function getTemprature(){
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/temprature/');  
    socket.addEventListener('open', (event) => {
        // console.log('WebSocket connection opened:', event);
        socket.send("Connect to Server")
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
        // console.log('WebSocket message received:', event.data);
        try{

            document.getElementById('temprature').innerHTML='<p>'+event.data+'<p>';
        }catch{

        }
    });

    // Connection closed
    socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });

    // Connection error
    socket.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
    });
}
function getHumiditi(){
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/humiditi/');  
    socket.addEventListener('open', (event) => {
        // console.log('WebSocket connection opened:', event);
        socket.send("Connect to Server")
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
        // console.log('WebSocket message received:', event.data);
        try{

            document.getElementById('humiditi').innerHTML='<p>'+event.data+'<p>';
        }catch{

        }
    });

    // Connection closed
    socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });

    // Connection error
    socket.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
    });
}
function roomDetail(id){
   
    window.location="/EquipmentByRoom/"+id;
}

function showvoice(){  
    var logger = document.getElementById('logger');
    logger.style.display="flex";
}
function unshow(){
    var logger = document.getElementById('logger');
    logger.style.display="none";
}
document.querySelector("#logger .logger__content").addEventListener('click', function(event) {
    event.stopPropagation(); 
});


getMode();
function getMode() {
    // Tạo một đối tượng XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if ( xhr.status == 200) {
            var ResponseJson = xhr.responseText;
            var Response= JSON.parse(ResponseJson)
            console.log('Success:', Response);

            // Cập nhật giá trị của input range
            document.getElementById('ModeStatus').value = Response['StatusMode'];
        }else if(xhr.status==401)
        {
            localStorage.removeItem("Token");
            window.location="/Login";
        }
        else if(xhr.status==403)
        {
            localStorage.removeItem("Token");
            window.location="/Login";
        }
    };
    xhr.open('GET', '/ApiV1/ModeByUser', true);
    xhr.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhr.setRequestHeader("Authorization",authorization);

    // Gửi yêu cầu
    xhr.send();
}
document.getElementById('ModeStatus').addEventListener('input',UpdateMode);
function UpdateMode() {
   
    var modeValue = document.getElementById('ModeStatus').value;

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if ( xhr.status == 200) {
            var ResponseJson = xhr.responseText;
            var Response= JSON.parse(ResponseJson)
            console.log('Success:', Response);

            // Cập nhật giá trị của input range
            document.getElementById('ModeStatus').value = Response['StatusMode'];
        }else if(xhr.status==401)
        {
            localStorage.removeItem("Token");
            window.location="/Login";
        }
        else if(xhr.status==403)
        {
            localStorage.removeItem("Token");
            window.location="/Login";
        }
    };

    xhr.open('PATCH', '/ApiV1/ModeByUser', true);
    xhr.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhr.setRequestHeader("Authorization",authorization);
    modeValueJson= JSON.stringify({"StatusMode":modeValue});
    xhr.send(modeValueJson);
}