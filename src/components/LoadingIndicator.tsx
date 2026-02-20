import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 py-8">
      {/* Radar sweep */}
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        <div className="absolute inset-3 rounded-full border border-primary/30" />
        <div className="absolute inset-6 rounded-full border border-primary/40" />
        <div className="absolute inset-0 h-full w-full animate-radar-sweep">
          <div
            className="h-1/2 w-1/2 origin-bottom-right"
            style={{
              background:
                "conic-gradient(from 0deg at 100% 100%, transparent 0deg, hsl(var(--primary) / 0.4) 60deg, transparent 60deg)",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary animate-blink" />
        </div>
      </div>

      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-sm tracking-widest text-primary"
        >
          ANALYZING TARGET
        </motion.p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          Processing image through AI Model...
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
