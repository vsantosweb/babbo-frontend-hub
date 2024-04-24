import { AvatarImageUpload, InputPassword } from "@/components";
import container from "@/container";
import { CustomerProfileRepositoryInterface } from "@/interfaces";

import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, FormErrorMessage, FormHelperText, HStack, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordValidatorSchema } from "../../../validators";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from 'yup';

const customerProfileService = container.get<CustomerProfileRepositoryInterface>('customer-profile');

export default function ChangePasswordForm() {

    const [profile, setProfile] = useState(null);

    const toast = useToast();

    const validationSchema = Yup.object().shape({ ...passwordValidatorSchema });

    const passwordForm = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });

    const handleChangePassword = async (formData: Record<string, any>) => {

        const payload = {
            current_password: formData.current_password,
            password: formData.password,
            password_confirmation: formData.password_confirmation
        }

        await customerProfileService.changePassword(payload).then((response) => {

            console.log(response.response, 'kkkkkkkkkkk')
            toast({
                title: `Senha alterada com sucesso`,
                status: 'success',
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        });
    }
    return (
        <FormProvider {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handleChangePassword)}>
                <Stack>
                    <FormControl isInvalid={!!passwordForm.formState.errors?.current_password}>
                        <FormLabel>Senha atual</FormLabel>
                        <Input type={'password'} {...passwordForm.register('current_password')} />
                        {/* <Input type={'password'}  {...passwordForm.register('current_password')} /> */}
                        <FormErrorMessage>{passwordForm.formState.errors?.current_password?.message as string}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!passwordForm.formState.errors?.password}>
                        <FormLabel>Nova senha</FormLabel>
                        <Input type={'password'} {...passwordForm.register('password')} />
                        <FormErrorMessage>{passwordForm.formState.errors?.password?.message as string}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!passwordForm.formState.errors?.password_confirmation}>
                        <FormLabel>Confirme a nova senha</FormLabel>
                        <Input type={'password'}  {...passwordForm.register('password_confirmation')} />
                        <FormErrorMessage>{passwordForm.formState.errors?.password_confirmation?.message as string}</FormErrorMessage>
                    </FormControl>

                    <Box mt={5} textAlign={'right'}>
                        <Button
                            type={'submit'}
                            isLoading={passwordForm.formState.isSubmitting}
                            isDisabled={!passwordForm.formState.isValid}>
                            Salvar alterações
                        </Button>
                    </Box>
                </Stack>
            </form>
        </FormProvider>
    )
}
