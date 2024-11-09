export const Textarea = {
  defaultProps: {
    focusBorderColor: "gray.500",
    variant: 'filled',
    borderWidth: "1px"
  },
  baseStyle: {
    borderRadius: "lg", // Bordas arredondadas
    borderWidth: "1px", // Largura padrão da borda
    _focus: {
      borderColor: "primary.500", // Cor da borda ao focar
      borderWidth: "1px", // Largura da borda ao focar
    },
  },
}