import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import { PredictionResult as PredictionResultType, getConfidenceLevel } from "@/lib/types";
import ConfidenceBar from "./ConfidenceBar";

interface PredictionResultProps {
  result: PredictionResultType;
}

const PredictionDisplay = ({ result }: PredictionResultProps) => {
  const level = getConfidenceLevel(result.confidence);

  const iconMap = {
    high: <CheckCircle2 className="h-6 w-6 text-success" />,
    medium: <AlertTriangle className="h-6 w-6 text-warning" />,
    low: <AlertOctagon className="h-6 w-6 text-destructive" />,
  };

  const labelMap = {
    high: "HIGH CONFIDENCE",
    medium: "MODERATE CONFIDENCE",
    low: "LOW CONFIDENCE",
  };

  const textColorMap = {
    high: "text-success",
    medium: "text-warning",
    low: "text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl rounded-lg border border-border bg-card p-6 hud-border"
    >
      <div className="mb-1 flex items-center gap-2">
        {iconMap[level]}
        <span className={`font-mono text-xs tracking-widest ${textColorMap[level]}`}>
          {labelMap[level]}
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 font-display text-3xl font-bold tracking-wider text-foreground hud-text-glow sm:text-4xl"
      >
        {result.aircraft.replace(/_/g, " ").toUpperCase()}
      </motion.h2>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ConfidenceBar confidence={result.confidence} />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`font-mono text-xl font-bold ${textColorMap[level]}`}
        >
          {result.confidence.toFixed(1)}%
        </motion.span>
      </div>
    </motion.div>
  );
};

export default PredictionDisplay;
