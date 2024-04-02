
'use client'
import { useEffect, useState } from 'react'
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
    FormErrorMessage,
    HStack,
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
import { Controller, UseFormReturn } from 'react-hook-form';
import { EventInterface } from '@/types';
import moment from 'moment';
import { useEvent } from '@/hooks';

export default function EventInfoForm({ hookForm }: { hookForm: UseFormReturn<any> }) {

    const [value, setValue] = useState('');
    const [categories, setCategories] = useState([]);

    const { fetchCategories } = useEvent();

    useEffect(() => {
        fetchCategories().then((response: any) => {
            setCategories(response.data.map((category: Record<string, string>) => ({
                label: category.name,
                value: category.id,
            })))
        })
    }, [])
    const { register, control, formState: { errors, isValid } } = hookForm;

    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    return (
        <Stack spacing={4}>
            <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nome o evento</FormLabel>
                <Input {...register('name')} type="text" />
                <FormErrorMessage>{errors?.name?.message as string}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.categories}>
                <FormLabel>O que vai rolar?</FormLabel>
                <FormHelperText>Selecione até 3 categorias</FormHelperText>
                <Controller
                    name='categories'
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder='Escolha algumas categorias'
                            isMulti
                            options={categories}
                        />
                    )}
                />
                <FormErrorMessage>{errors?.categories?.message as string}</FormErrorMessage>
            </FormControl>

            <HStack spacing={6}>
                <FormControl isInvalid={!!errors?.start_date}>
                    <FormLabel>Data de inicio</FormLabel>
                    <Input {...register('start_date')} min={moment().format('YYYY-MM-DD 00:00:00')} type={'datetime-local'} />
                    <FormErrorMessage>{errors?.start_date?.message as string}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.end_date}>
                    <FormLabel>Data de término</FormLabel>
                    <Input {...register('end_date')} type={'datetime-local'} />
                    <FormErrorMessage>{errors?.end_date?.message as string}</FormErrorMessage>
                </FormControl>
            </HStack>

            <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <ReactQuill {...field} theme="snow" value={field.value} onChange={(value:any) => field.onChange(value)} />
                    )}
                />
                <FormErrorMessage>{errors?.categories?.message as string}</FormErrorMessage>
            </FormControl>

        </Stack>
    )
}
