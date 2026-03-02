import { useState, useEffect } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypewriter = ({ text, speed = 50, delay = 0 }: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    setIsStarted(false);

    let intervalId: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      setIsStarted(true);
      let i = 0;
      intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete, isStarted };
};