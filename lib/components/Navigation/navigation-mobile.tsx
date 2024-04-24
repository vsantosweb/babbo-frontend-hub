import { Button, Stack, useColorModeValue } from "@chakra-ui/react";

export function MobileNav() {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                    bg: 'pink.300',
                }}
            >
                Anuncie seu evento
            </Button>
        
        </Stack>
    );
}
