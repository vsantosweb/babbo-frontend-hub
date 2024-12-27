
'use client'
import { useEffect, useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Stack,
    FormErrorMessage,
    RadioGroup,
    Radio,
    Divider,
    Checkbox,
    HStack,
    Text,
    Heading,
} from '@chakra-ui/react'

import 'react-quill/dist/quill.snow.css';

import { Select } from "chakra-react-select";
import { Controller, UseFormReturn } from 'react-hook-form';
import moment from 'moment';
import { useEvent } from '@/hooks';
import { Switch } from '@chakra-ui/react'


export default function EventInfoForm({ hookForm }: { hookForm: UseFormReturn<any> }) {

    const [category, setCategories] = useState([]);

    const { fetchCategories } = useEvent();

    useEffect(() => {
        fetchCategories().then((response: any) => {
            setCategories(response.data.map((category: Record<string, string>) => ({
                label: category.name,
                value: category.name,
            })))
        })
    }, [])
    const { register, control, watch, formState: { errors } } = hookForm;

    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    return (
        <Stack spacing={8}>
            <FormControl isInvalid={!!errors?.name}>
                <FormLabel fontWeight='bold' m={0}>Qual o nome do evento?</FormLabel>
                <FormHelperText mb={6}>Este será o título do seu evento. Seu título será usado para ajudar nas buscas do site, seja especifico e criativo!</FormHelperText>
                <Input maxLength={70} {...register('name')} type="text" />
                <FormErrorMessage>{errors?.name?.message as string}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.category}>
                <FormLabel>Selecione uma categoria</FormLabel>
                <Controller
                    name='category'
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder='Categoria do evento'
                            options={category}
                        />
                    )}
                />
                <FormErrorMessage>{errors?.category?.message as string}</FormErrorMessage>
            </FormControl>
            <Divider />
            <HStack>
                <Stack flex='1'>
                    <Heading size='md'>Tornar este evento privado?</Heading>
                    <Text fontSize='sm'>Apenas as pessoas com o link terão acesso ao evento</Text>
                </Stack>
                <Switch isChecked={!!hookForm.watch('is_private')} {...register('is_private')}  />
            </HStack>
            <Divider />
            <Stack flexDirection={{ base: 'column', md: 'row' }} spacing={6}>
                <FormControl isInvalid={!!errors?.start_date}>
                    <FormLabel>Data de inicio</FormLabel>
                    <Input {...register('start_date')} min={moment().format('YYYY-MM-DD 00:00:00')} type={'datetime-local'} />
                    <FormErrorMessage>{errors?.start_date?.message as string}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.end_date}>
                    <FormLabel>Data de término</FormLabel>
                    <Input {...register('end_date')} min={moment(hookForm.watch('start_date')).format('YYYY-MM-DD 00:00:00')} type={'datetime-local'} />
                    <FormErrorMessage>{errors?.end_date?.message as string}</FormErrorMessage>
                </FormControl>
            </Stack>

            <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <ReactQuill {...field} theme="snow" value={field.value} onChange={(value: any) => field.onChange(value)} />
                    )}
                />
                <FormErrorMessage>{errors?.category?.message as string}</FormErrorMessage>
            </FormControl>

        </Stack>
    )
}
