import { useContext, useEffect, useRef, useState } from "react"
import { appContext } from "../src/App";
import { CustomCounter } from "./utils";

function CursorElem(props)
{
    let _appContext = useContext(appContext)
    let cursorRef = useRef(null);
    let cursorSpeedValue = [1,2,2.5,5];
    // let cursorSpeedValueIndex =useRef(0);
    let cursorSpeed = useRef(cursorSpeedValue[_appContext.cursorSpeedValueIndex.current]) // 1 2 2.5 5 a changer en fonction de la concentration
    let animationContainer = useRef(null)
    let cursorDirection = useRef('DOWN')
    let cursorPosition = useRef(0);
    let cursorCanMove = useRef(false);
    let successZoneHeight =  _appContext.Level.current >= 5 ? 20 : 60;
    const SuccessZoneParam = useRef({y:(170*0.5)-(successZoneHeight*0.5) ,h:successZoneHeight});
    

    let startCursorMove = ()=>
        {
            if(cursorCanMove.current && !_appContext.gamePause.current)
            {
                if(cursorDirection.current=='DOWN')
                    {
                        if(cursorPosition.current == 168)
                        {
                            cursorDirection.current='UP'
                        }
                        else
                        {
                            cursorPosition.current += cursorSpeed.current;
                        }
                        
                    }
                    else
                    {
                        if(cursorPosition.current == 0)
                        {
                            cursorDirection.current='DOWN'
                        }
                        else
                        {
                            cursorPosition.current -= cursorSpeed.current
                        }
                    }
                    cursorRef.current.style.top = cursorPosition.current+'px';
            }
            
            animationContainer.current = window.requestAnimationFrame(startCursorMove)
        }
    let restartCursor = ()=>
        {
                cursorPosition.current = 0;
                
                cursorDirection.current = 'DOWN';
                cursorCanMove.current = true;
        }
    let cursorCanMoveFunc = (args)=>
        {
                
                if(args == 'restart')
                {
                        restartCursor();
                }
                else
                {
                        cursorCanMove.current = args;
                }
        }
    let checkCursorPosition = ()=>
        {
                cursorCanMoveFunc(false)

                if(cursorPosition.current > SuccessZoneParam.current.y &&
                cursorPosition.current < (SuccessZoneParam.current.y+SuccessZoneParam.current.h) 
                )
                {
                        _appContext.StartHandMoveFunc.current('success');
                       
                }    
                else
                {
                        _appContext.StartHandMoveFunc.current('fail');
                        
                }
                
        }
        let cursorController = (args)=>
            {
                    if(args=='CHECK-POSITION')
                    {
                            checkCursorPosition()
                    }
                    else if(args=='restart')
                    {
                            cursorCanMoveFunc('restart')
                    }
                    else if(args=='INCREASE-SPEED')
                    {
                            _appContext.cursorSpeedValueIndex.current = _appContext.cursorSpeedValueIndex.current+1
                            cursorSpeed.current = cursorSpeedValue[_appContext.cursorSpeedValueIndex.current];
                            _appContext.canClickOnButton.current = true;
                    }
                    else
                    {
                        cursorCanMoveFunc(args)
                    }
            }
    useEffect(()=>
        {
            startCursorMove();
            _appContext.cursorControllerFunc.current = (args)=>
            {
                    cursorController(args);
            }
            if(props.autoStart)
            {
                    cursorCanMove.current = true;
                    _appContext.canClickOnButton.current = true;
            }
            return ()=>
            {
                window.cancelAnimationFrame(animationContainer.current)
            } 
        },[])
    return(
            <>
                <div
                    className="absolute z-[2] top-[0] w-[13px] h-[170px] bottom-[0] my-auto left-[20px] "
                >
                    <div className="w-full h-full bg-[#024059] "></div>
                    <div id="SUCCESS-ZONE"
                    style={{height:successZoneHeight}} 
                    className={`w-full h-[60px] bg-[#04bf8a] absolute z-[2] top-[0] bottom-[0] my-auto `}></div>
                    <div ref={cursorRef} id="CURSOR" 
                    className="w-full h-[2px] bg-white absolute z-[5] top-[0]
                            ">

                    </div>
                </div>
            </>
    )
}
export function CursorContainer(props)
{
    let _appContext = useContext(appContext)
    let [container,setContainer] = useState(<CursorElem autoStart={false} />);

    useEffect(()=>
        {
            _appContext.cursorManagerControllerFunc.current = (args)=>
            {
                if(args == 'REDUCE-SUCCESS')
                {
                    setContainer(null);
                    let resetCursor = ()=>
                    {
                            setContainer(<CursorElem autoStart={true} />)
                            return true;
                    }
                    let customCounter = new CustomCounter(2,0,resetCursor,null);
                    customCounter.start()
                }
            }
        },[])
    return( <>
                {container}
            </>
            
    )
}