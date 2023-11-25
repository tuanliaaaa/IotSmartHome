var indexPage=1;
if(localStorage.getItem("Token")){
    
    GetAllUser();
  
    
}
else{
    window.location="/Admin/Login";
}

function LogOut(){
    window.location="/Admin/Login";
    localStorage.removeItem("Token");
}
function searchUser()
{
    var Username =document.getElementById('search__User').value;
    if(Username=='')
    {
        GetAllUser();
    }else{
        console.log(Username);
        indexPage=1;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() 
        {
            if(xhttp.status==200)
            {
                var ResponseJson=xhttp.responseText
                var Response= JSON.parse(ResponseJson)
                var tableUserElement = document.getElementById('table__Users');
                var indexPageElement = document.getElementById('indexPage');
                var indexPageHtml='';
                if(indexPage>1){
                    indexPageHtml+='<div class="indexPage___prev" onclick="prevPage()" ><p><</p></div>';
                }
                indexPageHtml +='<div class="indexPage___now"><p>'+indexPage+'</p></div>';
                if(Response.length==2){
                    indexPageHtml+='<div class="indexPage___next" onclick="nextPage()"><p>></p></div>';
                }
                
                var tableUserHtml ='<thead><tr><th>UserName</th><th>FullName</th><th>Action</th></tr></thead><tbody>';
                for (var i =0;i<Response.length;i++){
                    tableUserHtml+='<tr><td>'+Response[i].UserName+'</td><td>'+Response[i].FullName+'</td><td><div class="action__User"><div class="action__User__Edit"><i class="fa-solid fa-pen-to-square" onclick="editUser('+Response[i].id+')"></i></div><div class="action__User__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
                }
                tableUserHtml+='</body>';
                indexPageElement.innerHTML=indexPageHtml;
                tableUserElement.innerHTML=tableUserHtml;
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
        xhttp.open("GET", "/ApiV1/UserByName/"+Username+"?page="+indexPage,false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        token = localStorage.getItem("Token");
        authorization ='Bearer '+token
        xhttp.setRequestHeader("Authorization",authorization);
        xhttp.send();
    }
}
function GetAllUser(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            var ResponseJson=xhttp.responseText
            var Response= JSON.parse(ResponseJson)
            var tableUserElement = document.getElementById('table__Users');
            var indexPageElement = document.getElementById('indexPage');
            var indexPageHtml='';
            if(indexPage>1){
                indexPageHtml+='<div class="indexPage___prev" onclick="prevPage()" ><p><</p></div>';
            }
            indexPageHtml +='<div class="indexPage___now"><p>'+indexPage+'</p></div>';
            if(Response.length==2){
                indexPageHtml+='<div class="indexPage___next" onclick="nextPage()"><p>></p></div>';
            }
            
            var tableUserHtml ='<thead><tr><th>UserName</th><th>FullName</th><th>Action</th></tr></thead><tbody>';
            for (var i =0;i<Response.length;i++){
                tableUserHtml+='<tr><td>'+Response[i].UserName+'</td><td>'+Response[i].FullName+'</td><td><div class="action__User"><div class="action__User__Edit" ><i class="fa-solid fa-pen-to-square" onclick="editUser('+Response[i].id+')"></i> </div><div class="action__User__Delete"><i class="fa-solid fa-trash"onclick="Delete('+Response[i].id+')" ></i></div></div></td></tr>'
            }
            tableUserHtml+='</body>';
            indexPageElement.innerHTML=indexPageHtml;
            tableUserElement.innerHTML=tableUserHtml;
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
    xhttp.open("GET", "/ApiV1/AllUser?page="+indexPage,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}  
function prevPage(){
    indexPage-=1;
    GetAllUser();
}
function nextPage(){
    indexPage+=1;
    GetAllUser();
}
function Delete(userID){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() 
    {
        if(xhttp.status==200)
        {
            
        }else if(xhttp.status==204){
           GetAllUser();
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
    xhttp.open("DELETE", "/ApiV1/UserByIDForAdmin/"+userID,false);
    //định dạng gửi đi787
    xhttp.setRequestHeader("Content-type","application/json")
    token = localStorage.getItem("Token");
    authorization ='Bearer '+token
    xhttp.setRequestHeader("Authorization",authorization);
    xhttp.send();
}
function editUser(userID){
    window.location="/Admin/EditUser/"+userID;
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

