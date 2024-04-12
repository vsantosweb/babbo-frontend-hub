import { EventInterface } from '@/types';
import {
  Button, Flex,  HStack, Heading, Stack, Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import { eventDateFormatter } from '@/helpers';
import Link from 'next/link';
import { useRef, useState } from 'react';

const EventDetails = ({ event, handleDelete }: { event?: EventInterface, handleDelete: (id: number) => any }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDeleting, setIsdeleting] = useState(false);
  const cancelRef = useRef<any>()

  return (
    event ? <HStack>
      <Stack spacing={3}>
        <Heading size={'lg'} >{event?.name}</Heading>
        <HStack spacing={6}>
          <Text>
            <HStack>
              <HiCalendar /> <span>{event && eventDateFormatter(event).fully}</span>
            </HStack>
          </Text>
        </HStack>
        <HStack>
          <HiLocationMarker /> <span>{event?.full_address}</span>
        </HStack>

      </Stack>
      <Flex justifyContent={'flex-end'} flex={1}>
        <HStack spacing={3}>
          <Button as={Link} variant={'outline'} href={`/events/${event?.uuid}/edit`} size={'sm'}>Editar</Button>
          <Button onClick={onOpen} colorScheme='red' size={'sm'}>Excluir</Button>
        </HStack>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>Deseja excluir o evento <span style={{ color: 'red' }}>{event?.name}</span>?
            </AlertDialogHeader>

            <AlertDialogBody>Essa ação será irreversível, tem certeza?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} variant={'outline'} onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={() => {
                event.id && handleDelete(event.id);
                setIsdeleting(true);
              }} isLoading={isDeleting} ml={3}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </HStack> : <Spinner />
  );
};

export default EventDetails;
