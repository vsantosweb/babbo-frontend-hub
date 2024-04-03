'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { theme } from '@/themes/default';
import { Button } from '@chakra-ui/react';

export const CookiePolicy = () => {

    const [acceptedCookies, setAcceptedCookies] = useState<boolean | null>(null);

    useEffect(() => {

        const cookiesAccepted = Cookies.get('cookiesAccepted');
        
        if (cookiesAccepted) {
            setAcceptedCookies(true);
        } else {
            setAcceptedCookies(false);
        }

    }, [])

    const handleAcceptCookies = () => {
        Cookies.set('cookiesAccepted', 'accepted');
        setAcceptedCookies(true);
    };

    if(acceptedCookies === null) return;
    
    return (
        !acceptedCookies && <div style={{zIndex: 3, position: 'fixed', bottom: '0', width: '100%', background: '#000', color: '#fff' }}>
            <div style={{ display: 'flex', maxWidth: theme.defaultContainer.width, margin: 'auto', padding: '1.5em' }}>
                <p style={{ flex: '1' }}>Este site usa cookies para garantir a melhor experiência possível para você.</p>
                <div><Button onClick={handleAcceptCookies}>Entendido</Button></div>
            </div>
        </div>
    );

};

