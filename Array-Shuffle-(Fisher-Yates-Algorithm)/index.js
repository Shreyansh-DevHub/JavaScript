

//fisher yates algorithm

array = [ 1 , 2, "h" ," e" , "r" , "y" , "er" , "q" , "w" , "t" ];

shuffle(array);

console.log(array);



function shuffle(array){
    for(let i = (array.length - 1) ; (i > 0); (i--)){
        const random = Math.floor(Math.random()*(i+1));
        [array[i] , array[random]] = [array[random] , array[i]];
    }


}
