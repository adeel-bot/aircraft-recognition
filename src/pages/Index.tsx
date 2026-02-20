import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RotateCcw,
  Plane,
  Database,
  Linkedin,
  Github,
  ExternalLink,
  BarChart
} from "lucide-react";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import PredictionDisplay from "@/components/PredictionDisplay";
import AircraftInfoCard from "@/components/AircraftInfoCard";
import Top3Panel from "@/components/Top3Panel";
import HistoryPanel from "@/components/HistoryPanel";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorDisplay from "@/components/ErrorDisplay";
import { PredictionResult } from "@/lib/types";
import { predictAircraft } from "@/lib/api";
import { useHistory } from "@/hooks/useHistory";
import AccuracyPopup from "@/components/AccuracyPopUp";
const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [showAccuracyModal, setShowAccuracyModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { history, addEntry, clearHistory } = useHistory();

  const handleFileSelect = useCallback(
    async (file: File) => {
      setUploadedImage(file);
      setError(null);
      setPrediction(null);

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);

      setIsLoading(true);
      try {
        const result = await predictAircraft(file);
        setPrediction(result);
        // Save to history using the base64 preview
        const thumbReader = new FileReader();
        thumbReader.onload = (ev) => {
          if (ev.target?.result) addEntry(ev.target.result as string, result);
        };
        thumbReader.readAsDataURL(file);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error occurred.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [addEntry],
  );

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setImagePreview(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (uploadedImage) {
      handleFileSelect(uploadedImage);
    }
  }, [uploadedImage, handleFileSelect]);

  return (
    <div className=" flex min-h-screen flex-col bg-background">
      {/* Scanline overlay */}
      <div className="scanline pointer-events-none fixed inset-0 z-50" />

      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto mb-20 max-w-4xl space-y-8">
          {/* Image preview or upload zone */}
          <AnimatePresence mode="wait">
            {!imagePreview ? (
              <UploadZone
                key="upload"
                onFileSelect={handleFileSelect}
                disabled={isLoading}
              />
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mx-auto w-full max-w-2xl"
              >
                <div className="relative overflow-hidden rounded-lg border border-border hud-border">
                  {/* Corner brackets */}
                  <div className="absolute left-2 top-2 z-10 h-5 w-5 border-l-2 border-t-2 border-primary/60" />
                  <div className="absolute right-2 top-2 z-10 h-5 w-5 border-r-2 border-t-2 border-primary/60" />
                  <div className="absolute bottom-2 left-2 z-10 h-5 w-5 border-b-2 border-l-2 border-primary/60" />
                  <div className="absolute bottom-2 right-2 z-10 h-5 w-5 border-b-2 border-r-2 border-primary/60" />

                  <img
                    src={imagePreview}
                    alt="Uploaded aircraft"
                    className="h-auto max-h-80 w-full object-contain bg-muted/20"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading state */}
          <AnimatePresence>{isLoading && <LoadingIndicator />}</AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && <ErrorDisplay message={error} onRetry={handleRetry} />}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {prediction && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <PredictionDisplay result={prediction} />
                <div className="flex mt-2 mb-2">
                  <AircraftInfoCard aircraftName={prediction.aircraft} />
                </div>

                <div className="mx-auto w-full max-w-2xl">
                  <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground">
                    TOP 3 MATCHES
                  </p>
                </div>
                <Top3Panel predictions={prediction.top3} />

                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 font-mono text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    ANALYZE ANOTHER
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History */}
        <HistoryPanel history={history} onClear={clearHistory} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left side: Dataset & Creator */}
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 text-muted-foreground">
              <Plane className="h-4 w-4" />
              <span className="font-mono text-xs">AIRCRAFT RECOGNITION</span>
              <span className="font-mono text-xs">•</span>
              <button
                onClick={() => setShowAccuracyModal(true)}
                className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
              >
                Training Stats
                 <BarChart className="h-3 w-3" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-muted-foreground">
              <a
                href="https://www.kaggle.com/datasets/kadirkrtls/tez-set-v1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Database className="h-3 w-3" />
                Dataset
                <ExternalLink className="h-3 w-3" />
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/kadirkrtls"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Linkedin className="h-3 w-3" />
                Kadir Kurtuluş
              </a>
            </div>
          </div>

          {/* Right side: My GitHub & Project Info */}
          <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
            <a
              href="https://github.com/adeel-bot/aircraft-recognition"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-3 w-3" />
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="font-mono text-xs text-muted-foreground">
              Academic Research Project © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
      {/* Accuracy Popup */}
      <AccuracyPopup
        isOpen={showAccuracyModal}
        onClose={() => setShowAccuracyModal(false)}
      />
    </div>
  );
};

export default Index;
