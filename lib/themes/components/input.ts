import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Input = {
  // Propriedades padrão do Input
  defaultProps: {
    focusBorderColor: 'gray.500', // Cor da borda ao focar
    variant: 'outline', // Variante padrão
  },
  
  // Estilos base
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      bg: mode('white', 'black.600')(props), // Fundo adaptável ao tema
      borderRadius: 'lg', // Bordas arredondadas
      borderWidth: '1px', // Largura padrão da borda
      
      _focus: {
        borderColor: 'primary.500', // Cor da borda ao focar
        borderWidth: '1px', // Largura da borda ao focar
      },
    },
  }),
};
