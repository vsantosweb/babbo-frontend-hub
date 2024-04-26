import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { base64Converter } from '@/tools';
import {
    Flex, Card, CardBody, CardFooter, Image, Box, Heading, Stack, Divider, Button, Text, Code, CardHeader, CircularProgress,
    ListItem,
    UnorderedList,
    Input
} from '@chakra-ui/react';
import * as Styled from './styles';
import { theme } from '@/themes/default';
import { Controller, UseFormReturn } from 'react-hook-form';

export function EventImageUpload({ hookForm }: { hookForm: UseFormReturn<any> }) {

    const [loadFile, setLoadFile] = useState<boolean>(false)

    const [base64File, setBase64File] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {

        setLoadFile(true);

        hookForm.setValue('image', acceptedFiles, { shouldValidate: true });

        base64Converter(acceptedFiles[0], function (base64Data: string) {
            setBase64File(base64Data)
            hookForm.setValue('event_image', base64Data, { shouldValidate: true });
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
            <Box key={index} overflow="hidden" borderRadius="md" width="100%" height="100%">
                {
                    base64File && <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={base64File}
                        alt="Imagem"
                    />
                }
            </Box>
        )
    });


    return (
        <Card boxShadow={'none'}>
            <CardBody p={0}>
                <Flex>
                    <Styled.StyledDropZone reject={isDragReject.toString()} {...getRootProps()}>

                        <Controller
                            name='event_image'
                            control={hookForm.control}
                            render={({ field }) => (
                                <input {...getInputProps()} />
                            )}
                        />

                        {isDragAccept && (<Heading color={'green'} size={'xl'}><i className={'las la-check'}></i></Heading>)}

                        {isDragReject && (
                            <Box color={'red.500'} textAlign={'center'}>
                                <Heading size='md'>Arquivo inválido!</Heading>
                                <Text>O arquivo precisa estar no formato <strong>.zip</strong> a atender os padrões de uso.</Text>
                            </Box>
                        )}
                        {!isDragActive && files.length === 0 && (hookForm.getValues('event_image') === undefined) && (
                            <Flex alignItems={'center'}>
                                <Stack p={2} textAlign={'center'}>
                                    <Heading size='md'>Imagem do evento</Heading>
                                    <Text size={'xs'}>Arraste sua imagem aqui, ou clique para selecionar os arquivos.</Text>
                                    <Text><small>A dimensão recomendada é de <strong>500 x 750</strong> ou tamanhos similares nas postagens de status.</small></Text>
                                </Stack>
                            </Flex>
                        )}
                        
                        {files.length === 0 && hookForm.getValues('event_image') !== undefined ? <Box overflow="hidden" borderRadius="md" width="100%" height="100%">
                            {
                                <img
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={hookForm.getValues('event_image') + '.jpg'}
                                    alt="Imagem"
                                />
                            }
                        </Box> : files}
                    </Styled.StyledDropZone>
                </Flex>
            </CardBody>

        </Card>
    );
}
