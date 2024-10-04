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
    // let successZoneHeight =  _appContext.Level.current >= 5 ? 20 : 30;
    // let successZonePosition;
    let successZoneSizeArr = [10,40,30,20,60];
    let succesZoneSize = successZoneSizeArr[1];
    const SuccessZonePositionArr = [(170*0.5)-(succesZoneSize*0.5),
        5-(succesZoneSize*0.5),
        50-(succesZoneSize*0.5),
        100-(succesZoneSize*0.5)];
    let succesZonePosition = SuccessZonePositionArr[0]
    if(_appContext.Level.current == 4){succesZoneSize = successZoneSizeArr[2];succesZonePosition = SuccessZonePositionArr[3]}
    else if(_appContext.Level.current == 6){succesZoneSize = successZoneSizeArr[3];succesZonePosition = SuccessZonePositionArr[2]}
    else if(_appContext.Level.current == 9){succesZoneSize = successZoneSizeArr[4];succesZonePosition = SuccessZonePositionArr[1]}
    else if(_appContext.Level.current == 13){succesZoneSize = successZoneSizeArr[0];succesZonePosition = SuccessZonePositionArr[0]}

    const SuccessZoneParam = useRef({y:succesZonePosition,h:succesZoneSize});
    

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
                    <div className="w-full h-full bg-[#024059] overflow-hidden "></div>
                    <div id="SUCCESS-ZONE"
                    style={{height:SuccessZoneParam.current.h,top:SuccessZoneParam.current.y}} 
                    className={`w-full bg-[#04bf8a] absolute z-[2] `}></div>
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
                if(args == 'UPDATE-CURSOR')
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

//faire changer la place de la zone de succès