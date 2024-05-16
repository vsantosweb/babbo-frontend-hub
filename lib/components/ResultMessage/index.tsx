import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';

interface ResultMessageType extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: {
    callback: () => void;
    actionText: string;
  };
}

export function ResultMessage({ title, description, action, ...props }: ResultMessageType) {

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      minWidth={'100%'}
      flex={1}
      minHeight={'100%'}
      
    >
      <Flex {...props} gap={4} direction={'column'} justifyContent={'center'} align={'center'}>
        <Heading fontSize={'24px'}>{title}</Heading>
        <Text>{description}</Text>
        {action && <Button variant={'outline'} onClick={action.callback}>{action.actionText}</Button>}
      </Flex>
    </Box>
  );
}
