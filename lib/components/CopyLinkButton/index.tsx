import React from 'react';
import { Button, IconButton, useClipboard, useToast } from "@chakra-ui/react";
import { FaRegCopy } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';

export const CopyLinkButton = ({ link, mode }: { link: string, mode: 'icon-button' | 'button' }) => {
    const { hasCopied, onCopy } = useClipboard(link);
    const toast = useToast();

    const handleCopy = () => {
        onCopy();
        toast({
            title: "Link Copiado!",
            description: "O link foi copiado para a área de transferência.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    switch (mode) {
        case 'icon-button':
            return (
                <IconButton
                    icon={!hasCopied ? <FaRegCopy /> : <CheckIcon />}
                    aria-label="Copiar Link"
                    title={'Copiar para a área de transferência'}
                    onClick={handleCopy}
                    isDisabled={!link} />
            )

            break;
        case 'button':
            return (
                <Button
                    onClick={handleCopy}
                    isDisabled={!link}
                    title={'Copiar para a área de transferência'}
                    rightIcon={!hasCopied ? <FaRegCopy /> : <CheckIcon />}>
                    Copiar link
                </Button>
            )
        default:
            return <></>
    }

};

