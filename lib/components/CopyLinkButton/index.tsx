import React from 'react';
import { IconButton, useClipboard, useToast } from "@chakra-ui/react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { FaRegCopy } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';

export const CopyLinkButton = ({ link }: { link: string }) => {
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

    return (
        <IconButton
            icon={!hasCopied ? <FaRegCopy /> : <CheckIcon />}
            aria-label="Copiar Link"
            title={'Copiar para a área de transferência'}
            onClick={handleCopy}
            isDisabled={!link}
        />
    );
};

