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
                    size="3xl"
                    background="primary.500"
                    backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>Página não encontrada
                </Text>
                <Text color={'gray.500'} mb={6}>A página que você está procurando não existe</Text>

                <Box>
                    <Button
                        as={Link}
                        href={'/'}
                        colorScheme="primary"
                        color="white"
                        variant="solid">
                        Go to Home
                    </Button>
                </Box>
            </Stack>
        </Flex>
    )
}