import { Box, Button, Flex, HStack, Select, Stack } from '@chakra-ui/react';

import { Input } from '@chakra-ui/react';
import { DatePickerDialog } from '@/components';
import { theme } from '@/themes/default';
import { useEvent, useQueryString } from '@/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type MixedObjectType = { [index: string]: any };

export function EventFilter() {
  const [categories, setCategories] = useState<MixedObjectType[]>([]);

  const [avaiableCities, setAvaiableCities] = useState([]);

  const { fetchEvents, fetchCategories, fetchAvaiableCities } = useEvent();
  const { query, setQuery, parsed } = useQueryString();
  const router = useRouter();

  useEffect(() => {
    // router.push(parsed)
  }, [query]);

  useEffect(() => {
    fetchCategories().then((response: any) => setCategories(response.data));
    fetchAvaiableCities().then((response: any) =>
      setAvaiableCities(response.data)
    );
  }, []);

  return (
    <Stack
      my={{ base: 4 }}
      p={`4`}
      borderRadius={theme.defaultRadius}
      border={'solid 1px #f1f1f1'}
      direction={{ base: 'column', md: 'row' }}
      zIndex={2}
      className='app-wrapper'
    >
      <Box width={'100%'}>
        <DatePickerDialog />
      </Box>
      <Select
        placeholder="Categoria"
        onChange={(e) => setQuery({ ...query, category: e.target.value })}
      >
        {categories?.map((category: MixedObjectType) => (
          <option value={category?.name}>{category?.name}</option>
        ))}
      </Select>
      <Select
        placeholder="Onde?"
        onChange={(e) => setQuery({ ...query, region: e.target.value })}
      >
        {' '}
        {avaiableCities?.map((city) => (
          <option value={city}>{city}</option>
        ))}
      </Select>
    </Stack>
  );
}
