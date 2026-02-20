import { Crosshair } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center gap-4 px-4 py-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border">
          <img src="/air-craft.png" alt="aircraft-logo" className="-skew-y-12" />
          <div className="absolute inset-0 rounded-full hud-glow opacity-50" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-wider text-foreground sm:text-xl">
            AIRCRAFT RECOGNITION
          </h1>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
            AI-POWERED IDENTIFICATION SYSTEM
          </p>
        </div>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-primary animate-blink" />
          <span className="font-mono text-xs text-primary">SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
