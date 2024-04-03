import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledDropZone = styled(Flex)`
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 416px;
  width: 300px;
  border:solid 1px;
  border-radius: ${({ theme }: {theme:any}) => theme.defaultRadius};
  border-color: ${({ reject, theme }: any) => reject === 'true' ? 'red' : theme.colors.primary};
  border-style: dashed;
  background-color: #fafafa;
  outline: none;
  transition: border .24s ease-in-out;
  &:hover{
    background: #bcd9ff83;
  }
`
export const OverlayStatus =  styled(Flex)`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  top:0;
  border:  ${(error) => `dashed 2px ${error ? 'red' : 'green'}`};
  border-radius: 20px;

`