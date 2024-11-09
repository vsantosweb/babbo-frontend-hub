
import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import moment from 'moment';
export function Footer() {
  return (
    <Box
      // mt={10}
      // bg={useColorModeValue('gray.50', 'black')}
      borderTopWidth='1px'
      // color={useColorModeValue('gray.700', 'gray.200')}
      >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center',  }}
        align={{ base: 'center', md: 'center' }}>
        {/* <Stack direction={'row'} spacing={6}>
          <Box as="a" href={'#'}>Home</Box>
          <Box as="a" href={'#'}>About</Box>
          <Box as="a" href={'#'}>Blog</Box>
          <Box as="a" href={'#'}>Contact</Box>
        </Stack> */}
        <Text>© {moment().format('Y')} Babbo. All rights reserved</Text>
      </Container>
    </Box>
  )
}