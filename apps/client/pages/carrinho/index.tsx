import React from 'react'

import Layout from '@/layouts';
import { EventProvider, useEvent, useUserLocation } from '@/hooks';
import { useEffect, useState } from 'react';
import { HomeSegmented } from '@/themes/babbo';
import { EventInterface, OrganizerType } from '@/types';
import {
  Box, Button, useDisclosure, Heading, Text, Stack, Flex, AvatarGroup, Avatar, UseDisclosureProps
} from '@chakra-ui/react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { GoogleAdSense, OrganizerLeadForm } from '@/components';
import container from '@/container';
import { PublicOrganizerRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

import { IEventRepository } from "@repository/interfaces"

export default function CartPage() {
  new IEventRepository()
  return (
    <Layout
      title={'Babbo - Carrinho'}
      name={'client'}
      description={'Aqui você encontra os melhores eventos da sua região, desde barzinhos aconchegantes, baldas, shows e muito mais!'}
      keywords={'baladas,shows,roles,festas,party,bares,barzinho,bares, lounge, bar e lounge'}
    >
      <Stack spacing={6} mt={8} flex={1}>
        <h1>Carrinho</h1>
      </Stack>
       
    </Layout>
  )
}
