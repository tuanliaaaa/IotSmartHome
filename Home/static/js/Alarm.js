
getEquipment();
function getEquipment(){
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
                
                var s = document.getElementById("equipment");
                var s1 = '<div class="deviceLabel"><p><i class="fa-solid fa-tv"></i>'+Response.EquipmentName+'</p></div>'
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