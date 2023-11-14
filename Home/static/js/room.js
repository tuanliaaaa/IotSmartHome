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