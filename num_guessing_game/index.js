const min = 1
const max = 100
let answer = Math.floor((Math.random()*(max-min) + min))
let attempts = 0
let running = true

while(running){
    let guess = window.prompt(`guess the number between , ${min} - ${max}`);
    guess = Number(guess);

    if(isNaN(guess)){
        window.alert("please specify number between 1 to 100");
    }
    else if(guess < min || guess > max){
        window.alert("please specify number between 1 to 100");
    }
    else{
        attempts++;
        if(guess < answer){
            window.alert("number too low")
        }
        else if(guess > answer){
            window.alert("answer too high")
        }
        else{
            window.alert(`your answer is correct the answer was ${answer} and no. of attempts were ${attempts}`);
            running = false;
        }
    }
}