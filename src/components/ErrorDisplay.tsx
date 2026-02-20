import { motion } from "framer-motion";
import { AlertOctagon, RotateCcw } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-2xl rounded-lg border border-destructive/30 bg-destructive/5 p-6"
    >
      <div className="flex items-start gap-3">
        <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="flex-1">
          <p className="font-mono text-xs tracking-wider text-destructive">SYSTEM ERROR</p>
          <p className="mt-1 text-sm text-foreground">{message}</p>
          <button
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-muted/80"
          >
            <RotateCcw className="h-3 w-3" />
            RETRY
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorDisplay;
