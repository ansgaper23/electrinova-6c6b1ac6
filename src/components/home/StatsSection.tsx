import { Clock, CheckCircle2, Users, Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { number: 5, suffix: "+", label: "Años de Experiencia", icon: Clock },
  { number: 50, suffix: "+", label: "Proyectos Ejecutados", icon: CheckCircle2 },
  { number: 4.9, suffix: "/5", label: "Calificación Google", icon: Star },
  { number: 30, suffix: "+", label: "Clientes Corporativos", icon: Users },
];


function StatItem({ stat, isActive }: { stat: typeof stats[0]; isActive: boolean }) {
  const count = useCountUp(stat.number, isActive, 1500, stat.number % 1 !== 0 ? 1 : 0);
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/15 text-accent mb-4">
        <stat.icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-primary-foreground/70">{stat.label}</div>
    </div>
  );
}

export const StatsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-16 gradient-hero">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} isActive={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
