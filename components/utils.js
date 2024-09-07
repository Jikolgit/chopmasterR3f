export class CustomCounter
{
    constructor(timer,repetitionLimit,callBackFunc,callBackFunc2)
    {
        this.startEffect=false;
        this.repetition = 0;
        this.repetitionLimit = repetitionLimit
        this.initialTimer = timer;
        this.timer=timer;
        this.callBackFunc = callBackFunc;
        this.callBackFunc2 = callBackFunc2;
        this.counterOver = null;
        this.animationContainer = null
    }
    start = ()=>
    {
        
        this.timer --;
        if(this.timer == 0)
        {
            this.repetition ++;
            this.timer = this.initialTimer;
            
            if(this.repetitionLimit == 0)
            {
                this.counterOver = this.callBackFunc();
                if(!this.counterOver)
                {   
                    this.animationContainer =  window.requestAnimationFrame(this.start)
                }
                else
                {  
                    this.cancelCounter()
                }
            }
            else
            {
                this.callBackFunc();
                if(this.repetition<this.repetitionLimit)
                    {
                        this.animationContainer =  window.requestAnimationFrame(this.start)
                    }
                    else
                    {
                        this.cancelCounter();
                        this.callBackFunc2();
                    }
            }
            
           
           
        }
        else
        {
            this.animationContainer =  window.requestAnimationFrame(this.start)
            
        }

        
    }
    cancelCounter()
    {
       
        window.cancelAnimationFrame(this.animationContainer)
    }
}

