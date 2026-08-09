const display = document.getElementById("display");



function evaluation(input){
    display.value += input;
}


function cleared(){
    display.value = " ";
}


function calcu(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}