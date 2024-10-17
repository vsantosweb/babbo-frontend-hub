import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const TicketSelector = ({ ticketName, ticketPrice }: { ticketName: string, ticketPrice: number}) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <Box borderWidth="1px" borderRadius="md" p="4" w="100%">
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="bold" fontSize="medium">
            {ticketName}
          </Text>
          <Text color="gray.500" fontSize="sm">
            R$ {ticketPrice.toFixed(2)}
          </Text>
        </Box>
        <Flex gap={3} align="center">
          <Button size="sm" onClick={handleDecrement} isDisabled={quantity === 0}>
            -
          </Button>
          <Text fontWeight="bold">
            {quantity}
          </Text>
          <Button size="sm" onClick={handleIncrement}>
            +
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TicketSelector;
