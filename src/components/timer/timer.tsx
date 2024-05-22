"use client"

import { Button } from "@nextui-org/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useTimer } from "./timerProvider";

export default function Timer() {
    const {time, isRunning, start, pause, exit} = useTimer()

    const minutes = time ? Math.floor(time/60): 0
    const seconds = time? time%60 : 0

    return (
        <div className="w-[600px] h-[200px] flex justify-center items-center shadow-md m-4 rounded-lg flex-col gap-2">
            <p><span className="text-2xl">{minutes.toString().padStart(2, "0")}</span>:<span className="text-2xl">{seconds.toString().padStart(2, "0")}</span></p>
            <div className="flex justify-center items-center gap-2">
                <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    color="danger"
                    onPress={exit}>
                    <ImCancelCircle />
                </Button>
                <Button
                    isIconOnly
                    size="lg"
                    radius="full"
                    color="success"
                    className="text-white"
                    isDisabled={isRunning}
                    onPress={start}>
                    <FaPlay />
                </Button>
                <Button
                    isIconOnly
                    size="sm"
                    className="text-white"
                    radius="full"
                    isDisabled={!isRunning}
                    color="warning"
                    onPress={pause}>
                    <FaPause />
                </Button>
            </div>
        </div>
    );
}