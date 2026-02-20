import { motion } from "framer-motion";
import { Info, Plane, Calendar, Factory, Brain } from "lucide-react";
import { getAircraftInfo } from "@/lib/aircraftData";

interface AircraftInfoCardProps {
  aircraftName: string;
}

const AircraftInfoCard = ({ aircraftName }: AircraftInfoCardProps) => {
  //  console.log('AircraftInfoCard received:', aircraftName);
  const info = getAircraftInfo(aircraftName);
  // console.log('getAircraftInfo returned:', info);
  if (!info) return null;
 
  const details = [
    { icon: <Plane className="h-4 w-4 text-accent" />, label: "Role", value: info.role },
    { icon: <Calendar className="h-4 w-4 text-accent" />, label: "First Flight", value: info.firstFlight },
    { icon: <Factory className="h-4 w-4 text-accent" />, label: "Manufacturer", value: info.manufacturer },
    { icon: <Brain className="h-4 w-4 text-warning" />, label: "Fun Fact", value: info.funFact },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mx-auto w-full max-w-2xl rounded-lg border border-border bg-card p-5 hud-border"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Info className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          AIRCRAFT DOSSIER
        </span>
      </div>

      {/* Name with flag */}
      <h3 className="mb-4 font-display text-xl font-bold tracking-wider text-foreground hud-text-glow sm:text-2xl">
        {info.flag} {info.name}
      </h3>

      {/* Info grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {details.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            className={`rounded-md border border-border/50 bg-muted/30 p-3 ${
              item.label === "Fun Fact" ? "sm:col-span-2" : ""
            }`}
          >
            <div className="mb-1 flex items-center gap-2">
              {item.icon}
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {item.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AircraftInfoCard;
