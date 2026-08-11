const slides = document.querySelectorAll(".slides img");

let slideindex = 0;
let intervalid = null;


document.addEventListener("DOMContentLoaded" , initialslider);

function initialslider(){
    if(slides.length > 0){
        slides[slideindex].classList.add("displayslide");
        intervalid = setInterval(nextslide , 5000);
    }
}

function showslide(index){

    if(index >= slides.length){
        slideindex = 0;
    }
    else if(index < 0){
        slideindex = slides.length  - 1;
    }

    slides.forEach(slides => {
        slides.classList.remove("displayslide");
    });
    slides[slideindex].classList.add("displayslide");

}
function nextslide(){
    slideindex++;
    showslide(slideindex);
}
function prevslide(){
    clearInterval(intervalid);
    slideindex--;
    slideindex(slideindex);

}