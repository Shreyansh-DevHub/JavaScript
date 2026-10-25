let tag1 = document.getElementById("tag1");
let tag2 = document.getElementById("tag2");
let tag3 = document.getElementById("tag3");
let generate = document.getElementById("generate");
let min = 1
let max = 10


generate.onclick = function(){
    tag1.textContent = Math.floor((Math.random() * (max-min)) + min);
    tag2.textContent = Math.floor((Math.random() * (max-min)) + min);
    tag3.textContent = Math.floor((Math.random() * (max-min)) + min);

}