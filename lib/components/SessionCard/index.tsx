import {
  Box, Heading, Text, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import * as Styled from './styles';
import moment from "moment";
import { useEffect } from "react";

export const tickets = [
  {
    id: '1',
    price: 39.99,
    currency: 'BRL',
    name: '1° Lote - Válido para 2 pessoas - Esgotado',
    description: 'Tan, 40mm',
    quantity: 3,
    imageUrl: 'https://placehold.co/400x600'
  },
  {
    id: '2',
    price: 39.99,
    currency: 'BRL',
    name: 'Feminino',
    description: 'Tan, 40mm',
    quantity: 3,
    imageUrl: 'https://placehold.co/400x600'
  },
  {
    id: '3',
    price: 39.99,
    currency: 'BRL',
    name: 'Area VIP',
    description: 'Tan, 40mm',
    quantity: 3,
    imageUrl: 'https://placehold.co/400x600'
  },
]

export function SessionCard({ session, onSelect, children }: { session: any, children: JSX.Element, onSelect: (session) => void }) {

  return (

    <Box
      width={'100%'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onSelect(session)}
      // onClick={() => onSelect(session)}
      transition="0.3s"
      _hover={{ boxShadow: "lg" }}
    >
      <Box p="6">
        <Text fontWeight="bold" fontSize="xl">{'session.name'}</Text>
      </Box>

      {children}

    </Box>
  )

}
