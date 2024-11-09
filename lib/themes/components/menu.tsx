import { StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Menu = {
    baseStyle: (props: StyleFunctionProps) => ({
        list: {
            bg: mode('gray.50', 'black.800')(props), // Cor de fundo do menu no modo claro
            borderRadius: "lg", // Bordas arredondadas
            
        },
        item: {
            color:  mode('gray.900', 'white')(props),

            bg: mode('gray.50', 'black.500')(props), // Cor de fundo padrão dos itens
            _hover: {
                bg: mode('gray.100', 'blackAlpha.600')(props), // Cor de fundo ao passar o mouse
                color: mode('gray.900', 'white')(props), // Cor do texto ao passar o mouse
            },
            // _focus: {
            //     bg: "primary.500",
            //     color: "white",
            // },
            // _active: {
            //     bg: "primary.600", // Cor de fundo ao clicar
            // },
        },
    }),
    // defaultProps: {
    //     colorScheme: "primary",
    // },
}
