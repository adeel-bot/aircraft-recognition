import { useCallback, useState } from "react";
import { Upload, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const UploadZone = ({ onFileSelect, disabled }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl"
    >
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/10 hud-glow"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg rounded-lg opacity-30" />

        {/* Crosshair corners */}
        <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
        <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
        <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-primary/40" />

        <AnimatePresence mode="wait">
          {isDragging ? (
            <motion.div
              key="dragging"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              <Crosshair className="h-12 w-12 text-primary" />
              <span className="font-display text-sm tracking-wider text-primary">
                DROP TARGET ACQUIRED
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="rounded-full border border-border bg-muted/50 p-4 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                <Upload className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  Drop aircraft image or{" "}
                  <span className="text-primary underline underline-offset-4">browse files</span>
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  JPG, JPEG, PNG • MAX 10MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
      </label>
    </motion.div>
  );
};

export default UploadZone;
