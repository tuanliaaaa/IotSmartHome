getHumiditi();
getTemprature();
getAllEquipment();
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
                        <div class="deviceLabel">
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
                        <input type="range" id="speedSlider" name="speedSlider" min="0" max="3" step="1" value="${listEquipment[i]['StatusActive']}"  oninput="changValueEquipment(${listEquipment[i]['id']},this.value)">                              
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