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
      // borderColor: theme.colors.primary,
      // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      boxShadow: 'none',
    },
    borderRadius: '20px',
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
// Chakra theme extension
const charkaExtendThemeConfig = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: '#F0E6F6',
      100: '#D3BDF0',
      200: '#B693E9',
      300: '#9969E3',
      400: '#7C3FDD',
      500: '#6F2CF6', // Sua nova cor principal
      600: '#571EAD',
      700: '#3E1578',
      800: '#260C43',
      900: '#130420',
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
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
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
        borderRadius: theme.defaultRadius,
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
        size: 'md',
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
