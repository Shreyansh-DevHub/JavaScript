let temprature = document.getElementById("temprature");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let submit = document.getElementById("submit");
let output = document.getElementById("output")
let temp;
function convert(){
    if(btn1.checked){
        temp = Number(temprature.value);
        temp = temp *9/5 + 32;
        output.textContent = temp.toFixed(1) + " F";
    }
    else if(btn2.checked){
        temp = Number(temprature.value);
        temp = (temp-32)* (5/9);
        output.textContent = temp.toFixed(1) + " C";
    }
    else{
        output.textContent = "please select a unit"
    }
}