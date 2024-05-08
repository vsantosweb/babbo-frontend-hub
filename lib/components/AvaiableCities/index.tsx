

import container from '@/container';
import { EventRepositoryInterface } from '@/interfaces';
import { theme } from '@/themes/default';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    Heading,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { IoMdLocate } from "react-icons/io";

const cities = [
    'São Paulo, SP',
    'Campinas, SP',
    'Guarulhos, SP',
    'São Bernardo do Campo, SP',
    'Santo André, SP',
    'Rio de Janeiro, RJ',
    'Niterói, RJ',
    'Duque de Caxias, RJ',
    'São Gonçalo, RJ',
    'Nova Iguaçu, RJ',
    'Porto Alegre, RS',
    'Caxias do Sul, RS',
    'Pelotas, RS',
    'Canoas, RS',
    'Santa Maria, RS'
];

const eventService = container.get<EventRepositoryInterface>('public');


export function AvaiableCitiesDesktop() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCity, setSelectedCity] = useState<string | null>('Selecione sua cidade');
    const [avaiableCities, setAvaiableCities] = useState<string[]>([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        eventService.avaiableCities().then((response: AxiosResponse) => {
            setAvaiableCities(response.data)
        })
    }, [])


    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // console.log(position, 'position')
                    // const { latitude, longitude }: = position.coords;
                    // setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <>
            <Box p={0} as={Button} onClick={onOpen} variant={'muted'} rightIcon={<ChevronDownIcon />}>{selectedCity}</Box>
            <Modal scrollBehavior='inside' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius={'2xl'} maxHeight={'calc(100% - 12.5rem)'}>
                    <ModalHeader textAlign={'center'}>
                        <Stack spacing={4}>
                            <Heading size={'md'}>Escolha sua cidade</Heading>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                    <SearchIcon />
                                </InputLeftElement>
                                <Input placeholder='Pesquisar cidade...' />
                            </InputGroup>
                        </Stack>
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody pb={8}>
                        <Stack spacing={4}>

                            <Flex
                                gap={3}
                                background={`${theme.colors.primary}26`}
                                p={2}
                                onClick={handleLocationClick}
                                borderRadius={'lg'}
                                alignItems={'center'}
                                as={'button'}><IoMdLocate /> Usar minha localização atual</Flex>
                            <Stack spacing={2}>
                                <strong>Cidades sugeridas</strong>
                                {
                                    avaiableCities.map((city, index) => <Flex key={index}
                                        p={2}
                                        onClick={() => [setSelectedCity(city), onClose()]}
                                        _hover={{ background: '#f1f1f1' }}
                                        alignItems={'center'}
                                        borderRadius={'lg'}
                                        as={'button'}
                                        gap={3}>
                                        <CiLocationOn /> {city}
                                    </Flex>
                                    )
                                }
                            </Stack>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}
