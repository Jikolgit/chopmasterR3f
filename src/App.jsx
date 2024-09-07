import { Canvas } from '@react-three/fiber'
import { createContext, useContext, useEffect,useCallback, useRef, useState } from 'react'
import { HandModel } from '../components/GameApp'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GameUi_ActionButton } from '../components/GameUi';
// import { PixiElem } from '../components/PixiComp';
import { Container, Graphics, Sprite, Stage, useTick } from "@pixi/react";
import { PixiElem, PixiElemManager } from '../components/PixiComp';
export let appContext = createContext(null);
let pixiContext = createContext(null);

function App() {
  let refCount = useRef(0);
  let gamePause = useRef(false);
  let canClickOnButton = useRef(true)
  const Level = useRef(1);
  let setOnce = useRef(false);
  const [count, setCount] = useState(0);
  const ContainerContext = useRef(null);
  let cursorControllerFunc = useRef(null);
  const StartHandMoveFunc = useRef(null);
  let pixiControllerFunc = useRef(null)

  // useEffect(()=>
  //   {
  //     setPixiVue()
  //   },[])
  return (
    <>
        <appContext.Provider
          value={{StartHandMoveFunc,ContainerContext,count,refCount,cursorControllerFunc,Level,pixiControllerFunc,canClickOnButton,setOnce}}
        >
        <div ref={ContainerContext} className={`absolute bg-black max-w-[700px] left-[0] right-[0] mx-auto  w-full 
        md1:h-[100%] md1:max-h-[700px] h-[600px] select-none `}>
            <Canvas>
                
                <HandModel />
                
                <PerspectiveCamera position={[30,25,-10]} makeDefault />
                <OrbitControls target={[0,3,0]} />
            </Canvas>
            <PixiElemManager />
            <GameUi_ActionButton />
        </div>
        </appContext.Provider>

    </>
  )
}






export default App
