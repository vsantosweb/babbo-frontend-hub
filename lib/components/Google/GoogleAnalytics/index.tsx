import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export const GoogleAnalytics = () => {
    useEffect(() => {
        TagManager.dataLayer({
            dataLayer: {
                event: 'pageview',
            },
        });
    }, []);

    return <></>;
};

