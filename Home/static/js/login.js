        
if (localStorage.getItem("Token") )
{
    window.location='/Admin/AllUser';
}   
function loginByEnter()
{
   if(event.keyCode==13)
   {
       login();
   }
}
function login()
{
   const xhttp = new XMLHttpRequest();
   xhttp.onload = function() 
   {
       var tokenResponseJson=xhttp.responseText
       var tokenResponse= JSON.parse(tokenResponseJson)
       if(xhttp.status==201)
       {
           localStorage.setItem("Token", tokenResponse['access']);
           window.location='/Admin/AllUser';

           
       }
       else
       {
           document.getElementById("error").innerText=tokenResponse['message']
           document.getElementById("form__content__text__error").style="display:block"
       }
   }         
   const userInfo={
        Username:document.getElementById("Username").value,
        Password:document.getElementById("Password").value
   }
   postData=JSON.stringify(userInfo)
   xhttp.open("POST", "/ApiV1/User/Token",false);
   xhttp.setRequestHeader("Content-type","application/json")
   xhttp.send(postData)
}
