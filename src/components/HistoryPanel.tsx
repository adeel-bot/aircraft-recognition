import { motion } from "framer-motion";
import { Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { HistoryEntry, getConfidenceLevel } from "@/lib/types";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onClear: () => void;
}

const HistoryPanel = ({ history, onClear }: HistoryPanelProps) => {
  if (history.length === 0) return null;

  const textColor = {
    high: "text-success",
    medium: "text-warning",
    low: "text-destructive",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-4xl px-4 sm:px-0 mt-7"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs tracking-widest text-muted-foreground sm:text-sm">
          RECENT IDENTIFICATIONS
        </p>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 rounded border border-destructive/30 bg-destructive/10 px-2 py-1 font-mono text-xs text-destructive transition-colors hover:bg-destructive/20 sm:px-3 sm:text-sm"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          CLEAR
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {history.map((entry, i) => {
          const level = getConfidenceLevel(entry.prediction.confidence);
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-lg border border-border bg-card hud-border"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
                <img
                  src={entry.imageDataUrl}
                  alt={entry.prediction.aircraft}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
                <div className="absolute left-1 top-1 h-3 w-3 border-l border-t border-primary/50" />
                <div className="absolute right-1 top-1 h-3 w-3 border-r border-t border-primary/50" />
              </div>

              <div className="space-y-1.5 p-2 sm:p-3">
                <p className="truncate font-display text-xs font-semibold tracking-wide text-foreground sm:text-sm">
                  {entry.prediction.aircraft.replace(/_/g, " ").toUpperCase()}
                </p>

                <span className={`block font-mono text-sm font-bold ${textColor[level]} sm:text-base`}>
                  {entry.prediction.confidence.toFixed(1)}%
                </span>

                <div className="space-y-0.5">
                  {entry.prediction.top3.map((p, j) => (
                    <div key={j} className="flex items-center justify-between font-mono text-[10px] text-muted-foreground sm:text-xs">
                      <span className="truncate">
                        #{j + 1} {p.aircraft.replace(/_/g, " ")}
                      </span>
                      <span className="ml-2 whitespace-nowrap">{p.confidence.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1 pt-1 text-muted-foreground">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="font-mono text-[10px] sm:text-xs">
                    {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default HistoryPanel;