

import container from '@/container';
import { useUserLocation } from '@/hooks';
import { EventRepositoryInterface } from '@/interfaces';
import { theme } from '@/themes/default';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Button,
    Stack,
    useDisclosure,
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
import { TruncateText } from '../TruncateText';

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


export function AvaiableCities({ callback }: { callback?: () => any }) {

    const { getUserLocation, userLocation, defineUserCity } = useUserLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRegion, setSelectedRegion] = useState<string | null>();
    const [avaiableCities, setAvaiableCities] = useState<string[]>([]);



    useEffect(() => {


        eventService.avaiableCities().then((response: AxiosResponse) => {
            setAvaiableCities(response.data)
        })
    }, [userLocation])


    const handleLocationClick = () => {
        getUserLocation();
        onClose();
        callback && callback();
    };

    return (
        <>
            <Box p={0} as={Button}
                onClick={onOpen}
                variant={'muted'}
                leftIcon={<CiLocationOn />}
                rightIcon={<ChevronDownIcon />}>
                {userLocation?.region ? <TruncateText text={userLocation?.label} limit={20} /> : (userLocation?.geolocation ? 'Perto de mim' : 'Qualquer lugar')}
            </Box>
            <Modal scrollBehavior='inside' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius={'2xl'} maxHeight={'calc(100% - 12.5rem)'}>
                    <ModalHeader textAlign={'center'}>
                        {/* <Stack spacing={4}>
                            <Heading size={'md'}>Escolha sua cidade</Heading>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                    <SearchIcon />
                                </InputLeftElement>
                                <Input placeholder='Pesquisar cidade...' />
                            </InputGroup>
                        </Stack> */}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody pb={8}>
                        <Stack spacing={4}>

                            <Flex
                                gap={3}
                                _hover={{ background: `${theme.colors.primary}26` }}
                                p={2}
                                onClick={handleLocationClick}
                                borderRadius={'lg'}
                                alignItems={'center'}
                                as={'button'}><IoMdLocate /> Usar minha localização atual</Flex>
                            <Stack spacing={2}>
                                <strong>Cidades sugeridas</strong>
                                {
                                    avaiableCities.map((city: any, index) => <Flex key={index}
                                        p={2}
                                        onClick={() => [defineUserCity(`${city.city}, ${city.state}`), onClose(), callback && callback()]}
                                        _hover={{ background: `${theme.colors.primary}26` }}
                                        alignItems={'center'}
                                        borderRadius={'lg'}
                                        as={'button'}
                                        gap={3}>
                                        <CiLocationOn /> {`${city.city}, ${city.state}`}
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
