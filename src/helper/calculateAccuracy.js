const calculateAccuracy=(correct,total)=>{

    let accuracy=Math.round(correct*100/total);
    return accuracy;

}

module.exports={calculateAccuracy};