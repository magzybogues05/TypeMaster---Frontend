
const allKeys=["Q","W","E","R","T","Y","U","I","O","P","[","]","A","S","D","F","G","H","J","K","L",";","'","Z","X","C","V","B","N","M",",",".","/","SPACE"];

const getRandomCharacter=()=>{
    let idx=Math.floor(Math.random()*allKeys.length);
    return allKeys[idx];
}
module.exports=getRandomCharacter;

