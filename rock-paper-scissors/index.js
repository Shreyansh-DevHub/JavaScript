let computerdisplay = document.getElementById("computerdisplay");
let playchoice = document.getElementById("playchoice");

let resultdisplay = document.getElementById("resultdisplay");
let playerscore = document.getElementById("playerscore");
let computerscore = document.getElementById("computerscore");
let result = "";
let player = 0;
let computer = 0;


let choices = ['rock' , 'paper' , 'scissors'];

function playgame(playerchoice){
    let computerchoice = choices[Math.floor(Math.random()*3)];
    if(playerchoice == computerchoice){
        result = "Its a TIE";
    }
    else{
        switch(playerchoice){
            case "rock":
                result = (computerchoice == "scissors") ? "You win" : "You lose";
                break;
            case "paper":
                result = (computerchoice == "rock") ? "You win" : "You lose";
                break;
            case "scissors":
                result = (computerchoice == "rock") ? "You win" : "You lose";
        }
        
    }
    computerdisplay.textContent = `Computer Choice: ${computerchoice}`;
    playchoice.textContent = `Player Choice: ${playerchoice}`;
    resultdisplay.textContent = result;
    resultdisplay.classList.remove("greentext" , "redtext");
    
    
    switch(result){
        case "You win":
            resultdisplay.classList.add("greentext");
            player++;
            playerscore.textContent = `Player score: ${player}`;
            
            break;
        case "You lose":
            resultdisplay.classList.add("redtext");
            computer++;
            computerscore.textContent = `Computer score: ${computer}`;
            break;
    }




}   
