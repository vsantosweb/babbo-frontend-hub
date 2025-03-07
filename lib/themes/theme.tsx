import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { extendTheme, ChakraProvider, withDefaultProps } from "@chakra-ui/react";
import GlobalStyles, { ViewPort } from "./GlobalStyles";
import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const theme: any = {
  defaultContainer: {
    width: "1280px",
    spacing: ".9em",
  },

  colors: {
    primary: "#7c00ff",
    secondary: "#ffA214",
    text: "#333",
    background: "#fff",
    error: "#ee2728",
    success: "#10d08e",
    warning: "#ffA214",
    info: "#28abeb",
  },

  fonts: {
    body: "Helvetica Neue, Helvetica, Arial, sans-serif",
    heading: "Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  defaultRadius: "12px",
};

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px) translateX(-10px)',
}

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
    }
  }
});

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
    }
  }
});

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: theme.colors.primary,
    }
  }
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
        backgroundColor: "#002A5C", // Sua cor personalizada
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
        borderRadius: theme.defaultRadius,
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

  export const Theme: React.FC = ({ children }: { children: JSX.Element }) => {
    return (
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={chakraTheme}>
          <Global styles={GlobalStyles} />
          <ViewPort>{children}</ViewPort>
        </ChakraProvider>
      </ThemeProvider>
    );
  };

