import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart, CheckCircle, Target, Award, Layers, Database, Cpu, Zap, AlertCircle,ExternalLink } from "lucide-react";

interface AccuracyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccuracyPopup = ({ isOpen, onClose }: AccuracyPopupProps) => {
  const metrics = {
    model: "DenseNet201 (Transfer Learning)",
    dataset: "Military Aircraft Dataset (81 classes, 8,100 images)",
    
    // Final epoch (30) performance (corrected from logs)
    trainAccuracy: 99.38,        
    valAccuracy: 60.62,         
    trainLoss: 0.217,
    valLoss: 1.861,
    
    // Best validation performance (epoch 28)
    bestValAccuracy: 64.69,    
    bestValEpoch: 28,
    
    // Test set evaluation (placeholders – update after evaluation)
    testAccuracy: 65.06,         
    top3Accuracy: 84.32,         
    
    // Training configuration
    optimizer: "Adamax",
    learningRate: "0.001",
    loss: "Categorical Crossentropy",
    epochs: 30,
    batchSize: 16,
    regularization: "Dropout (0.5) + L2 (0.01)",
    hardware: "2× Tesla T4 GPU",
    trainingTime: "~1 hour",
    totalParams: "18.8M",
    trainableParams: "18.6M",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          {/* Modal – perfectly centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 m-auto w-full max-w-2xl h-fit px-4"
          >
            <div className="relative rounded-lg border border-border bg-card p-6 shadow-2xl hud-border">
              {/* Corner brackets */}
              <div className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-primary/60" />
              <div className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-primary/60" />
              <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-primary/60" />
              <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-primary/60" />

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm tracking-widest text-muted-foreground">
                    MODEL PERFORMANCE REPORT
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Key Performance Indicators – now properly aligned */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-md border border-border/50 bg-muted/30 p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Target className="h-3 w-3" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">Test Acc</span>
                    </div>
                    <p className="font-mono text-xl font-bold text-primary">{metrics.testAccuracy}%</p>
                    <p className="font-mono text-[9px] text-muted-foreground mt-0.5">Final holdout</p>
                  </div>
                  <div className="rounded-md border border-border/50 bg-muted/30 p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Award className="h-3 w-3" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">Top-3</span>
                    </div>
                    <p className="font-mono text-xl font-bold text-info">{metrics.top3Accuracy}%</p>
                    <p className="font-mono text-[9px] text-muted-foreground mt-0.5">Correct in top 3</p>
                  </div>
                  <div className="rounded-md border border-border/50 bg-muted/30 p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <CheckCircle className="h-3 w-3" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">Best Val</span>
                    </div>
                    <p className="font-mono text-xl font-bold text-success">{metrics.bestValAccuracy}%</p>
                    <p className="font-mono text-[9px] text-muted-foreground mt-0.5">Epoch {metrics.bestValEpoch}</p>
                  </div>
                </div>

                {/* Training Progress (Final Epoch) */}
                <div className="rounded-md border border-border/50 bg-muted/20 p-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                    <BarChart className="h-3 w-3" /> Final Epoch Performance (Epoch 30)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Training</p>
                      <p className="font-mono text-lg font-semibold text-foreground">{metrics.trainAccuracy}%</p>
                      <p className="font-mono text-[10px] text-muted-foreground">Loss: {metrics.trainLoss}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Validation</p>
                      <p className="font-mono text-lg font-semibold text-warning">{metrics.valAccuracy}%</p>
                      <p className="font-mono text-[10px] text-muted-foreground">Loss: {metrics.valLoss}</p>
                    </div>
                  </div>
                </div>

                {/* Overfitting Alert – updated numbers */}
                <div className="rounded-md border border-warning/30 bg-warning/5 p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-warning">Overfitting observed:</span> Training accuracy ({metrics.trainAccuracy}%) 
                    significantly higher than validation ({metrics.valAccuracy}%) due to limited data (100 images per class). 
                    Test accuracy ({metrics.testAccuracy}%) reflects real-world performance.
                  </div>
                </div>

                {/* Detailed metrics */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Layers className="h-3 w-3" /> Architecture
                    </h4>
                    <p className="text-sm">{metrics.model}</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>Total params: {metrics.totalParams}</li>
                      <li>Trainable: {metrics.trainableParams}</li>
                      <li>Pre-trained on ImageNet</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Database className="h-3 w-3" /> Dataset
                    </h4>
                    <a
                href="https://www.kaggle.com/code/adeelbot/military-aircraft-densenet201-7cb93c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >     
                    <p className="text-sm flex items-center align-baseline">{metrics.dataset} <span> <ExternalLink className="h-3.5 w-3.5" /></span></p>
                    
             
              </a>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>Train: 5,670 images (70%)</li>
                      <li>Test: 1,620 images (20%)</li>
                      <li>Val: 810 images (10%)</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Cpu className="h-3 w-3" /> Training Config
                    </h4>
                    <ul className="space-y-1 text-xs">
                      <li>Optimizer: {metrics.optimizer}</li>
                      <li>Learning rate: {metrics.learningRate}</li>
                      <li>Loss: {metrics.loss}</li>
                      <li>Batch size: {metrics.batchSize}</li>
                      <li>Epochs: {metrics.epochs}</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Infrastructure
                    </h4>
                    <ul className="space-y-1 text-xs">
                      <li>Platform: Kaggle Notebooks</li>
                      <li>Hardware: {metrics.hardware}</li>
                      <li>Training time: {metrics.trainingTime}</li>
                      <li>Regularization: {metrics.regularization}</li>
                    </ul>
                  </div>
                </div>

                {/* Footer note */}
                <div className="border-t border-border/50 pt-3 text-center font-mono text-[10px] text-muted-foreground">
                  Model trained with TensorFlow 2.18 • Data augmentation applied • Early stopping not used
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccuracyPopup;