import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { base64Converter } from '@/tools';
import {
    Flex, Card, CardBody, CardFooter, Image, Box, Heading, Stack, Divider, Button, Text, Code, CardHeader, CircularProgress,
    ListItem,
    UnorderedList,
    Input,
    Avatar
} from '@chakra-ui/react';
import * as Styled from './styles';
import { theme } from '@/themes/default';
import { Controller, UseFormReturn, useFormContext } from 'react-hook-form';

export function AvatarImageUpload() {

    const hookForm = useFormContext();

    const [loadFile, setLoadFile] = useState<boolean>(false)

    const [base64File, setBase64File] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {

        setLoadFile(true);

        hookForm.setValue('image', acceptedFiles, { shouldValidate: true });

        base64Converter(acceptedFiles[0], function (base64Data: string) {
            setBase64File(base64Data);
            hookForm.setValue('photo_profile', base64Data, { shouldValidate: true });
            setLoadFile(false)
        });

    }, []);


    const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': [],
            'multipart/png': []
        }
    });


    const files = acceptedFiles.map((file: any, index) => {

        return (
            base64File && <Avatar
                size={'xl'}
                src={base64File}
            />
        )
    });


    return (
        <Styled.StyledDropZone reject={isDragReject.toString()} {...getRootProps()}>

            <Controller
                name='photo_profile'
                control={hookForm.control}
                render={({ field }) => (
                    <input {...getInputProps()} />
                )}
            />

            {isDragAccept && (<Avatar name={hookForm.getValues('name')} size={'xl'} />)}

            {isDragReject && (
                <Box color={'red.500'} textAlign={'center'}>
                    <Heading size='md'>Arquivo inválido!</Heading>
                    <Text>O arquivo precisa estar no formato <strong>.zip</strong> a atender os padrões de uso.</Text>
                </Box>
            )}
            {!isDragActive && files.length === 0 && (hookForm.getValues('photo_profile') === undefined) && (
                <Avatar src={hookForm.getValues('photo_profile')} name={hookForm.getValues('name')} size={'xl'} />
            )}

            {files.length === 0 && hookForm.getValues('photo_profile') !== undefined ? <Box overflow="hidden" borderRadius="lg" width="100%" height="100%">
                {
                    <Avatar
                        size={'xl'}
                        src={hookForm.getValues('photo_profile')}
                    />
                }
            </Box> : files}
        </Styled.StyledDropZone>
    );
}
