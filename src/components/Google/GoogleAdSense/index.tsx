// components/GoogleAdSense.js

import React, { useEffect } from 'react';

export const GoogleAdSense = () => {
  useEffect(() => {
    if (window.adsbygoogle && window.adsbygoogle.push) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="SEU-ID-DE-CLIENTE"
      data-ad-slot="SEU-ID-DE-SLOT"
    />
  );
};

