import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Radio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react';

export default function PaymentMethodList() {

    const [selectedPayment, setSelectedPayment] = useState('credit');

    const paymentMethods = [
        { value: 'credit', label: 'Cartão de Crédito' },
        { value: 'billet', label: 'Boleto' },
        { value: 'pix', label: 'PIX' },
    ];

    return (
        <RadioGroup onChange={setSelectedPayment} value={selectedPayment}>
            <Accordion allowToggle defaultIndex={0}>
                {paymentMethods.map((method) => (
                    <AccordionItem key={method.value}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Radio value={method.value}>{method.label}</Radio>
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {/* Conteúdo adicional sobre o método de pagamento pode ir aqui */}
                            <p>Informações sobre {method.label}</p>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </RadioGroup>
    );

}