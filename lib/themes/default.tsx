
import { Global } from '@emotion/react';
import GlobalStyles, { ViewPort } from './GlobalStyles';

import { ChakraProvider, extendTheme, ThemeConfig, ThemeOverride, ThemeProvider, useColorMode, withDefaultColorScheme, withDefaultProps, withDefaultSize, withDefaultVariant } from "@chakra-ui/react";
import { Button } from './components/button';
import { Input } from './components/input';
import { Checkbox } from './components/checkbox';
import { Textarea } from './components/textarea';
import { Select } from './components/select';
import { Switch } from './components/switch';
import { Radio } from './components/radio';
import { mode } from '@chakra-ui/theme-tools';
import { Modal } from './components/modal';
import { Menu } from './components/menu';

const components = ['Button', 'Input', 'NumberInput', 'PinInput', 'Swith', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Badge'];

const defaultProps = withDefaultProps({
  defaultProps: { variant: 'outlined', size: 'md', },
  components: components,
})

const defaultColorScheme = withDefaultColorScheme({
  colorScheme: 'purple',
  components: components,
})

export const theme: ThemeOverride = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  defaultRadius: '16px',
  defaultContainer: {
    width: '1280px',
    spacing: '.9em',
  },
  
  colors: {
    primary: {
      50: '#FFE6EF',
      100: '#FFB3CC',
      200: '#FF80AA',
      // 200: '#FF80AA',
      300: '#FF4D87',
      400: '#FF1A65',
      500: '#FF0068', // Cor principal
      600: '#ec0565',
      700: '#c70354',
      800: '#bd0457',
      900: '#9d014c',
    },
    black: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#a6a6a6",
      300: "#737373",
      400: "#404040",
      500: "#141414",
      600: "#0f0f0f",
      700: "#0c0c0c",
      800: "#0a0a0a",
      900: "#050505",
    },
  },
  styles: {
    global: (props:any) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'black.600')(props),
      },
    }),
  },
  components: {
    Button: Button,
    Input: Input,
    Textarea: Textarea,
    Checkbox: Checkbox,
    Select: Select,
    Switch: Switch,
    Radio: Radio,
    Menu: Menu,
    Modal: Modal,
  },
});

const themeConfig = extendTheme(
  defaultProps,
  defaultColorScheme,
)
export default theme;
export const Theme = ({ children }: any) => {

  return (
    <ChakraProvider theme={{ ...themeConfig, ...theme }}>
      <Global styles={GlobalStyles} />
      {children}
    </ChakraProvider>
  );
};
