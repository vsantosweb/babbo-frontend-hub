import { StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Modal = {
    baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
            bg: mode('gray.50', 'black.800')(props), // Alteração da cor padrão para `black` no modo escuro
            borderRadius: '2xl',
        },
        overlay: {
            bg: "rgba(0, 0, 0, 0.2)", // Fundo semi-transparente
            backdropFilter: "blur(2px)", // Efeito de desfoque com 10px
        }
    }),
}