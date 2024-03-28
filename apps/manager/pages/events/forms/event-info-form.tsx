
'use client'
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
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Stack,
} from '@chakra-ui/react'
import { EventImageUpload } from '@/components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
} from "chakra-react-select";

export default function EventInfoForm() {

    const [value, setValue] = useState('');

    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    return (
        <Stack spacing={4}>
            <FormControl>
                <FormLabel>Nome o evento</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl>
                <FormLabel>O que vai rolar?</FormLabel>
                <Select
                    placeholder='Escolha algumas categorias'
                    isMulti
                    options={[
                        {
                            label: "Sertanejo",
                            value: "Sertanejo",
                            colorScheme: "primary", // The option color scheme overrides the global
                        },
                        {
                            label: "Funk",
                            value: "Funk",
                        },
                    ]}
                />
                <FormHelperText>Selecione até 3 categorias</FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel>Descrição do evento</FormLabel>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
            </FormControl>
        </Stack>
    )
}
