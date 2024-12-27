import { useState } from 'react';
import { Box, Button, Heading, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

function TicketSaleComponent() {
    const [ticketCount, setTicketCount] = useState<any>({});
    const ticketPrices:any = {
        "Ingresso Padrão": 50,
        "Ingresso VIP": 100,
        "Ingresso Premium": 150
    };
    const cardFee = 2; // Taxa do cartão
    const platformFee = 5; // Taxa da plataforma

    const handleTicketCountChange = (type:any, value:any) => {
        setTicketCount({
            ...ticketCount,
            [type]: value
        });
    };

    const handleCheckout = () => {
        let totalTickets = 0;
        let totalPrice = 0;

        Object.keys(ticketCount).forEach(type => {
            totalTickets += ticketCount[type];
            totalPrice += ticketPrices[type] * ticketCount[type];
        });

        totalPrice += cardFee + platformFee;

        // Implemente a lógica de checkout aqui
        console.log(`Você está comprando um total de ${totalTickets} ingresso(s) no valor total de R$ ${totalPrice.toFixed(2)}`);
    };

    return (
        
        <Box p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md" mb={4}>Venda de Ingressos</Heading>
            <Accordion allowMultiple>
                {Object.keys(ticketPrices).map(type => (
                    <AccordionItem key={type}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    {type} - R$ {ticketPrices[type].toFixed(2)}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <NumberInput
                                min={0}
                                max={10}
                                value={ticketCount[type] || 0}
                                onChange={(valueString) => handleTicketCountChange(type, parseInt(valueString))}
                                allowMouseWheel
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <Button onClick={() => handleTicketCountChange(type, (ticketCount[type] || 0) - 1)}><MinusIcon /></Button>
                                    <Button onClick={() => handleTicketCountChange(type, (ticketCount[type] || 0) + 1)}><AddIcon /></Button>
                                </NumberInputStepper>
                            </NumberInput>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button colorScheme="blue" onClick={handleCheckout}>Checkout</Button>
        </Box>
    );
}

export default TicketSaleComponent;
