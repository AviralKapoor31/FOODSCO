function validateform(){
    var username=document.reg.username;
    var email=document.reg.email;
    var password=document.reg.password;
    var uid=username.value.length;
    var pw=password.value.length;
    if(uid<5){
        alert("Username is too short");
        return false;
    }
    if(uid>20){
        alert("Username is too large");
        return false;
    }
    if(pw<5){
        alert("Password is too short");
        return false;
    }
    

}