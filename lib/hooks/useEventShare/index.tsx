import { PublicRepositoryInterface } from '@/interfaces';
import container from '@/container';

export type ShareButtonType = {
    id?: string | number;
    title?: string;
    text?: string;
    url?: string;
};

interface UseEventInterface {
    handleShareClick: (info: ShareButtonType) => void
}

const eventService = container.get<PublicRepositoryInterface>('public');

export function useEventShare(): UseEventInterface {

    const handleShareClick = async (info: ShareButtonType) => {
        try {
            // Verifica se o navegador suporta a API Web Share
            if (navigator.share) {
                await navigator.share(info);
                await eventService.eventInteraction('share', info.id as string);
                console.log('Conteúdo compartilhado com sucesso');
            } else {
                throw new Error('API Web Share não suportada');
            }
        } catch (error) {
            console.error('Erro ao compartilhar conteúdo:', error);
        }
    };

    return { handleShareClick }


}
