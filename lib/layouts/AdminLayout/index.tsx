import React from 'react';

// import { ServiceHeader } from '@/components';
import { Footer, ManagerNavigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { FaArrowLeft } from 'react-icons/fa';

export default function AdminLayout({
    children,
    title,
    description,
    image,
    keywords,
}: {
    children?: JSX.Element[] | JSX.Element;
    title?: string;
    description?: string;
    image?: string;
    keywords?: string;
}) {
    const router = useRouter();
    return (
        <div
            style={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                height: 'auto',
                minHeight: '100%',
            }}
        >

            {children}
            {/* <Footer /> */}
        </div>
    );
}
