import { useContext, useEffect } from "react"
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
                <div onClick={actionButton} className="w-[50px] h-[50px] bg-red-500 cursor-pointer
                                absolute z-[2] left-[0] right-[0] bottom-[10px] mx-auto 
                "></div>
            </>
    )
}