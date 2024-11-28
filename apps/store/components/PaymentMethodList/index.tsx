import React, { ReactNode, useState } from 'react';
import { Box, Stack, Radio, RadioGroup, useRadio, useRadioGroup, HStack, Text, Collapse, Flex, Card } from '@chakra-ui/react';
import CreditCardForm from '../Payment/CreditCard';
import { theme } from '@/themes/default';
import { CiCreditCard1 } from "react-icons/ci";
import { useFormContext } from 'react-hook-form';


type RadioCardProps<T> = {
  isChecked: boolean
  value: T,
  children: ReactNode,
  default?: string,
  isExpanded: boolean
}

type PaymentMethodProps = {
  name: string;
  key: string;
  Component: () => React.JSX.Element
}
// Componente individual RadioCard
function RadioCard({ value, children }: RadioCardProps<PaymentMethodProps>) {

  const { register, getValues } = useFormContext();
  const checked = value.key === getValues('payment_method');
  const Component = value.Component;

  return (
    <Box
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      p={5}
      as='label'
    >
      <HStack mb={checked ? '6' : '1'}>
        <Radio
          isChecked={checked}
          // pointerEvents="none"
          value={value.key}
          {...register('payment_method')}
        />
        {children}
      </HStack>
      <Collapse in={value.key === getValues('payment_method')}>
        <Component />
      </Collapse>
    </Box>

  );
}


// Componente para seleção de meios de pagamento
const PaymentMethods = () => {

  const paymentMethods = [
    { name: 'Cartão de Crédito', key: 'credit_card', Component: CreditCardForm }
  ]

  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <Card>
      <Stack direction="column" spacing={4}>
        {paymentMethods.map((paymentMethod, index) => {
          return (
            <RadioCard
              key={index}
              value={paymentMethod}
              isChecked={selectedValue === paymentMethod.key}
              isExpanded={selectedValue === paymentMethod.key}
            >
              <HStack>
                <CiCreditCard1 fontSize={'24px'} /> <Text>{paymentMethod.name}</Text>
              </HStack>
            </RadioCard>
          );
        })}
      </Stack>
    </Card>
  );
};

export default PaymentMethods;
