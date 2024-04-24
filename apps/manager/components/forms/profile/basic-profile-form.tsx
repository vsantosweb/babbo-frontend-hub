import { AvatarImageUpload, InputPassword } from "@/components";
import container from "@/container";
import { CustomerProfileRepositoryInterface } from "@/interfaces";
import Layout from "@/layouts";
import { theme } from "@/themes/default";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, FormErrorMessage, FormHelperText, HStack, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicProfileValidatorSchema } from "../../../validators";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from 'yup';

const customerProfileService = container.get<CustomerProfileRepositoryInterface>('customer-profile');

export default function BasicProfileForm() {

    const [profile, setProfile] = useState(null);

    const toast = useToast();

    const validationSchema = Yup.object().shape({ ...basicProfileValidatorSchema });

    const basicProfileForm = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });

    useEffect(() => {

        customerProfileService.me().then(response => {
            basicProfileForm.setValue('name', response.data.name, { shouldValidate: true })
            basicProfileForm.setValue('phone', response.data.phone, { shouldValidate: true })
            basicProfileForm.setValue('email', response.data.email, { shouldValidate: true })
            basicProfileForm.setValue('photo_profile', response.data.photo_profile, { shouldValidate: true })
        })

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
                <Stack>
                    <HStack spacing={4}>
                        <AvatarImageUpload />
                        <FormControl isInvalid={!!basicProfileForm.formState.errors?.name}>
                            <FormLabel>Nome</FormLabel>
                            <Input {...basicProfileForm.register('name')} />
                            <FormErrorMessage>{basicProfileForm.formState.errors?.name?.message as string}</FormErrorMessage>
                        </FormControl>

                    </HStack>
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

                    <Box mt={5} textAlign={'right'}>
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
