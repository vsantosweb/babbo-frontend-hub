import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Button,
  Text
} from '@chakra-ui/react';

const CreditCardForm = () => {
  return (
    <Box borderWidth="1px" borderRadius="md" maxW={'530px'} p="6">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Dados do Titular do Cartão
      </Text>

      {/* Campo Celular */}
      <FormControl mb="4">
        <FormLabel>Celular</FormLabel>
        <Input type="tel" placeholder="(00) 00000-0000" />
      </FormControl>

      {/* Campo Email */}
      <FormControl mb="4">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="seuemail@exemplo.com" />
      </FormControl>

      {/* Campo Número de Parcelas */}
      <FormControl mb="4">
        <FormLabel>Número de Parcelas</FormLabel>
        <Select placeholder="Selecione a quantidade de parcelas">
          <option value="1">1x sem juros</option>
          <option value="2">2x sem juros</option>
          <option value="3">3x sem juros</option>
          <option value="4">4x sem juros</option>
          <option value="5">5x sem juros</option>
        </Select>
      </FormControl>

      {/* Campo Número do Cartão */}
      <FormControl mb="4">
        <FormLabel>Número do Cartão</FormLabel>
        <Input type="text" placeholder="0000 0000 0000 0000" />
        <Flex mt="2" justify="space-between">
          <Text fontSize="sm" color="gray.500">Visa, Mastercard, American Express...</Text>
        </Flex>
      </FormControl>

      {/* Campos Data de Vencimento e CVV */}
      <Flex mb="4">
        <FormControl mr="2">
          <FormLabel>Data de Vencimento</FormLabel>
          <Input type="text" placeholder="MM/AA" />
        </FormControl>
        <FormControl ml="2">
          <FormLabel>CVV</FormLabel>
          <Input type="text" placeholder="123" />
        </FormControl>
      </Flex>

      {/* Campo Nome Impresso no Cartão */}
      <FormControl mb="4">
        <FormLabel>Nome Impresso no Cartão</FormLabel>
        <Input type="text" placeholder="Nome conforme impresso no cartão" />
      </FormControl>

      <Text fontSize="2xl" fontWeight="bold" mb="4" mt="8">
        Dados do Pagamento
      </Text>

      {/* Campo CPF/CNPJ */}
      <FormControl mb="4">
        <FormLabel>CPF/CNPJ</FormLabel>
        <Input type="text" placeholder="000.000.000-00 / 00.000.000/0000-00" />
      </FormControl>

      {/* Campo CEP */}
      <FormControl mb="4">
        <FormLabel>CEP</FormLabel>
        <Input type="text" placeholder="00000-000" />
      </FormControl>

      <Button colorScheme="blue" width="full" mt="4">
        Realizar Pagamento
      </Button>
    </Box>
  );
};

export default CreditCardForm;
