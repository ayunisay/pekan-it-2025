import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import pomodoroBg from "../../assets/images/pomodor.png";

interface TimerState {
  //model
  minutes: number;
  seconds: number;
  isActive: boolean;
  isBreak: boolean;
  cycle: number;
}

const PomodoroTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isActive: false,
    isBreak: false,
    cycle: 1,
  });

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const createBeepSound = () => {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.01,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    audioRef.current = { play: createBeepSound } as any;
  }, []);

  useEffect(() => {
    if (timer.isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer.seconds > 0) {
            return { ...prevTimer, seconds: prevTimer.seconds - 1 };
          } else if (prevTimer.minutes > 0) {
            return {
              ...prevTimer,
              minutes: prevTimer.minutes - 1,
              seconds: 59,
            };
          } else {
            if (audioRef.current) {
              audioRef.current.play();
            }

            const newIsBreak = !prevTimer.isBreak;
            const newCycle = newIsBreak ? prevTimer.cycle : prevTimer.cycle + 1;
            const newMinutes = newIsBreak
              ? newCycle % 4 === 0
                ? 15
                : 5 // sampe 4 cycle
              : 25;

            return {
              minutes: newMinutes,
              seconds: 0,
              isActive: false,
              isBreak: newIsBreak,
              cycle: newCycle,
            };
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isActive]);

  const toggleTimer = () => {
    setTimer((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const formatTime = (minutes: number, seconds: number): string => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = timer.isBreak
    ? (((timer.cycle % 4 === 0 ? 15 : 5) * 60 -
        (timer.minutes * 60 + timer.seconds)) /
        ((timer.cycle % 4 === 0 ? 15 : 5) * 60)) *
      100
    : ((25 * 60 - (timer.minutes * 60 + timer.seconds)) / (25 * 60)) * 100;

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center p-4 ">
      <div className="flex flex-col items-center mr-0 md:mr-16 mb-10 md:mb-0">
        <div className="text-center mb-8">
          <span className="font-medium">
            {timer.isBreak
              ? timer.isActive
                ? "Break?"
                : "Its Break Time"
              : timer.isActive
                ? "Time For Focus!"
                : "Let's Start?"}
          </span>
        </div>
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto relative">
            <div
              className={`absolute inset-2 rounded-full bg-cover bg-center ${!timer.isBreak ? "bg-[#F3D67D]" : "bg-[#A9C9FF]"}`}
              style={{ backgroundImage: `url(${pomodoroBg})` }}
            ></div>

            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="5"
                fill="rgba(0, 0, 0, 0.2)"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={!timer.isBreak ? "text-[#F3D67D]" : "text-[#A9C9FF]"}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-mono font-bold text-white">
                  {formatTime(timer.minutes, timer.seconds)}
                </div>
                <div className="text-sm text-gray-200 mt-2">
                  Cycle {timer.cycle}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-15 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
              !timer.isBreak
                ? "bg-secondary hover:bg-[#C19D33] text-white shadow-lg"
                : "bg-primary hover:bg-[#2A4269] text-white shadow-lg"
            }`}
          >
            {timer.isActive ? <Pause size={20} /> : <Play size={20} />}
            {timer.isActive ? "Pause" : "Start"}
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-lg font-semibold text-white mb-2">
          Time for today
        </div>

        <div className="bg-[rgba(217,217,217,0.2)] rounded-xl shadow-md w-[24rem] h-[4.5rem] flex items-center overflow-hidden">
          <div className="w-2 h-full bg-[#F3C969] rounded-l-xl" />
          <div className="flex justify-between items-cente w-full px-4 py-3">
            <span className="text-base text-white font-medium">Pomodoro</span>
            <span className="text-2xl font-bold text-white">30:00</span>
          </div>
        </div>

        <div className="bg-[rgba(217,217,217,0.2)] rounded-xl shadow-md w-[24rem] h-[4.5rem] flex items-center overflow-hidden">
          <div className="w-2 h-full bg-[#5873A1] rounded-l-xl" />
          <div className="flex justify-between items-center w-full px-4 py-3">
            <span className="text-base text-white font-medium">
              Short Break
            </span>
            <span className="text-2xl font-bold text-white">05:00</span>
          </div>
        </div>

        <div className="bg-[rgba(217,217,217,0.2)] rounded-xl shadow-md w-[24rem] h-[4.5rem] flex items-center overflow-hidden">
          <div className="w-2 h-full bg-[#1D2C4D] rounded-l-xl" />
          <div className="flex justify-between items-center w-full px-4 py-3">
            <span className="text-base text-white font-medium">Long Break</span>
            <span className="text-2xl font-bold text-white">15:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
