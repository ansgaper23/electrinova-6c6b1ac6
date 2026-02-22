import { Zap } from "lucide-react";
import { clients } from "@/data/partners";

export const AlliancesBar = () => (
  <section className="py-12 bg-secondary/50 border-y border-border/50">
    <div className="container-custom">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-1">
            <Zap className="h-4 w-4" />
            Confían en Nosotros
          </span>
          <p className="text-sm text-muted-foreground">Empresas que respaldan<br className="hidden md:block" /> nuestra trayectoria</p>
        </div>
        <div className="flex-1 flex items-center justify-center md:justify-end gap-8 flex-wrap">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-background rounded-lg px-6 py-4 border border-border/30 flex items-center justify-center h-16 hover:shadow-sm transition-shadow"
            >
              <img
                src={client.logo}
                alt={`Logo de ${client.name}`}
                width={100}
                height={40}
                loading="lazy"
                decoding="async"
                className="max-w-[100px] max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
