var RoleList=[];
function isRoleNameExist(roles, roleNameToCheck) {
    return roles.some(role => role.RoleName === roleNameToCheck);
}
if(localStorage.getItem("Token")){   
    checkUserLogin().then((result) => {
        RoleList=result;
        const roleNameToCheck = "User";
        if (isRoleNameExist(RoleList, roleNameToCheck)) {
            getAllEquipment();
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
function getAllEquipment(){
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/equipment/'+window.location.pathname.substring(17));  
    socket.addEventListener('open', (event) => {
        // console.log('WebSocket connection opened:', event);
        socket.send("Connect to Server")
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
        // console.log('WebSocket message received:', event.data);
        listEquipment =JSON.parse( event.data);
        console.log(listEquipment);
        listEquipmentElement=document.getElementById('controlDevice');  
        listEquipmentHtml=`<div class="controlDevice__header">
            <h3>Manual Control</h3>
        </div><div class="controlDevice__deviceList">
        <ul>`;
        for(var i=0;i<listEquipment.length;i++){
            listEquipmentHtml+=` 
                <li>
                    <div class="deviceDetail">
                        <div class="deviceLabel" onclick="EquipmentDetail(${listEquipment[i]['id']})"   >
                            <p><i class="fa-solid fa-tv"></i> ${listEquipment[i]['EquipmentName']}</p>
                        </div>
                        `;
            let equipmentType=listEquipment[i]['EquipmentType'];
            if(equipmentType==1){
                    listEquipmentHtml+= `<div class="deviceContent">
                            <label class="toggle-switch">
                                <input type="checkbox" ${listEquipment[i]['StatusActive']=="1"?"checked":""} >
                                <span class="toggle-slider"  onclick="changValueEquipment(${listEquipment[i]['id']},${listEquipment[i]['StatusActive']=="1"?0:1})"></span>
                            </label>
                        </div>`
            }else if(equipmentType==2){

                listEquipmentHtml+= `<div class="deviceContent">
                        <label class="toggle-switch">
                        </label>
                        <input type="range" id="speedSlider" name="speedSlider" min="1" max="3" step="1" value="${listEquipment[i]['StatusActive']}"  oninput="changValueEquipment(${listEquipment[i]['id']},this.value)">                              
                    </div>`
            }
            listEquipmentHtml+=`</div></li>`;
        }
            listEquipmentHtml+=`</ul></div>`;
        listEquipmentElement.innerHTML=listEquipmentHtml;
          // Lấy tất cả các nút "toggleSlider"
        //   const toggleButtons = document.querySelectorAll('.toggle-slider');
          
        //   // Lặp qua từng nút và thêm sự kiện click
        //   toggleButtons.forEach(button => {
        //       button.addEventListener('click', function() {
                
        //           // Tìm thẻ input trước nó
        //           const previousInput = this.previousElementSibling;
  
        //           // Đảo ngược giá trị thuộc tính "checked"
        //           previousInput.checked = !previousInput.checked;
        //       });
        //   });
        
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
function changValueEquipment(id,value){
console.log(value)

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            history(id,value);
        }
        else if(xhttp.status=401)
        {
            // localStorage.removeItem("Token");
            // window.location="/Login";
        }
        else if(xhttp.status=403)
        {
            // localStorage.removeItem("Token");
            // window.location="/Login";
        }
    }         
    const equipment ={
        StatusActive:value
    }
    equipmentJson = JSON.stringify(equipment);
    xhttp.open("PATCH", "/ApiV1/EquipmentByID/"+id,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(equipmentJson);
}
function EquipmentDetail(id){
    window.location="/EquipmentDetail/"+id;
}
function history(idEquipment,value){
    var tem = document.querySelector('#temprature p').textContent;
    var hum = document.querySelector('#humiditi p').textContent;
    var status = value;
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
                
            }
            else
            {
               
            }
        }     
        const history = {
            StatusActive : status,
            Temprature : tem,
            Humidity : hum,
        }   
        his = JSON.stringify(history) 
        //khai báo phương thức và đường dẫn để request
        xhttp.open("POST", "http://127.0.0.1:8000/ApiV1/history/"+idEquipment,false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send(his);
}