import { Canvas } from '@react-three/fiber'
import { createContext, useContext, useEffect,useCallback, useRef, useState } from 'react'
import { CameraManager, HandModel } from '../components/GameApp'
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { GameBrickCounter, GameOverScreen, GameTitle, GameUi_ActionButton, LoadingScreen, NotificationMsg, PauseButton, PauseScreenContainer, PlayerLifeVue, ShopScreenContainer } from '../components/GameUi';
import { CursorContainer } from '../components/CursorComp';
import { Shop3DView } from '../components/Shop3dView';
export let appContext = createContext(null);
let pixiContext = createContext(null);

function App() {
  let refCount = useRef(0);
  let currentGLove = useRef(1);
  let totalGLove = useRef(2);
  const PlayerLife = useRef(3);
  let gamePause = useRef(false);
  let updateCursorLevel  = useRef([1,2,3,4,5])
  let canClickOnButton = useRef(true)
  const Level = useRef(1);
  let setOnce = useRef(false);
  const [count, setCount] = useState(0);
  let brickTry = useRef('none');
  let brickTryUpdate = useRef(false);
  const ContainerContext = useRef(null);
  let cursorControllerFunc = useRef(null);
  let pauseScreenContainerControllerFunc = useRef(null);
  let notificationControllerFunc = useRef(null);
  let playerLifeVueControllerFunc = useRef(null);
  let gameOverScreenControllerFunc = useRef(null);
  let loadingScreenControllerFunc = useRef(null);
  let gameBrickCounterControllerFunc = useRef(null)
  const StartHandMoveFunc = useRef(null);
  let cursorManagerControllerFunc = useRef(null);
  let shopViewController = useRef(null)
  let gameVueRef = useRef('TITLE')
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
                  cursorSpeedValueIndex,loadingScreenControllerFunc,gameBrickCounterControllerFunc,updateCursorLevel,
                  pauseScreenContainerControllerFunc,gamePause,AppController,StartHandMoveFunc,ContainerContext,brickTryUpdate,totalGLove,
                  count,refCount,cursorControllerFunc,Level,cursorManagerControllerFunc,canClickOnButton,setOnce,brickTry,currentGLove,shopViewController}}
        >
        <div ref={ContainerContext}
        style={{backgroundColor:'#6fbbc7'}} 
        className={`absolute max-w-[700px] left-[0] right-[0] mx-auto  w-full 
        md1:h-[100%] md1:max-h-[700px] h-[600px] select-none `}>
            <Canvas>
                
                {gameVue == 'PLAY' &&
                        <>
                            <HandModel />
                            
                            <CameraManager />

                            
                            
                        </>
                }
                {gameVue == 'SHOP' &&
                        <>

                            <Shop3DView />
                            
                        </>
                }
            </Canvas>
            {gameVue == 'PLAY' && <GameUi_ActionButton />}
            {gameVue == 'PLAY' && <CursorContainer />}
            {gameVue == 'PLAY' && <PauseButton />}
            {gameVue == 'PLAY' && <PauseScreenContainer />}
            {gameVue == 'PLAY' && <PlayerLifeVue />}
            {gameVue == 'PLAY' && <GameBrickCounter />}
            {gameVue == 'PLAY' && <GameOverScreen />}
            {gameVue == 'TITLE' && <GameTitle />}
            {gameVue == 'SHOP' && <ShopScreenContainer />}
            <NotificationMsg />
            {gameVue == 'PLAY' && <LoadingScreen />}
            
        </div>
        </appContext.Provider>

    </>
  )
}






export default App
