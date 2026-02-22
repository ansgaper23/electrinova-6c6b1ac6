import { Clock, CheckCircle2, Users, Award } from "lucide-react";

const stats = [
  { number: "5+", label: "Años de Experiencia", icon: Clock },
  { number: "50+", label: "Proyectos Ejecutados", icon: CheckCircle2 },
  { number: "30+", label: "Clientes Corporativos", icon: Users },
  { number: "15+", label: "Profesionales Certificados", icon: Award },
];

export const StatsSection = () => (
  <section className="py-16 gradient-hero">
    <div className="container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/15 text-accent mb-4">
              <stat.icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">{stat.number}</div>
            <div className="text-sm text-primary-foreground/70">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
