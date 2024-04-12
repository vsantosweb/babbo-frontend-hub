import {
  Box,
  Input,
  HStack,
  Text,
  Flex,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  Heading,
  Stack,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import * as Styled from './styles';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useEvent } from '@/hooks';
import { EventInterface } from '@/types';
import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import _ from 'lodash';

export const EventSearch = () => {
  const { fetchSearch, loading } = useEvent();

  const [displayResult, setDisplayResult] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [isFetching, setIsfetching] = useState<boolean>(false);

  const [suggestedList, setSuggestedList] = useState<EventInterface[]>();

  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (displayResult) document.body.style.overflow = 'hidden';

    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        openDisplayResult(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [displayResult]);

  const openDisplayResult = (open: boolean) => {
    setDisplayResult(open);

    if (open) document.body.style.overflow = 'hidden';
    else {
      console.log('AUTOOOOOOOOOOOO')
      document.body.style.overflow = 'auto';
    }
  };

  const handleSearchDiscovery = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setQuery(value);

    let searchInterval: NodeJS.Timeout;

    if (value.length > 0) {
      openDisplayResult(true);

      if (value.length % 2 === 0) {// a cada 3 digitos faz uma busca
        setIsfetching(true);

        searchInterval = setTimeout(() => {
          fetchSearch(value).then((response: any) => {
            setIsfetching(false);
            setSuggestedList(response.data);
            _.isEmpty(response.data) && openDisplayResult(false);
          });
        }, 1000);
      }

      return;
    }

    openDisplayResult(false);

    setIsfetching(loading);

    return () => {
      clearInterval(searchInterval);
    };
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/events?name=${query}`);
  };

  return (
    <Flex width="100%"  flexDirection="column">
      <Box position={'relative'}  width="100%" maxW="600px">
        <form>
          <FormControl>
            <Input
              autoComplete="off"
              ref={inputRef}
              type={'search'}
              // onClick={() => openDisplayResult(true)}
              onChange={handleSearchDiscovery}
              pr={12}
              placeholder="Pesquisar bares, shows, eventos..."
              value={query}
            />
            <Flex
              as={Button}
              p={3}
              alignItems={'center'}
              position={'absolute'}
              top={0}
              onClick={handleSearch}
              bottom={0}
              variant={'ghost'}
              zIndex={1}
              type={'submit'}
              background={'none !important'}
              right={'0'}
              border={'none'}
              color={'#000'}
            >
              <CiSearch fontSize={'1.5em'} />
            </Flex>
          </FormControl>
        </form>

        {displayResult && (
          <Box>
            <Styled.ResultBox ref={ref}>
              {/* <Stack spacing={4}>
                <Heading size={'md'}>Resultados</Heading>
                <Styled.SuggestedList>
                  <Styled.SuggestedListItem>Pagode</Styled.SuggestedListItem>
                  <Styled.SuggestedListItem>Funk</Styled.SuggestedListItem>
                  <Styled.SuggestedListItem>Sertanejo</Styled.SuggestedListItem>
                </Styled.SuggestedList>
              </Stack> */}

              {isFetching ? (
                <Spinner />
              ) : (
                !_.isEmpty(suggestedList) && (
                  <Stack width={'100%'} height={'100%'} spacing={4}>
                    <Heading size={'md'}>Resultados</Heading>
                    <Styled.SuggestedList>
                      {suggestedList?.map((suggest, index) => (
                        <Styled.SuggestedListItem key={index}>
                          <Link
                            onClick={() => openDisplayResult(false)}
                            href={`/events/${suggest.slug}?id=${suggest.uuid}`}
                          >
                            <Flex
                              alignItems={'center'}
                              justifyContent={'space-between'}
                            >
                              <Text size={'sm'}>{suggest.name} </Text>
                              <FaArrowRight />
                            </Flex>
                          </Link>
                        </Styled.SuggestedListItem>
                      ))}
                    </Styled.SuggestedList>
                  </Stack>
                )
              )}
            </Styled.ResultBox>
            <Styled.SearchOverlay />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

const CategoryCard = ({ title }: { title: string }) => {
  return (
    <Box
      px={4}
      py={2}
      bg="gray.100"
      borderRadius="md"
      _hover={{ bg: 'gray.200', cursor: 'pointer' }}
    >
      <Text fontSize="md">{title}</Text>
    </Box>
  );
};
