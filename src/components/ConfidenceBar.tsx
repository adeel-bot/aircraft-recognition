import { motion } from "framer-motion";
import { getConfidenceLevel } from "@/lib/types";

interface ConfidenceBarProps {
  confidence: number;
  animate?: boolean;
}

const ConfidenceBar = ({ confidence, animate = true }: ConfidenceBarProps) => {
  const level = getConfidenceLevel(confidence);

  const colorMap = {
    high: "bg-success",
    medium: "bg-warning",
    low: "bg-destructive",
  };

  const glowMap = {
    high: "shadow-[0_0_12px_hsl(var(--success)/0.4)]",
    medium: "shadow-[0_0_12px_hsl(var(--warning)/0.4)]",
    low: "shadow-[0_0_12px_hsl(var(--destructive)/0.4)]",
  };

  return (
    <div className="w-full">
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={`h-full rounded-full ${colorMap[level]} ${glowMap[level]}`}
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ConfidenceBar;
