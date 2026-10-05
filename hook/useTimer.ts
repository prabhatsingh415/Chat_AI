import { useEffect, useRef, useState } from "react";

const MAX_SECONDS = 60;

const useTimer = (onComplete?: () => void) => {
  const [seconds, setSeconds] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;

    setSeconds(0);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= MAX_SECONDS - 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          onComplete?.();

          return MAX_SECONDS;
        }

        return prev + 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    seconds,
    start,
    stop,
    reset,
  };
};

export default useTimer;
