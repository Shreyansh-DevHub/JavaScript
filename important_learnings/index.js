// using .reduce() .map() .filter() and arrow key functions

const numbers = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];

//arrow key operation

const square = numbers.map((element) => Math.pow(element , 2));

const evennum = numbers.filter((element) => element % 2 === 0);

const oddnum = numbers.filter((element) => element % 2 !== 0);

const total = numbers.reduce((acc , element) => (acc + element));



console.log(total);

