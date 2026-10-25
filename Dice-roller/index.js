



function roller(){
    let input = document.getElementById("input").value;
    let rolled_value = document.getElementById("rolled_value");
    let rolled_img = document.getElementById("rolled_img");
    let value = [];
    let img = []; 


    for(let i = 0 ; i < input; i++){
        let number = Math.floor(Math.random()*6) + 1;
        value.push(number);
        img.push(`<img src="dice_images/${number}.png">`);

    }

    rolled_value.textContent = `Dice : ${value.join(`, `)}`
    rolled_img.innerHTML = img.join(``);
}
