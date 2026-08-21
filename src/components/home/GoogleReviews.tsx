import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  source: "Google" | "Clutch" | "Manual";
}

const reviews: Review[] = [
  {
    author: "Ing. Roberto Sánchez",
    rating: 5,
    text: "Excelente servicio en el mantenimiento de nuestros transformadores industriales. Puntualidad y conocimiento técnico de primer nivel.",
    date: "Hace 2 meses",
    source: "Google"
  },
  {
    author: "Consorcio Textil Lima",
    rating: 5,
    text: "Electrinova realizó el levantamiento de observaciones ITSE en tiempo récord. Su asesoría fue clave para pasar la inspección de INDECI.",
    date: "Hace 1 mes",
    source: "Google"
  },
  {
    author: "María Fernández",
    rating: 5,
    text: "Instalación de pozo a tierra certificada y profesional. Muy recomendados para proyectos residenciales complejos.",
    date: "Hace 3 semanas",
    source: "Google"
  }
];

export const GoogleReviews = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Lo que dicen nuestros clientes en Google
          </h2>
          <p className="text-slate-600 max-w-2xl">
            Nuestra reputación se basa en la excelencia técnica y el compromiso con cada proyecto industrial, comercial y residencial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6 px-6 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-slate-100 -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-6">"{review.text}"</p>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="font-bold text-navy-900 text-sm">{review.author}</p>
                      <p className="text-slate-400 text-xs">{review.date}</p>
                    </div>
                    <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500">
                      {review.source}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://g.page/r/electrinovaperu/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-navy-600 font-bold hover:underline"
          >
            Ver todas las reseñas en Google Business
          </a>
        </div>
      </div>
    </section>
  );
};
