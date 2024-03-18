import React, { useContext } from 'react'
import { AppContext } from './Keyboard';

const Key = ({keyVal,isSpace,isActive}) => {

  
  const {currentKeyPressed,isGreen}= useContext(AppContext);

  return (

    <div className={(isSpace)?(((currentKeyPressed==keyVal)? ((isGreen)?"space green":"space red"): isActive?'space activekey':'space')):(((currentKeyPressed==keyVal)?(isGreen?"key green":"key red"):(isActive ? 'key activekey':'key')))}>
      {keyVal}
    </div>
  )
}


export default Key


