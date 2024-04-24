import { InputPassword } from "@/components";
import container from "@/container";
import { CustomerProfileRepositoryInterface } from "@/interfaces";
import Layout from "@/layouts";
import { theme } from "@/themes/default";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicProfileValidatorSchema } from "../../../validators";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import BasicProfileForm from "apps/manager/components/forms/profile/basic-profile-form";
import ChangePasswordForm from "apps/manager/components/forms/profile/change-password-form";


export default function Profile() {

    return (
        <Layout name='manager'>
            <Stack w={'100%'} spacing={8} m={'auto'}>
                <Stack p={8} borderRadius={'xl'} boxShadow={'lg'}>
                    <Heading fontWeight={'300'} color={'primary.500'}>Dados da conta</Heading>
                    <BasicProfileForm />
                </Stack>
                <Divider />
                <Stack>
                    <Heading fontWeight={'300'} color={'primary.500'}>Alterar senha</Heading>
                    <ChangePasswordForm />
                </Stack>
                <Divider />

                <Stack>
                    <Heading fontWeight={'300'} color={'primary.500'}>Dados da conta</Heading>
                    <Tabs>
                        <TabList>
                            <Tab>One</Tab>
                            <Tab>Two</Tab>
                            <Tab>Three</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <p>one!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </Stack>
        </Layout>
    )
}
