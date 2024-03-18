import React, { createContext, useCallback, useEffect, useState } from 'react'
import Key from './Key';
import getRandomCharacter from '../helper/randomCharacter';
import { calculateAccuracy } from '../helper/calculateAccuracy';

export const AppContext=createContext();

const Keyboard = () => {

    const keys1=["Q","W","E","R","T","Y","U","I","O","P","[","]"];
    const keys2=["A","S","D","F","G","H","J","K","L",";","'"];
    const keys3=["Z","X","C","V","B","N","M",",",".","/"];

    const [correctChar,setCorrectChar]=useState("SPACE");
    const [correctCount,setCorrectCount]=useState(0);
    const [incorrectCount,setIncorrectCount]=useState(0);
    const [accuracy,setAccuracy]=useState(100);
    const [currentKeyPressed,setCurrenKeyPressed]=useState("");
    const [isGreen,setIsGreen]=useState(false);

    const handleKeyboard= useCallback((event)=>{
        if(event.key===" "){
            // onEnter();
            // alert("spacebar pressed");
            if(correctChar=="SPACE")
            {
                setCurrenKeyPressed("SPACE");
                setIsGreen(true);
            }
            else{
                setCurrenKeyPressed("SPACE");
                setIsGreen(false);
            }
        }
        else{
            if(correctChar==event.key.toUpperCase())
            {
                setCurrenKeyPressed(correctChar);
                setIsGreen(true);

            }
            else if(keys1.includes(event.key.toUpperCase()) || keys2.includes(event.key.toUpperCase()) || keys3.includes(event.key.toUpperCase())){
                
                setCurrenKeyPressed(event.key.toUpperCase());
                setIsGreen(false);
            }
            
        }
        
    });
    const handleKeyRelease=useCallback((event)=>{
        setIsGreen(false);
        setCurrenKeyPressed("");
        if(event.key===" "){
            // onEnter();
            // alert("spacebar pressed");
            if(correctChar=="SPACE")
            {
                setAccuracy(calculateAccuracy(correctCount+1,correctCount+incorrectCount+1));
                setCorrectCount(correctCount+1);
                setCorrectChar(getRandomCharacter());
            }
            else{
                setAccuracy(calculateAccuracy(correctCount,correctCount+incorrectCount+1));
                setIncorrectCount(incorrectCount+1);
            }
        }
        else{
            if(correctChar==event.key.toUpperCase())
            {
                setAccuracy(calculateAccuracy(correctCount+1,correctCount+incorrectCount+1));
                setCorrectCount(correctCount+1);
                setCorrectChar(getRandomCharacter());
            }
            else if(keys1.includes(event.key.toUpperCase()) || keys2.includes(event.key.toUpperCase()) || keys3.includes(event.key.toUpperCase())){
                setAccuracy(calculateAccuracy(correctCount,correctCount+incorrectCount+1));
                setIncorrectCount(incorrectCount+1);
            }
            
        }
    })
    useEffect(()=>{
        document.addEventListener("keydown",handleKeyboard);
        document.addEventListener("keyup", handleKeyRelease);
        return ()=>{
            document.removeEventListener("keydown",handleKeyboard);
            document.removeEventListener("keyup", handleKeyRelease);
        }
    },[handleKeyboard]);

  return (

    <AppContext.Provider value={{currentKeyPressed,isGreen}}>
        <div className='keyboard-container'>
        <div className='keyboard' onKeyDown={handleKeyboard}>
            <div className='line1'>
                {keys1.map((key)=>{
                    return <Key keyVal={key} isSpace={false} isActive={key==correctChar}/>
                })}
            </div>
            <div className='line2'>
                {keys2.map((key)=>{
                    return <Key keyVal={key} isSpace={false} isActive={key==correctChar}/>
                })}
            </div>
            <div className='line3'>
                {keys3.map((key)=>{
                    return <Key keyVal={key} isSpace={false} isActive={key==correctChar}/>
                })}
            </div>
            <div className='line4'>
                <Key keyVal={"SPACE"} isSpace={true} isActive={"SPACE"==correctChar}/>
            </div>
        </div>
        <div className='accuracy'>
            <div>
                <span className='correct-count'>{correctCount}</span> / <span className='incorrect-count'>{incorrectCount}</span>
            </div>
            <div>
                Accuracy : {accuracy} %
            </div>
        </div>
    
        </div>
    </AppContext.Provider>
  )
}

export default Keyboard



