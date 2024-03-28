
import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Stack,
} from '@chakra-ui/react'
import { GoogleAutoComplete } from '@/components'

export default function AddressForm() {

    const [address, setAddress] = useState<any[]>([])
    
    return (
        <Stack>

            <GoogleAutoComplete captureAddress={setAddress} />

            {address.length > 0 && <Stack>
                <FormControl>
                    <FormLabel htmlFor="zipcode" fontWeight={'normal'}>CEP</FormLabel>
                    <Input defaultValue={address[6].long_name} disabled type="teXt" />
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight={'normal'}>Endereço</FormLabel>
                    <Input defaultValue={address[1].long_name} disabled type="text" />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email" fontWeight={'normal'}>Bairro</FormLabel>
                    <Input defaultValue={address[2].long_name} disabled type="text" />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email" fontWeight={'normal'}>Complemento
                    </FormLabel>
                    <Input defaultValue={address[6].long_name} disabled type="email" />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email" fontWeight={'normal'}>Cidade</FormLabel>
                    <Input defaultValue={address[3].long_name} disabled type="email" />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email" fontWeight={'normal'}>Estado</FormLabel>
                    <Input defaultValue={address[4].short_name} disabled type="email" />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email" fontWeight={'normal'}>Nº</FormLabel>
                    <Input defaultValue={address[0].long_name} disabled type="email" />
                </FormControl>
            </Stack>}
        </Stack>
    )
}
