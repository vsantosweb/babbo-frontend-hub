import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Datebox = styled.button`
    border-radius: 16px;
    min-width: 120px;
    height: 130px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:4px;
    padding: 1em;
    border: solid 1px #666;
`
export const DateBoxTitle = styled.h3`
    font-size: 2.8em;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
`
export const DateBoxText = styled.span`
    font-size: 1em;
    text-transform: uppercase;
`