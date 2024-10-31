import React, { useState } from 'react';
import { Box, Stack, Radio, RadioGroup, useRadio, useRadioGroup, HStack, Text, Collapse } from '@chakra-ui/react';
import CreditCardForm from '../Payment/CreditCard';
import { theme } from '@/themes/default';

// Componente individual RadioCard
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          borderColor: theme.colors.primary,
        }}
        px={5}
        py={3}
      >
        <HStack mb={props.isChecked && '4'}>
          <Radio
            isChecked={props.isChecked}
            pointerEvents="none"
            _checked={{
              background: theme.colors.primary,
            }}
          />
          <Text>{props.children}</Text>
        </HStack>
        <Collapse in={props.isExpanded || props.default}>
          <CreditCardForm />
        </Collapse>
      </Box>

    </Box>
  );
}

// Componente para seleção de meios de pagamento
const PaymentMethods = () => {
  const options = ['Cartão de crédito', 'Boleto', 'PIX', 'Boleto/PIX'];
  const [selectedValue, setSelectedValue] = useState('Cartão de crédito');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'paymentMethod',
    onChange: setSelectedValue,
  });

  const group = getRootProps();

  return (
    <RadioGroup {...group}>
      <Stack direction="column" spacing={4}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard
              key={value}
              {...radio}
              isChecked={selectedValue === value}
              isExpanded={selectedValue === value}
            >
              {value}
            </RadioCard>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default PaymentMethods;
