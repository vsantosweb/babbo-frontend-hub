import { Loader } from '@/components';
import Layout from '@/layouts'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Heading, Spinner } from '@chakra-ui/react';
import { Result } from '@zxing/library';
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';

export default function CheckIn() {
    const [data, setData] = useState<any>('No result');
    const [delay, setDelay] = useState(1000)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    console.log(data, 'data')

    function delayFunction() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Executado após 2 segundos');
            }, 2000); // 2000 ms = 2 segundos
        });
    }

    const handleCheck = (result: any) => {
        setLoading(true)
        setDelay(10000)
        delayFunction().then(() => {
            setLoading(false)
            setData(result.text);
            setDelay(1000)
            setSuccess(true)
        })
    }

    const newScan = () => {
        setSuccess(false)
    }
    return (
        <Layout name='manager'>
            <Box position='relative'>
                <Heading size='sm'>Check-in</Heading>
                <QrReader
                    constraints={{ facingMode: 'user' }}
                    scanDelay={delay}
                    containerStyle={{ width: '100%', height: 800, }}
                    videoStyle={{maxWidth: '400px', height: '100%',  }}

                    onResult={(result, error) => {
                        { console.log(result, 'resultresultresult') }
                        if (!!result) {
                            handleCheck(result)

                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                />
                {loading && <Box
                    bg={'whiteAlpha.500'}
                    w='100%'
                    h='100%'
                    position='absolute'
                    top='0'
                    bottom='0'
                    left='0'
                >
                    <Spinner
                        position='absolute'
                        top='45%'
                        bottom='0'
                        right='45%'
                        boxShadow='lg'
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='primary.500'
                        size='xl'
                    />
                   
                </Box>}

                {success && <Box
                    bg={'whiteAlpha.500'}
                    w='100%'
                    h='100%'
                    position='absolute'
                    top='0'
                    bottom='0'
                    left='0'
                >

                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>Validação conclúida!</AlertTitle>
                        <AlertDescription>{data.text}</AlertDescription>
                        <Button onClick={newScan}>Novo Scan</Button>
                    </Alert>
                </Box>}
                <p>{data}</p>
            </Box>
        </Layout>
    )
}
