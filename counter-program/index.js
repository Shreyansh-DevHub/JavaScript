let tag1 = document.getElementById("tag1");
let addition = document.getElementById("addition");
let reset = document.getElementById("reset");
let subtraction = document.getElementById("subtraction");
let count = 0;

addition.onclick = function(){
    count++;
    tag1.textContent = count;
}
reset.onclick = function(){
    count = 0;
    tag1.textContent = count;
}
subtraction.onclick = function(){
    count--;
    tag1.textContent = count;
}
