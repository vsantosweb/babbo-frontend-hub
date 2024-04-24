'use client'

import { Box, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Flex align={'center'} justify={'center'} height={'100%'} textAlign="center" py={10} px={6}>
            <Stack>
                <Heading
                    display="inline-block"
                    as="h2"
                    size="4xl"
                    fontWeight={'900'}
                    background="primary.500"
                    backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="xl" >Página não encontrada
                </Text>
                <Text color={'gray.500'} mb={2}>A página que você está procurando não existe</Text>

                <Box>
                    <Button
                        as={Link}
                        href={'/'}
                        colorScheme="primary"
                        color="white"
                        variant="solid">
                        Voltar para o início
                    </Button>
                </Box>
            </Stack>
        </Flex>
    )
}