import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { extendTheme, withDefaultProps, ChakraProvider } from '@chakra-ui/react';
import GlobalStyles, { ViewPort } from './GlobalStyles';

export type ThemeProps = {
  defaultContainer: {
    width: string;
    spacing: string;
  };
  colors: any;
  fonts: any;
  defaultRadius: string;
};

export const theme: ThemeProps = {
  defaultContainer: {
    width: '1280px',
    spacing: '.9em',
  },
  colors: {
    // primary: '#9546fc',
    primary: '#FF0068',
    secondary: '#15FF83',
    text: '#333',
    background: '#fff',
    error: '#ee2728',
    success: '#10d08e',
    warning: '#ffA214',
    info: '#28abeb',
  },

  fonts: {
    body: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    heading: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  },
  defaultRadius: '16px',
};

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px) translateX(-10px)',
};

const variantOutlined = () => ({
  field: {
    _focus: {
      border: 'solid 1px #141414',
      // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      outline: 'none',
      boxShadow: 'none',
    },
    borderWidth: '1px',
    borderRadius: '.5rem',
    backgroundColor: '#f1f1f1',
    pandding: '1rem'
  },
});

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: '#333',
      borderWidth: '1px'
    },
  },
});

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
    },
    borderBottom: 'solid 2px',
  },
});

// Chakra theme extension
const charkaExtendThemeConfig = {
  fonts: {
    sizes: {
      sm: '12px', // Exemplo de tamanho de fonte pequeno
      md: '14px', // Tamanho de fonte médio (padrão)
      lg: '20px', // Exemplo de tamanho de fonte grande
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    // primary: {
    //   50: '#F0E6F6',
    //   100: '#D3BDF0',
    //   200: '#B693E9',
    //   300: '#9969E3',
    //   400: '#7C3FDD',
    //   500: '#6F2CF6', // Sua nova cor principal
    //   600: '#571EAD',
    //   700: '#3E1578',
    //   800: '#260C43',
    //   900: '#130420',
    // },
    primary: {
      50: '#FFE6EF',
      100: '#FFB3CC',
      200: '#FF80AA',
      300: '#FF4D87',
      400: '#FF1A65',
      500: '#FF0068', // Nova cor principal
      600: '#D10056',
      700: '#A30045',
      800: '#750034',
      900: '#470022',
    },

  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 300, // Define o fontWeight padrão como 500
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: '2xl',
          boxShadow: '2xl'
        },
        overlay: {
          bg: "rgba(0, 0, 0, 0.2)", // Fundo semi-transparente
          backdropFilter: "blur(1px)", // Efeito de desfoque com 10px
        },
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: theme.defaultRadius,
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          fontSize: 'xs'
        }
      }
    },
    Swtich: {
      defaultProps: {
        colorScheme: 'primary'
      }
    },
    FormHelperText: {
      baseStyle: {
        fontSize: 12
      },
    },
    Button: {
      defaultProps: {
        size: "sm", // Define o tamanho padrão como 'sm'
      },
      baseStyle: {
        borderRadius: '20px',
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
          _disabled: {
            bg: 'primary.400', // Cor de fundo quando desativado
            color: 'white', // Cor do texto quando desativado
            cursor: 'not-allowed', // Muda o cursor para indicar que o botão está desativado
          }
        },
        outline: {
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
      },
    },
    IconButton: {
      baseStyle: {
        borderRadius: '100%',
      },
      defaultProps: {
        colorScheme: 'gray',
      },
    },
    Box: {
      baseStyle: {
        boxShadow: 'sm',
        bg: 'white',
      },
    },
    Input: {
     
      baseStyle: {
        field: {
          borderRadius: 'lg',
          fontSize: 'sm',
          boxShadow: 'none !important',
          _placeholder: { fontSize: 'sm' },
          _invalid: {
            borderColor: '#000', // Define a cor da borda quando inválido
            borderWidth: '1px', // Define a largura da borda quando inválido

          },
        },
      },
      // sizes: {
      //   lg: {
      //     field: {
      //       borderRadius: theme.defaultRadius,
      //     },
      //   },
      // },
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
      defaultProps: {
        size: 'md',
        variant: 'filled',
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: theme.defaultRadius,
        borderWidth: '1px',
        _focusVisible: {
          borderColor: '#000', // Alterado para a cor roxa do tema
          boxShadow: 'none', // Sombra de foco em roxo claro
          borderWidth: '1px'
        },
        _focus: {
          borderColor: '#000', // Alterado para a cor roxa do tema
          boxShadow: 'none', // Sombra de foco em roxo claro
          borderWidth: '1px'
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'filled'
      },
    },
    Select: {
      baseStyle: {
        field: {
          // borderRadius: theme.defaultRadius,
          boxShadow: 'none !important',
          fontSize: 'sm',
          _placeholder: { fontSize: 'sm' }, // Define o tamanho do placeholder para todas as variantes
        },
      },
      sizes: {
        lg: {
          field: {
            // borderRadius: theme.defaultRadius,
          },
        },
      },
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
      defaultProps: {
        size: 'md',
        variant: 'filled'
      },
    },
    FormLabel: {
      baseStyle: {
        marginBottom: 2,
        fontSize: 14
      },
    },
  },
};

export const chakraTheme = extendTheme(
  withDefaultProps({
    defaultProps: {
      variant: 'outline',
    },

    components: ['Input', 'NumberInput', 'PinInput', 'Select', 'Textarea', 'Modal', 'ModalContent', 'ModalOverlay'],
  }),
  charkaExtendThemeConfig,
);

export const Theme = ({ children }: any) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider theme={{ ...theme, ...chakraTheme }}>
        <Global styles={GlobalStyles} />
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
};
