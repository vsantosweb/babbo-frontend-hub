import { Button } from '@chakra-ui/react';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

export type ShareButtonType = {
  title?: string;
  text?: string;
  url?: string;
};

export function Sharebutton({ info }: { info: ShareButtonType }) {
  const handleShareClick = async () => {
    try {
      // Verifica se o navegador suporta a API Web Share
      if (navigator.share) {
        await navigator.share(info);
      } else {
        throw new Error('API Web Share não suportada');
      }
    } catch (error) {
      console.error('Erro ao compartilhar conteúdo:', error);
    }
  };

  return (
    <Button rightIcon={<FaShareAlt />} onClick={handleShareClick}>
      Compartilhar
    </Button>
  );
}
