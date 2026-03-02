import { useTypewriter } from "@/hooks/use-typewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export const Typewriter = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursor = true,
}: TypewriterProps) => {
  const { displayText, isComplete, isStarted } = useTypewriter({ text, speed, delay });

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && isStarted && (
        <span className="animate-pulse ml-0.5 font-normal text-primary">|</span>
      )}
    </span>
  );
};