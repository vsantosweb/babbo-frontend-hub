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
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  return (
    <ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-8530046753205274"
     data-ad-slot="6943411120"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
  );
};
