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

export function EventImageUpload() {


    const [loadFile, setLoadFile] = useState<boolean>(false)
    const [base64File, setBase64File] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<'wait' | 'complete' | 'loading'>('wait')

    const handleSendFiles = () => {
        setStatus('loading')

    }


    const onDrop = useCallback((acceptedFiles: File[]) => {

        setLoadFile(true);

        base64Converter(acceptedFiles[0], function (base64Data: string) {

            setBase64File(base64Data)

            setLoadFile(false)

        });

    }, []);


    const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'multipart/png': []
        }
    });


    const files = acceptedFiles.map((file: any) => {
        console.log(file, 'file')
        return (
            <Box overflow="hidden" borderRadius="md" width="100%" height="100%">
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
            <CardBody>
                <Flex>
                    <Styled.StyledDropZone reject={isDragReject.toString()} {...getRootProps()}>

                        <input {...getInputProps()} />
                        {isDragAccept && (<Heading color={'green'} size={'xl'}><i className={'las la-check'}></i></Heading>)}
                        {isDragReject && (
                            <Box color={'red.500'} textAlign={'center'}>
                                <Heading size='md'>Arquivo inválido!</Heading>
                                <Text>O arquivo precisa estar no formato <strong>.zip</strong> a atender os padrões de uso.</Text>
                            </Box>
                        )}
                        {!isDragActive && files.length === 0 && (
                            <Flex alignItems={'center'}>
                                <Stack p={2} textAlign={'center'}>
                                    <Heading size='md'>Imagem do evento</Heading>
                                    <Text size={'xs'}>Arraste sua imagem aqui, ou clique para selecionar os arquivos.</Text>
                                    <Text><small>A dimensão recomendada é de <strong>500 x 750</strong> ou tamanhos similares nas postagens de status.</small></Text>
                                </Stack>
                            </Flex>
                        )}
                        {files}
                    </Styled.StyledDropZone>
                </Flex>
            </CardBody>

        </Card>
    );
}
