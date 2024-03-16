import { Button } from '@chakra-ui/react';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

export type ShareButtonType = {
    title?: string,
    text?: string,
    url?: string
}

export function Sharebutton(params?: ShareButtonType) {

    const handleShareClick = async () => {
        try {
            // Verifica se o navegador suporta a API Web Share
            if (navigator.share) {
                await navigator.share({
                    title: '4th SWAN Annual Meeting - "Rising Above the Noise"',
                    text: 'We are a nation wide network of women who want to increase their impact in society by connecting women leaders across age, professions, ethnicity and economic status.Read more',
                    url: 'https://terrasp.com/wp-content/uploads/2024/01/15MAR-NANDO-REIS-SITE-1.jpg'
                });
                console.log('Conteúdo compartilhado com sucesso');
            } else {
                throw new Error('API Web Share não suportada');
            }
        } catch (error) {
            console.error('Erro ao compartilhar conteúdo:', error);
        }
    };

    return (
        <Button 
        rightIcon={<FaShareAlt/>} 
        onClick={handleShareClick} 
        size={'sm'} 
        variant={'primary'}>Compartilhar</Button>
    )

}

