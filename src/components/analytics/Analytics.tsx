import React, { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  gtmId?: string;
  gaId?: string;
  adsId?: string;
  linkedinId?: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ 
  gtmId = "GTM-MOCK123", // Reemplazar con IDs reales del cliente
  gaId = "G-MOCK123",
  adsId = "AW-MOCK123",
  linkedinId = "MOCK123"
}) => {
  useEffect(() => {
    // Inicializar DataLayer
    window.dataLayer = window.dataLayer || [];
    
    // GTM Script
    if (gtmId) {
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);
    }

    // LinkedIn Insight Tag
    if (linkedinId) {
      const liScript = document.createElement('script');
      liScript.innerHTML = `
        _linkedin_partner_id = "${linkedinId}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);
      `;
      document.head.appendChild(liScript);
    }
  }, [gtmId, linkedinId]);

  return null;
};

// Utility to push events to dataLayer
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString(),
    });
    
    // Log for debugging (only in development if needed)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Event tracked: ${eventName}`, params);
    }
  }
};

