import { useRef, useState } from "react"
import ResultModal from "./ResultModal";


export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }

    function handleStop() {
        dialog.current.showModal();
        clearInterval(timer.current);

    }
    return <>
        <ResultModal ref={dialog} targetTime={targetTime} result={'lost'} remainingTime={timeRemaining} onReset={handleReset}/>

        <section className="challenge">
            <h2>{title}</h2>
            <p>{targetTime} second{targetTime > 1 ? 's' : ''}</p>
            <p>
                <button onClick={timeIsActive ? handleStop : handleStart}>
                    {timeIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timeIsActive ? 'active' : undefined}>``
                {timeIsActive ? 'Times is running' : 'Timer inactive'}
            </p>
        </section>
    </>

}