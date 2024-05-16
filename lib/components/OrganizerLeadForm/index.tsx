import container from '@/container';
import { PublicRepositoryInterface } from '@/interfaces';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Stack,
    UseDisclosureProps,
    Box,
    Text,
    FormHelperText,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { ResultMessage } from '../ResultMessage';
import { useRouter } from 'next/router';


const publicService = container.get<PublicRepositoryInterface>('public');

export function OrganizerLeadForm({ useDisclosure }: { useDisclosure: UseDisclosureProps }) {

    const { handleSubmit, reset, setValue, register, control, formState } = useForm({ mode: 'onChange' });

    const router = useRouter();

    const { isOpen, onClose, onOpen } = useDisclosure
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    // console.log(v.replace(/[^\d]/g, ''))

    useEffect(() => {

        if (router.query?.preRegister) {

            onOpen && onOpen();
        }

    }, [router])

    const handleSubmitLead = async (formData: Record<string, any>) => {

        await publicService.createLead(formData)
    }

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={!!isOpen}
            isCentered
            onClose={() => onClose && onClose()}

        >
            <ModalOverlay />
            <ModalContent borderRadius={'3xl'}>
                {!formState.isSubmitSuccessful ?
                    <>
                        <ModalHeader>Preencha o formulário, nós entraremos em contato com você</ModalHeader>
                        <ModalCloseButton />

                        <form onSubmit={handleSubmit(handleSubmitLead)}>
                            <ModalBody pb={6}>
                                <Stack spacing={4}>
                                    <FormControl isRequired={true}>
                                        <FormLabel>Seu nome</FormLabel>
                                        <Input maxLength={50} {...register('name', { required: true })} placeholder='Digite seu nome' />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Nome da produtora (Opcional)</FormLabel>
                                        <Input maxLength={50} {...register('organizer_name')} placeholder='Ex: Patrick Eventos, Maria Produções' />
                                    </FormControl>

                                    <FormControl isRequired={true}>
                                        <FormLabel>Email</FormLabel>
                                        <Input maxLength={50} {...register('email', { required: true })} type={'email'} placeholder='Digite seu email' />
                                    </FormControl>
                                    <FormControl isRequired={true}>
                                        <FormLabel>Celular/WhatsApp</FormLabel>
                                        <Input as={InputMask}
                                            alwaysShowMask={false}
                                            maskChar={null}
                                            placeholder='(99) 99999-9999'
                                            mask={'(99) 99999-9999'}
                                            // onChange={e => e.target.value.replace(/[^\d]/g, '')}
                                            {...register('phone', {
                                                required: true,
                                                onBlur: e => setValue('phone', e.target.value.replace(/[^\d]/g, ''))
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Perfil do instagram (opcional)</FormLabel>
                                        <FormHelperText mb={4}>Importante para deixar seu perfil mais completo</FormHelperText>
                                        <Input maxLength={50} {...register('social_link')} placeholder='https://instagram.com' />
                                    </FormControl>
                                    <Flex justifyContent={'center'} width={'100%'} >
                                        <Controller
                                            rules={{ required: true }}
                                            name='recaptcha'
                                            control={control}
                                            render={({ field }) => (
                                                <ReCAPTCHA {...field} sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY as string} />

                                            )}
                                        />
                                    </Flex>
                                </Stack>
                            </ModalBody>
                            <Text fontSize={'sm'} px={6}>
                                O cadastro para organizadores ainda está limitado! Faça seu cadastro agora mesmo e seja um
                                dos primeiros a promover seus eventos no Babbo.
                            </Text>
                            <ModalFooter>
                                <Button type='submit' isLoading={formState.isSubmitting} isDisabled={!formState.isValid} colorScheme='blue'>Concluir cadastro</Button>
                            </ModalFooter>
                        </form>
                    </> : <ModalBody>

                        <Stack spacing={8} p={4}>
                            <ResultMessage
                                title={'Seu cadastro foi enviado para a nossa equipe'}
                                description={'Obrigado por dar esse passo! 🌟 Em breve, estaremos em contato para dar continuidade ao seu cadastro. Estamos ansiosos para divulgar seus eventos! 😊'}
                            />
                            <Button onClick={() => onClose && [onClose(), reset()]}>Fechar</Button>
                        </Stack>
                    </ModalBody>
                }
            </ModalContent>
        </Modal>
    )
}