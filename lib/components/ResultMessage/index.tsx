import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

export type ResultMessageType = {
  title: string,
  description: string,
  action: {
    callback?: () => any,
    actionText: string | number | JSX.Element
  }
}
export function ResultMessage({ title, description, action }: ResultMessageType) {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      flex={1}
      height={'100%'}
    >
      <Flex gap={6} direction={'column'} align={'center'}>
        <Heading size={'lg'}>{title}</Heading>
        <Text>{description}</Text>
        {action.callback && <Button variant={'outline'} onClick={action.callback}>{action.actionText}</Button>}
      </Flex>
    </Box>
  );
}
