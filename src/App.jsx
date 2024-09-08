import { Canvas } from '@react-three/fiber'
import { createContext, useContext, useEffect,useCallback, useRef, useState } from 'react'
import { HandModel } from '../components/GameApp'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GameOverScreen, GameTitle, GameUi_ActionButton, NotificationMsg, PauseButton, PauseScreenContainer, PlayerLifeVue, ShopScreenContainer } from '../components/GameUi';
import { CursorContainer } from '../components/CursorComp';
export let appContext = createContext(null);
let pixiContext = createContext(null);

function App() {
  let refCount = useRef(0);
  const PlayerLife = useRef(5);
  let gamePause = useRef(false);
  let canClickOnButton = useRef(true)
  const Level = useRef(1);
  let setOnce = useRef(false);
  const [count, setCount] = useState(0);
  const ContainerContext = useRef(null);
  let cursorControllerFunc = useRef(null);
  let pauseScreenContainerControllerFunc = useRef(null);
  let notificationControllerFunc = useRef(null);
  let playerLifeVueControllerFunc = useRef(null);
  let gameOverScreenControllerFunc = useRef(null);
  const StartHandMoveFunc = useRef(null);
  let cursorManagerControllerFunc = useRef(null);
  let gameVueRef = useRef('PLAY')
  let [gameVue,setGameVue] = useState(gameVueRef.current);
  let cursorSpeedValueIndex =useRef(0);

  const AppController = (args)=>
    {
      if(args == 'START-GAME')
      {
        gameVueRef.current = 'PLAY';
        setGameVue(gameVueRef.current);
      }
      else if(args == 'RESTART')
      {
        gamePause.current = false;
        gameVueRef.current = 'TITLE';
        setGameVue(gameVueRef.current);
      }
      else if(args == 'TITLE')
      {
        gamePause.current = false;
        gameVueRef.current = 'TITLE';
        setGameVue(gameVueRef.current);
      }
      else if(args == 'SHOP')
      {
        gameVueRef.current = 'SHOP';
        setGameVue(gameVueRef.current);
      }
      else if(args == 'COMING-SOON')
      {
        gameVueRef.current = 'SHOP';
        setGameVue(gameVueRef.current);
      }
    }
  return (
    <>
        <appContext.Provider
          value={{gameOverScreenControllerFunc,playerLifeVueControllerFunc,notificationControllerFunc,PlayerLife,
                  cursorSpeedValueIndex,
                  pauseScreenContainerControllerFunc,gamePause,AppController,StartHandMoveFunc,ContainerContext,
                  count,refCount,cursorControllerFunc,Level,cursorManagerControllerFunc,canClickOnButton,setOnce}}
        >
        <div ref={ContainerContext} className={`absolute bg-black max-w-[700px] left-[0] right-[0] mx-auto  w-full 
        md1:h-[100%] md1:max-h-[700px] h-[600px] select-none `}>
            <Canvas>
                {gameVue == 'PLAY' &&
                        <>
                            <HandModel />
                            <axesHelper args={[5]} />
                            <PerspectiveCamera position={[30,25,-10]} makeDefault />
                            <OrbitControls target={[0,3,0]} />
                        </>
                }
                
            </Canvas>
            {gameVue == 'PLAY' && <GameUi_ActionButton />}
            {gameVue == 'PLAY' && <CursorContainer />}
            {gameVue == 'PLAY' && <PauseButton />}
            {gameVue == 'PLAY' && <PauseScreenContainer />}
            {gameVue == 'PLAY' && <PlayerLifeVue />}
            {gameVue == 'PLAY' && <GameOverScreen />}
            {gameVue == 'TITLE' && <GameTitle />}
            {gameVue == 'SHOP' && <ShopScreenContainer />}
            <NotificationMsg />
            
        </div>
        </appContext.Provider>

    </>
  )
}






export default App
