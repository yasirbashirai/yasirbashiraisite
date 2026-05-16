import { Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";

const versions = [
  { path: "/logistics-solutions", label: "V0", name: "Bold Funnel" },
  { path: "/logistics-solutions/value", label: "V1", name: "Value · Authority" },
  { path: "/logistics-solutions/industry", label: "V2", name: "Industry · Compare" },
  { path: "/logistics-solutions/sales", label: "V3", name: "Sales · Copywriter" },
];

const LogisticsVersionSwitcher = () => {
  const location = useLocation();
  return (
    <div className="fixed top-20 right-4 z-[60] hidden md:block">
      <div className="bg-background/95 backdrop-blur-xl border border-primary/30 rounded-md shadow-2xl shadow-primary/20 p-2">
        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold px-2 py-1 mb-1 border-b border-primary/15">
          Test Versions
        </p>
        <div className="flex flex-col gap-0.5">
          {versions.map((v) => {
            const isActive = location.pathname === v.path;
            return (
              <Link
                key={v.path}
                to={v.path}
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                <span className={`font-mono font-bold ${isActive ? "" : "text-primary"}`}>{v.label}</span>
                <span className="font-medium">{v.name}</span>
                {isActive && <Check className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LogisticsVersionSwitcher;
