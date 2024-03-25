import { Flex, Spinner, Text } from '@chakra-ui/react';

export function Loader({
  text,
}: {
  text?: string | JSX.Element | JSX.Element[];
}) {
  return (
    <Flex flex={1} align={'center'} height={'100%'}>
      <Flex flex={1} gap={3} direction={'column'} align={'center'}>
        <Spinner />
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
}
