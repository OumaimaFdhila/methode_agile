"use client"
import { SaveTimer } from "@/server actions/actions";
import { Timestamp } from "firebase-admin/firestore";
import { useContext, createContext, useState, useEffect, useRef } from "react"

const TimerContext = createContext<{isRunning?:boolean, start?: () => void, pause?: () => void, exit?: () => void, time?: number}>({})

export function useTimer(){
    return useContext(TimerContext)
}

export function TimerProvider({children}: { children: React.ReactNode }) {
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [IsLoaded, setIsLoaded] = useState(false)

    const start = () => {
        if (!isRunning) {
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => {
                return prevTime + 1
                });
            }, 1000);
            setIsRunning(true);
            const started_date = localStorage.getItem("date");
            if(started_date && started_date!==""){
                if(started_date < ((new Date()).getTime() - (24*60*60)).toString()){
                    localStorage.setItem("date", (new Date()).getTime().toString());
                }
            }
            else{
                localStorage.setItem("date", (new Date()).getTime().toString());
            }
        }
    };

    const pause = () => {
        if (isRunning) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
        }
    };
    const save = async (started_date:string)=>{
        const saved = await SaveTimer({time, date:Number(started_date)})
        if(saved){
            console.log("saved")
        }
    }

    const exit = async () => {
        clearInterval(intervalRef.current!);
        setTime(0);
        setIsRunning(false);

        const started_date = localStorage.getItem("date");
        if(started_date && started_date!==""){
            await save(started_date)
            localStorage.setItem("date", "");
        }
    };

    useEffect(() => {
        const storedTime = localStorage.getItem("timerTime");
        const storedIsRunning = localStorage.getItem("timerIsRunning");

        const started_date = localStorage.getItem("date");
        if(started_date && started_date!==""){
            if(started_date < ((new Date()).getTime() - (24*60*60*1000)).toString()){
                save(started_date)
                if(storedIsRunning){
                    localStorage.setItem("timerIsRunning", (new Date()).getTime().toString());
                }
                else{
                    localStorage.setItem("timerIsRunning", "");
                }
            }
        }
        else if((!started_date || started_date === "") && storedIsRunning){
            localStorage.setItem("timerIsRunning", (new Date()).getTime().toString());
        }
        
        if (storedTime) {
          setTime(parseInt(storedTime, 10));
        }
    
        if (storedIsRunning === "true") {
            console.log("running")
            setIsRunning(true);
            start();
        }

        setIsLoaded(true)
      }, []);

    useEffect(() => {
        if(!IsLoaded) return
        localStorage.setItem("timerTime", time.toString());
        localStorage.setItem("timerIsRunning", isRunning.toString());
        
    }, [time, isRunning, IsLoaded]);

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current!);
        };
      }, []);

    return (
        <TimerContext.Provider value={{isRunning, start, pause, exit, time}}>
            {children}
        </TimerContext.Provider>
    )
}