import React from 'react'
import * as Styled from './styles';
import { Heading, Link } from '@chakra-ui/react';

export default function AuthLayout({
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
    return (
        <React.Fragment>
            <Styled.AuthContainer>
                <Styled.AuthHeader><Heading>Babbo</Heading></Styled.AuthHeader>
                <Styled.AuthWrapper>
                    {children}
                    <Styled.AuthFooter>
                        <small>
                            Ao fazer login ou registrar uma conta no Babbo, confirmo que li e concordei com
                            <Link color={'primary.50'} href="https://pages.trip.com/service-guideline/terms-pt-br.html" target="_blank"> Termos e condições</Link> e
                            <Link color={'primary.50'} href="https://pages.trip.com/service-guideline/privacy-policy-pt-br.html" target="_blank"> Declaração de Privacidade </Link>
                            do Babbo
                        </small>
                        <hr />
                        <small>
                            Todos os direitos reservados.
                            Direitos autorais {new Date().getFullYear()} - Babbo®
                        </small>
                    </Styled.AuthFooter>
                </Styled.AuthWrapper>
            </Styled.AuthContainer>
        </React.Fragment>
    )
}