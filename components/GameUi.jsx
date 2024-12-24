import { useContext, useEffect, useRef, useState } from "react"
import { appContext } from "../src/App"

export function GameUi_ActionButton()
{
    const _appContext = useContext(appContext)

    let actionButton = ()=>
        {
            if(_appContext.canClickOnButton.current)
            {
                _appContext.canClickOnButton.current = false;
                _appContext.cursorControllerFunc.current('CHECK-POSITION')
            }
        }
    useEffect(()=>
        {
            
        },[])
    return(
            <>
                <div onClick={actionButton} className="w-[60px] h-[60px] cursor-pointer rounded-full bg-blue-500
                                absolute z-[2] left-[0] right-[0] bottom-[10px] mx-auto border-[2px] border-yellow-500
                                flex overflow-hidden p-[5px]
                ">
                    <div className="w-full h-full absolute z-[2] "></div>
                    <img src="actionicon.png" alt="action" className="w-full" />
                </div>
            </>
    )
}

export function GameTitle()
{
    let _appContext = useContext(appContext)
    let startGame = ()=>
        {
            _appContext.AppController('START-GAME')
        }
    let gotToShop = ()=>
        {
            
            // _appContext.AppController('SHOP')
            _appContext.AppController('SHOP')
        }
    return(
            <>
                <div className="w-full h-full bg-blue-500 absolute top-[0] left-[0] z-[2] ">
                        <div>
                        <img src="title.png" alt="title" className="max-w-[500px] mx-auto mt-[20px] " />
                        </div>
                        <div className="w-[80px] h-[30px] mt-[25px] mx-auto flex justify-around ">
                            <img src="brickicon.jpg" alt="brick icon" className="w-[30px] block " />
                            <div className="text-[1.2rem] text-white flex flex-col justify-center">x</div>
                            <div className="text-[1.5rem] text-white font-bold flex flex-col justify-center">
                                {_appContext.Level.current}
                            </div>
                        </div>
                        <div className="mt-[50px] ">
                            {/* <img onClick={startGame}  src="playButton.png" alt="play" className="cursor-pointer w-[150px] mx-auto " /> */}
                            <ButtonTemplate type={1} title={'PLAY'} callBack={startGame} />
                        </div>
                        <div className="mt-[50px] ">
                            {/* <img onClick={gotToShop}  src="shopButton.png" alt="shop" className="cursor-pointer w-[150px] mx-auto " /> */}
                            <ButtonTemplate type={1} title={'GLOVES'} callBack={gotToShop} />
                        </div>
                </div>
            </>
    )
}

export function PauseButton()
{
    let _appContext = useContext(appContext)
    return(
            <div className="cursor-pointer w-[50px] h-[50px] absolute z-[2] right-[20px] top-[20px] " >
                <svg onClick={()=>{_appContext.pauseScreenContainerControllerFunc.current(true)}} fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
                        <path d="M10 15V9" />
                        <path d="M14 15V9" />
                </svg>
            </div>
    )
}

export function PauseScreenContainer()
{
    let _appContext = useContext(appContext)
    let [pauseScreen,setPauseScreen] = useState(_appContext.gamePause.current);

    let togglePause = (args)=>
        {
            if(_appContext.canClickOnButton.current)
            {
                _appContext.gamePause.current = args;
                setPauseScreen(_appContext.gamePause.current)
                
            }
            
        }
    
    useEffect(()=>
        {
            _appContext.pauseScreenContainerControllerFunc.current = (args)=>
                {
                   
                        togglePause(args)
                    
                }
        },[])
    return(
            <>
                {pauseScreen &&
                    <div className="w-full h-full bg-black/80 absolute top-[0] left-[0] z-[4] ">
                        <div
                            className="text-center text-[2.5rem] text-white font-bold "
                        >
                            PAUSE
                        </div>
                        <div className="mt-[50px] ">
                            {/* <img onClick={()=>{togglePause(false)}}  src="continuerButton.png" alt="continuer" className="cursor-pointer w-[150px] mx-auto " /> */}
                            <ButtonTemplate type={1} callBack={()=>{togglePause(false)}} title={"RESUME"} />
                        </div>
                        <div className="mt-[50px] ">
                            {/* <img onClick={()=>{_appContext.AppController('TITLE')}}  src="quittButton.png" alt="continuer" className="cursor-pointer w-[150px] mx-auto " /> */}
                            <ButtonTemplate type={2} callBack={()=>{_appContext.AppController('TITLE')}} title={"QUIT"} />
                        </div>
                    </div>
                }
            </>

    )
}

export function ShopScreenContainer()
{
    let _appContext = useContext(appContext)
    return(
            <>
                
                    <div
                        className="absolute top-0 left-0 right-0 mx-auto text-center text-[2.5rem] text-white font-bold "
                    >
                        GLOVES
                    </div>
                    <div
                        onClick={(evt)=>{_appContext.shopViewController.current('LEFT')}}
                        className={`rounded-[10px] opacity-50
                                    absolute bottom-[115px] left-[250px] w-[50px] h-[50px]
                                    cursor-pointer select-none 
                                    bg-gray-500 `}
                    >
                        <svg width={50} height={50} fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </div> 
                    <div
                        onClick={(evt)=>{_appContext.shopViewController.current('RIGHT')}}
                        className={`rounded-[10px] opacity-50
                                    absolute bottom-[115px] right-[250px] w-[50px] h-[50px]
                                    cursor-pointer select-none
                                     bg-gray-500 `}
                    >
                        <svg width={50} height={50} fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </div> 
                    
                    <div className="absolute bottom-[10px] left-0 right-0 mx-auto ">
                        {/* <img onClick={()=>{_appContext.AppController('TITLE')}}  src="backButton.png" alt="continuer" className="cursor-pointer w-[150px] mx-auto " /> */}
                        <ButtonTemplate type={2} title={'BACK'} callBack={()=>{_appContext.AppController('TITLE')}} />
                    </div>
            </>
    )
}

export function ShopElem()
{
    return(
        <div className="w-[200px] h-[170px] inline-block my-[10px] ">
                <div className="w-[160px] h-[160px] border-red-500 border-[2px] mx-auto rounded-[15px] shadow-lg "></div>
        </div>
    )
}

export function NotificationMsg()
{
    let _appContext = useContext(appContext)
    let NotificationElem = ()=>
        {
            let [topValue,setTopValue] = useState(-50);
            let interval1 = useRef(null)
            let interval2 = useRef(null)
            useEffect(()=>
                {
                    interval1.current = window.setTimeout(()=>{setTopValue(30)},50)
                    interval2.current = window.setTimeout(()=>{setTopValue(-90)},1500)
                    
                    return ()=>
                        {
                            clearTimeout(interval1.current)
                            clearTimeout(interval2.current)
                        }
                },[])
            return(
                <div
                    style={{top:topValue+'px'}} 
                className=" text-center absolute z-[3] left-[0] right-[0] 
                            text-white font-[1.5rem] font-bold p-[5px]
                            transition-[top] duration-[250ms]
                            mx-auto w-[150px] h-[50px] bg-blue-500 border-white border-[1px] ">
                    COMING SOON !
                </div>
            )
        }
    let [notfiContainer,setNotifContaienr] = useState(null);

    useEffect(()=>
        {
            _appContext.notificationControllerFunc.current = (args)=>
                {
                    if(args == 'SHOW-NOTIF')
                    {
                        setNotifContaienr(null);
                        window.setTimeout(()=>{setNotifContaienr(<NotificationElem />),50})
                    }
                }
        },[])
    return(
            <>
                {notfiContainer}
            </>
    )
}

export function GameBrickCounter()
{
    let _appContext = useContext(appContext);
    let [playBrickCounterValue,setPlayBrickCounterValue] = useState(_appContext.Level.current);

    useEffect(()=>
        {
            _appContext.gameBrickCounterControllerFunc.current = (args)=>
                {
                    if(args == 'UPDATE-SCORE')
                    {
                        setPlayBrickCounterValue(_appContext.Level.current);
                    }
                    
                }
        },[])
    return(
        <div className="w-[80px] h-[30px] mt-[25px] mx-auto flex justify-around 
                        absolute z-[2] left-[10px] top-[40px]">
                <img src="brickicon.jpg" alt="brick icon" className="w-[30px] block " />
                <div className="text-[1.2rem] text-white flex flex-col justify-center">x</div>
                <div className="text-[1.5rem] text-white font-bold flex flex-col justify-center">
                    {playBrickCounterValue}
                </div>
        </div>
    )
}

export function PlayerLifeVue()
{
    let _appContext = useContext(appContext)
    let [playerLife,setPlayerLife] = useState(_appContext.PlayerLife.current)
    useEffect(()=>
        {
            _appContext.playerLifeVueControllerFunc.current = (args)=>
                {
                    if(args=='UPDATE')
                    {
                        setPlayerLife(_appContext.PlayerLife.current)
                    }
                }
        },[])
    return(
            <>
                <div className="absolute z-[2] left-[10px] top-[10px] h-[50px] flex justify-around ">
                        <img src="heart.png" alt="heart icon" className="w-[40px] block " />
                        
                        <div className="text-[1.2rem] text-white flex flex-col justify-center mx-[5px] ">x</div>
                        <div className="text-[1.5rem] text-white font-bold flex flex-col justify-center">
                            {playerLife}
                        </div>
                </div>
                
            </>
    )
}

export function GameOverScreen()
{
    let _appContext = useContext(appContext)
    let [showGameOver,setShowGameOver] = useState(false)

    useEffect(()=>
        {
            _appContext.gameOverScreenControllerFunc.current = (args)=>
                {
                    if(args == 'SHOW-GAME-OVER')
                    {
                        _appContext.PlayerLife.current = 5;
                        setShowGameOver(true)
                    }
                }
        },[])
    return(
            <>
                {showGameOver &&
                    <div className="w-full h-full bg-blue-500 absolute top-[0] left-[0] z-[4] ">
                        <div
                            className="text-center text-[2.5rem] text-white font-bold "
                        >
                            GAME OVER
                        </div>
                        {/* <div className="mt-[50px] ">
                            <img onClick={()=>{_appContext.AppController('RESTART')}}  src="restartButton.png" alt="Reprendre" className="cursor-pointer w-[150px] mx-auto " />
                        </div> */}
                        <div className="mt-[50px] ">
                            <img onClick={()=>{_appContext.AppController('TITLE')}}  src="quittButton.png" alt="Quitter" className="cursor-pointer w-[150px] mx-auto " />
                        </div>
                    </div>
                }
            </>
    )
}
export function LoadingScreen()
{
    let _appContext = useContext(appContext)
    let [showLoadingScreen,setShowLoadingScreen] = useState(true);

    useEffect(()=>
        {
            _appContext.loadingScreenControllerFunc.current = (args)=>
                {
                    if(args == 'HIDE-LOADING')
                    {
                        setShowLoadingScreen(false);
                    }
                }
        },[])
    return(
            <>
                {showLoadingScreen &&
                    <div className="w-full h-full bg-blue-800/70 absolute top-[0] left-[0] z-[5] ">
                        <div
                            className="text-center text-[2.5rem] text-white font-bold "
                        >
                            LOADING.......
                        </div>
                        
                    </div>
                }
            </>
    )
}

export function ButtonTemplate(props)
{
    
    let color = props.type == 1? 'bg-blue-800' : 'bg-rose-600'
    return(
            <>
                <div onClick={props.callBack}  className={`w-[150px] h-[60px] cursor-pointer rounded-[12px] ${color}  text-[1.5rem] font-bold 
                                shadow-lg mx-auto
                                border-[2px] border-white text-white text-center flex flex-col justify-center `}>
                    {props.title}
                </div>
            </>
    )
}
//LoadingScreen 5
//GameOverScreen,Pause Screen 4
//Notification 3