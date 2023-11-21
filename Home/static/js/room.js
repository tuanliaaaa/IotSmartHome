getTemprature();
getHumiditi();
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
allroom();
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
                        s1+='<li>'
                        +'<div class="roomDetail">'
                          +'  <div class="roomDetail__logo">'
                                +'<div class="logo__content"></div>'
                                +'<div class="logo__img">'
                                    +'<img src="Image/device.jpg" alt="">'
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
        xhttp.open("GET", "http://127.0.0.1:8000/ApiV1/HomeByUserID/1",false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
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