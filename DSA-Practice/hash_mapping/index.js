let nums = [1,1,1,2,2,3,3,4,4,25,6,7]

let k;
const count = {}
// created array for sorting the list to put the similar values in it
for(const num of nums){
    count[num] = (count[num]|| 0)+1;
    
}
//maping values(frequency , index)
const array = Object.entries(count).map(([num,freq])=>[freq , parseInt(num),])
array.sort((a,b) => b[0] - a[0]); //order sorting
return array.slice(0,k).map((pair) => pair[1]);





