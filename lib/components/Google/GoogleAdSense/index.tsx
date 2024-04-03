import React, { useEffect } from 'react';

// Declaração de tipo global para adicionar a propriedade 'adsbygoogle' ao objeto window
declare global {
  interface Window {
    adsbygoogle?: {
      push?: (param: any) => void;
    };
  }
}

export const GoogleAdSense: React.FC<{ adClient: string; adSlot: string }> = ({
  adClient,
  adSlot,
}) => {
  useEffect(() => {
    if (window.adsbygoogle && window.adsbygoogle.push) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8530046753205274"
      data-ad-slot="6943411120"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );

};
