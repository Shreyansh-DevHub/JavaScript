
function update(){
    let now = new Date();
    let hours = now.getHours().toString().padStart(2,0);
    let meridian = hours >=12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2,0)
    let minutes = now.getMinutes().toString().padStart(2,0);
    let second = now.getSeconds().toString().padStart(2,0);
    let time = `${hours}:${minutes}:${second} ${meridian}`;
    document.getElementById("timer").textContent = time;
}
update();
setInterval(update, 1000);