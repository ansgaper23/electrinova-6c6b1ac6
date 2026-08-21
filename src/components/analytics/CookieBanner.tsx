import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Pequeño delay para no interrumpir la primera impresión visual
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    
    // Disparar evento de GTM para actualizar el consentimiento
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        timestamp: new Date().toISOString()
      });
    }
  };


  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[100]"
        >
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 leading-tight">
                  Control de Privacidad y Cookies
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Utilizamos cookies para medir el origen de nuestros contactos y mejorar tu experiencia. Respetamos tu privacidad según las normativas vigentes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button 
                    onClick={handleAccept}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold"
                  >
                    Aceptar todo
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleDecline}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Solo esenciales
                  </Button>
                </div>
              </div>

              <button 
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
