import { AvatarImageUpload, InputPassword } from "@/components";
import container from "@/container";
import { useAuth } from "@/hooks";
import { CustomerProfileRepositoryInterface } from "@/interfaces";
import Layout from "@/layouts";
import { theme } from "@/themes/default";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, FormErrorMessage, FormHelperText, HStack, useToast, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
Yup.setLocale(pt);

export const basicProfileValidatorSchema = {
    name: Yup.string().required('Campo obrigatório'),
    phone: Yup.string().required('Campo obrigatório'),
    email: Yup.string(),
    photo_profile: Yup.string()
}

export const basicProfileValidator = Yup.object().shape(basicProfileValidatorSchema);

const customerProfileService = container.get<CustomerProfileRepositoryInterface>('customer-profile');

export default function BasicProfileForm() {

    const [profile, setProfile] = useState(null);

    const toast = useToast();
    const { user } = useAuth();

    const validationSchema = Yup.object().shape({ ...basicProfileValidatorSchema });

    const basicProfileForm = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });

    useEffect(() => {

        if(user){
            basicProfileForm.setValue('name', user.name, { shouldValidate: true })
            basicProfileForm.setValue('phone', user.phone, { shouldValidate: true })
            basicProfileForm.setValue('email', user.email, { shouldValidate: true })
            basicProfileForm.setValue('photo_profile', user.photo_profile, { shouldValidate: true })
        }

    }, [profile])

    const handleUpdateProfile = async (formData: Record<string, any>) => {

        console.log(formData, 'odkasfosa');

        const data = {
            name: formData.name,
            phone: formData.phone,
            photo_profile: formData.photo_profile
        }

        await customerProfileService.updateBasicInfo(data).then(response => {
            console.log(response, 'response')
            toast({
                title: `Dados atualizados`,
                status: 'success',
                isClosable: true,
            })
        });
    }
    return (
        <FormProvider {...basicProfileForm}>
            <form onSubmit={basicProfileForm.handleSubmit(handleUpdateProfile)}>
                <Stack spacing={6}>
                    <Flex gap='4'>
                        <div><AvatarImageUpload /></div>
                        <FormControl isInvalid={!!basicProfileForm.formState.errors?.name}>
                            <FormLabel>Nome</FormLabel>
                            <Input {...basicProfileForm.register('name')} />
                            <FormErrorMessage>{basicProfileForm.formState.errors?.name?.message as string}</FormErrorMessage>
                        </FormControl>

                    </Flex>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input {...basicProfileForm.register('email')} type={'email'} disabled />
                        <FormHelperText>O endereço de email é único para cada conta e não pode ser alterado</FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={!!basicProfileForm.formState.errors?.phone}>
                        <FormLabel>Telefone/WhatsApp</FormLabel>
                        <Input  {...basicProfileForm.register('phone')} />
                        <FormErrorMessage>{basicProfileForm.formState.errors?.phone?.message as string}</FormErrorMessage>
                    </FormControl>

                    <Box textAlign={'right'}>
                        <Button
                            type={'submit'}
                            isLoading={basicProfileForm.formState.isSubmitting}
                            isDisabled={!basicProfileForm.formState.isValid}>
                            Salvar alterações
                        </Button>
                    </Box>

                </Stack>
            </form>
        </FormProvider>
    )
}
