import { useEffect, useState } from "react";
 function Countdown({initialSeconds}){
    const [seconds,setSeconds]=useState(initialSeconds);
    const [isRunning,setIsRunning]= useState(false);
    useEffect(()=>{
        if(!isRunning) return
        const timer=setInterval(()=>{
            setSeconds(pre => {
                if(pre<=1){
                    clearInterval(timer);
                    setIsRunning(false);
                    return 0
                }
                return pre - 1;

            })
        },1000)
        return ()=>{
            clearInterval(timer)
        }
    },[isRunning])
    return(
        <div>
            <h1>{seconds===0 ? "Hết giờ": seconds}</h1>
            <button onClick={()=>{setIsRunning(!isRunning)}}>{isRunning ? "Pause" :"Start"}</button>
            <button onClick={()=>{setSeconds(initialSeconds)
                setIsRunning(false)}}>Reset</button>
        </div>
    )
}
export default Countdown