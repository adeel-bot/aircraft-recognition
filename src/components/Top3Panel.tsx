import { motion } from "framer-motion";
import { PredictionItem, getConfidenceLevel } from "@/lib/types";
import ConfidenceBar from "./ConfidenceBar";

interface Top3PanelProps {
  predictions: PredictionItem[];
}

const Top3Panel = ({ predictions }: Top3PanelProps) => {
  const rankStyles = [
    "border-primary/40 bg-primary/5",
    "border-border bg-card",
    "border-border bg-card",
  ];

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {predictions.map((pred, i) => {
        const level = getConfidenceLevel(pred.confidence);
        const textColorMap = {
          high: "text-success",
          medium: "text-warning",
          low: "text-destructive",
        };

        return (
          <motion.div
            key={pred.aircraft}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
            className={`rounded-lg border p-4 ${rankStyles[i]}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">#{i + 1}</span>
              <span className={`font-mono text-sm font-bold ${textColorMap[level]}`}>
                {pred.confidence.toFixed(1)}%
              </span>
            </div>
            <p className="mb-3 truncate font-display text-sm font-semibold tracking-wide text-foreground">
              {pred.aircraft.replace(/_/g, " ").toUpperCase()}
            </p>
            <ConfidenceBar confidence={pred.confidence} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Top3Panel;
