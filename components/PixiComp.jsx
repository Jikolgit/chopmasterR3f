import { Container, Graphics, Sprite, Stage, useTick } from "@pixi/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../src/App";
import { CustomCounter } from "./utils";

let pixiContext = createContext(null);
function CusrorBack(props)
{
        const SuccessZoneParam = props.successZoneParam
        const draw = useCallback((g) => {
                g.clear();
                
                g.beginFill(props.colors);
                g.drawRect(
                  0,
                  0,
                  props.w,
                  props.containerH
                );
              }, [props]);
        const SuccessZone = useCallback((g) => {
                let rectSize = SuccessZoneParam.current.h
                g.clear();
                g.beginFill("0x04bf8a");
                g.drawRect(
                  0,
                  SuccessZoneParam.current.y,
                  props.w,
                  SuccessZoneParam.current.h
                );
              }, [props]);
        
        return(
                <>
                     <Graphics draw={draw} />
                     
                </>
        ) 
    
}
function SuccessZoneComp(props)
{
        const SuccessZoneParam = props.successZoneParam
        const SuccessZone = useCallback((g) => {
                let rectSize = SuccessZoneParam.current.h
                g.clear();
                g.beginFill(props.color);
                g.drawRect(
                  0,
                  SuccessZoneParam.current.y,
                  props.w,
                  SuccessZoneParam.current.h
                );
              }, [props]);
        return(
                <>
                     
                     <Graphics  draw={SuccessZone} />
                </>
        )  
}
function RectangleCUrsor(props)
{
        let _appContext = useContext(appContext);
        const _PixiContext = useContext(pixiContext);
        let cursorSpeed = useRef(2); // 1 2 2.5 5 a changer en fonction de la concentration
        let cursorSize = useRef(2);
        let cursorDirection = useRef('DOWN');
        // const SuccessZoneParam = useRef({y:(170*0.5)-(25*0.5) ,h:25});
        const SuccessZoneParam = props.successZoneParam
        let cursorYValue = useRef(0);
        let cursorCanMove = useRef(false)
        const [CursorY,setCursorY] = useState(0); 
        const draw = useCallback((g) => {
                g.clear();
                // g.lineStyle(1, 0xffffff);
                g.beginFill(props.colors);
                g.drawRect(
                  0,
                  0,
                  props.w,
                  props.h
                );
              }, [props]);
        
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
        let restartCursor = ()=>
                {
                        cursorYValue.current = 0;
                        setCursorY(c => c = cursorYValue.current);
                        cursorDirection.current = 'DOWN';
                        cursorCanMove.current = true;
                }
        let checkCursorPosition = ()=>
                {
                        cursorCanMoveFunc(false)

                        if(cursorYValue.current > SuccessZoneParam.current.y &&
                        cursorYValue.current < (SuccessZoneParam.current.y+SuccessZoneParam.current.h) 
                        )
                        {
                                props.appCont.StartHandMoveFunc.current('success');
                                // console.log('success');
                        }    
                        else
                        {
                                props.appCont.StartHandMoveFunc.current('fail');
                                // console.log('fail');
                        }
                        
                }
        useTick((delta)=>
                {
                        if(cursorCanMove.current)
                        {
                                if(cursorDirection.current == 'DOWN')
                                {
                                        if(CursorY != 170 )
                                        {
                                                cursorYValue.current = cursorYValue.current + cursorSpeed.current
                                                setCursorY(c => c = cursorYValue.current)
                                        }
                                        else
                                        {
                                                cursorDirection.current = 'UP'
                                        }
                                }
                                else
                                {
                                        if(CursorY != 0)
                                        {
                                                cursorYValue.current = cursorYValue.current - cursorSpeed.current
                                                setCursorY(c => c = cursorYValue.current)
                                        }
                                        else
                                        {
                                                cursorDirection.current = 'DOWN'
                                        }
                                }
                        }
                        
                        
                        
                        

                })
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
                        else
                        {
                                cursorCanMoveFunc(args)
                        }
                }
        // useEffect(()=>
        //         {
        //                 props.appCont.cursorControllerFunc.current = (args)=>
        //                 {
        //                         cursorController(args);
        //                 }
        //                 if(props.autoStart)
        //                 {
        //                         cursorCanMove.current = true;
        //                         props.appCont.canClickOnButton.current = true;
        //                 }
                        
        //         },[])
              return(
                        <>
                                <Container
                                        
                                        position={[0,CursorY]}
                                        width={20}
                                        height={cursorSize.current}
                                >
                                         <Graphics draw={draw} />
                                </Container>
                        </>
              ) 
             
    
}

export function PixiElemManager()
{
        let _appContext = useContext(appContext);
        let [container,setContainer] = useState(<PixiElem autoStart={false} />);
      
        useEffect(()=>
        {
                _appContext.pixiControllerFunc.current = (args)=>
                {
                        if(args == 'REDUCE-SUCCESS')
                        {
                               
                                       
                                        setContainer(null);
                                        let resetPixi = ()=>
                                                {
                                                        setContainer(<PixiElem autoStart={true} />)
                                                        return true;
                                                }
                                        let customCounter = new CustomCounter(5,0,resetPixi,null);
                                        customCounter.start()
                                        // setTimeout(()=>{setContainer(<PixiElem autoStart={true} />)},500)
                                
                        }
                        
                }
        },[])
        return( <>
                {container}
        </>
                
        )
}
export function PixiElem(props)
{
        let _appContext = useContext(appContext);
        let pixiVal = useRef('1542')
        let cursorRef = useRef(null);
        let successZoneHeight = _appContext.Level.current == 2 ? 20 : 60;
        let successZoneHeight2 = 50
        const SuccessZoneParam = useRef({y:(170*0.5)-(successZoneHeight*0.5) ,h:successZoneHeight});
        const SuccessZoneParam2 = useRef({y:(170*0.5)-(successZoneHeight2*0.5) ,h:successZoneHeight2});
        
    
    
        // useEffect(()=>
        //         {
        //                 if(_appContext.Level.current == 2 )
        //                 {       console.log('ici')
        //                         _appContext.cursorControllerFunc.current(true);
        //                 }
        //         },[])
    return(
            <>
                    <pixiContext.Provider value={{pixiVal}}
                    >
                        
                    <div id="PIXI-CONTAINER" className="absolute z-[2] top-[0] h-[170px] bottom-[0] my-auto left-[10px] ">
                            <Stage

                                    width={13}
                                    height={172}
                                //     options={{ background: 'red' }}
                                    >
                                        
                                    <Container
                                                position={[0,0]}
                                                width={13}
                                                height={170}
                                                
                                    >
                                        
                                        <CusrorBack  w={13} containerH={170}  colors={'0x024059'} />
                                        {/* <SuccessZoneComp w={13} color={'black'} successZoneParam={SuccessZoneParam2} /> */}
                                        <SuccessZoneComp w={13} color={'0x04bf8a'} successZoneParam={SuccessZoneParam} />
                                        
                                        <RectangleCUrsor 
                                        autoStart = {props.autoStart}
                                        successZoneParam={SuccessZoneParam}
                                        appCont={_appContext}  
                                        w={13} h={5} colors={'white'} />
                                    </Container>
                                    
                                    
                            </Stage>
                    </div>
                    </pixiContext.Provider>
                    
            </>
    )
}

