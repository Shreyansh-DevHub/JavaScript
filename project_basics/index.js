let checkboxbtn = document.getElementById("checkboxbtn");
let button1 = document.getElementById("button1");
let tag = document.getElementById("tag");
let tag2 = document.getElementById("tag2");
let radiobtn = document.getElementById("radiobtn");
button1.onclick = function(){
    if(checkboxbtn.checked){
        tag.textContent = "checked";
    }
    else{
        tag.textContent = " not checked";

    }
    
    if(radiobtn.checked){
        tag2.textContent = "checked";
    }
    else{
        tag2.textContent = " not checked";

    }
}
