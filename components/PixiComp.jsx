import { Container, Graphics, Sprite, Stage, useTick } from "@pixi/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../src/App";

let pixiContext = createContext(null);
function CusrorBack(props)
{
        const SuccessZoneParam = useRef({y:(170*0.5)-(25*0.5) ,h:25});
        const draw = useCallback((g) => {
                g.clear();
                
                g.beginFill(props.colors);
                g.drawRect(
                  0,
                  0,
                  props.w,
                  props.h
                );
              }, [props]);
        const SuccessZone = useCallback((g) => {
                let rectSize = SuccessZoneParam.current.h
                g.clear();
                g.beginFill("white");
                g.drawRect(
                  0,
                 ( props.h*0.5)-(rectSize*0.5),
                  props.w,
                  rectSize
                );
              }, [props]);
        
        return(
                <>
                     <Graphics draw={draw} />
                     <Graphics  draw={SuccessZone} />
                </>
        ) 
    
}
function RectangleCUrsor(props)
{
        let _appContext = useContext(appContext);
        const _PixiContext = useContext(pixiContext);
        let cursorSpeed = useRef(2);
        let cursorSize = useRef(2);
        let cursorDirection = useRef('DOWN');
        const SuccessZoneParam = useRef({y:(170*0.5)-(25*0.5) ,h:25});
        let cursorYValue = useRef(0);
        let cursorCanMove = useRef(true)
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
                        if(cursorYValue.current > SuccessZoneParam.current.y &&
                        cursorYValue.current < (SuccessZoneParam.current.y+SuccessZoneParam.current.h) 
                        )
                        {
                                props.appCont.StartHandMoveFunc.current('success');
                                console.log('success');
                        }    
                        else
                        {
                                props.appCont.StartHandMoveFunc.current('fail');
                                console.log('fail');
                        }
                        cursorCanMoveFunc(false)
                }
        useTick((delta)=>
                {
                        if(cursorCanMove.current)
                        {
                                if(cursorDirection.current == 'DOWN')
                                {
                                        if(CursorY != 170-cursorSize.current )
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
        useEffect(()=>
                {
                        props.appCont.cursorControllerFunc.current = (args)=>
                        {
                                cursorController(args)
                        }
                        // props.appCont.checkCusrorFunc.current = ()=>
                        // {
                        //         checkCursorPosition()
                        // }
                        // props.appCont.cursorCanMoveFunc.current = (args)=>
                        // {
                        //         cursorCanMoveFunc(args)
                        // }
                },[])
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
export function PixiElem()
{
        let pixiVal = useRef('1542')
        let cursorRef = useRef(null)
    let _appContext = useContext(appContext);
    
    
    
    return(
            <>
                    <pixiContext.Provider value={{pixiVal}}
                    >
                        
                    <div id="PIXI-CONTAINER" className="absolute z-[2] top-[0] h-[170px] bottom-[0] my-auto left-[10px] ">
                            <Stage

                                    width={20}
                                    height={170}
                                //     options={{ background: 0x1099bb }}
                                    >
                                        
                                    <Container
                                                position={[0,0]}
                                                width={20}
                                                height={170}
                                                
                                    >
                                        
                                        <CusrorBack  w={20} h={170} colors={'0x1099bb'} />
                                        
                                        <RectangleCUrsor 
                                        appCont={_appContext}  
                                        w={20} h={5} colors={'red'} />
                                    </Container>
                                    
                                    
                            </Stage>
                    </div>
                    </pixiContext.Provider>
                    
            </>
    )
}

