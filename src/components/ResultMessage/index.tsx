import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export function ResultMessage() {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      flex={1}
      height={'100%'}
    >
      <Flex gap={2} direction={'column'} align={'center'}>
        <Heading size={'lg'}>Nenhum evento encontrado</Heading>
        <Text>
          Não conseguimos localizar o evento que procurou, tente novamente.
        </Text>
      </Flex>
    </Box>
  );
}
