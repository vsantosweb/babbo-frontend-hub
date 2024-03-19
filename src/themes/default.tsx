import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import {
  extendTheme,
  withDefaultProps,
  ChakraProvider,
} from '@chakra-ui/react';
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
    primary: '#6f2cf6',
    // primary: '#ea1e63',
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
  defaultRadius: '15px',
};

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px) translateX(-10px)',
};

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
    },
    borderRadius: '20px'
  },
});

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
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
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: theme.colors.primary,
      100: theme.colors.primary,
      500: theme.colors.primary, // you need this
    },
    secondary: {
      50: theme.colors.secondary,
      100: theme.colors.secondary,
      500: theme.colors.secondary, // you need this
    },
  },
  components: {
    // Steps,
    Alert: {
      baseStyle: {
        container: {
          borderRadius: theme.defaultRadius,
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: theme.defaultRadius,
        backgroundColor: theme.colors.primary, // Sua cor personalizada
        color: "white", // Define a cor do texto, se necessário
        _hover: {
          backgroundColor: "blue.800", // Cor ao passar o mouse, ajuste conforme necessário
        },
      },
      defaultProps: {
        size: 'md',
        // colorScheme: 'primary',
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
        borderRadius: '100%',
      },
      sizes: {
        lg: {
          field: {
            borderRadius: theme.defaultRadius,
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
      },
    },
    Select: {
      sizes: {
        lg: {
          field: {
            borderRadius: theme.defaultRadius,
          },
        },
      },
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
      defaultProps: {
        size: 'lg',
      },
    },
    FormLabel: {
      baseStyle: {
        margin: 1,
      },
    },
  },
};

export const chakraTheme = extendTheme(
  withDefaultProps({
    defaultProps: {
      variant: 'outline',
    },
    components: ['Input', 'NumberInput', 'PinInput', 'Select'],
  }),
  charkaExtendThemeConfig
);

export const Theme = ({ children }: any) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
};

