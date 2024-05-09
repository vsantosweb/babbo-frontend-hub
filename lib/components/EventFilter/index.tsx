import { Box, Button, Flex, HStack, Select, Stack } from '@chakra-ui/react';

import { Input } from '@chakra-ui/react';
import { DatePickerDialog } from '@/components';
import { theme } from '@/themes/default';
import { useEvent, useQueryString } from '@/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

type MixedObjectType = { [index: string]: any };

export function EventFilter() {
  const [categories, setCategories] = useState<MixedObjectType[]>([]);

  const [avaiableCities, setAvaiableCities] = useState([]);

  const { fetchEvents, fetchCategories, fetchAvaiableCities } = useEvent();
  const { query, setQuery, parsed, clearQueryString } = useQueryString();
  const router = useRouter();

  const { reset, register } = useForm();
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
      borderRadius={theme.defaultRadius}
      direction={{ base: 'column', md: 'row' }}
      zIndex={2}
      justifyContent={'center'}
      className='app-wrapper'
    >
      <Stack flexDirection={{base: 'column', md: 'row'}} as={'form'}>
        <Box width={'100%'}>
          {/* <DatePickerDialog /> */}
          <Input {...register('date')} onChange={e => setQuery({ ...query, date_range: e.target.value })} type='date' />
        </Box>
        <Select
          placeholder="Categoria"
          {...register('event_category_id')}
          onChange={(e) => setQuery({ ...query, event_category_id: e.target.value })}
        >
          {categories?.map((category: MixedObjectType) => (
            <option value={category?.id}>{category?.name}</option>
          ))}
        </Select>
        <Select
          {...register('region')}
          placeholder="Onde?"
          onChange={(e) => setQuery({ ...query, region: e.target.value })}
        >
          {' '}
          {avaiableCities?.map((city: Record<string, any>) => (
            <option value={city.city}>{city.city}</option>
          ))}
        </Select>
        <Box >
          {!_.isEmpty(router.query) && <Button w={'100%'} onClick={() => { clearQueryString(), reset() }} variant={'outline'}>Limpar filtros</Button>}
        </Box>
      </Stack>
    </Stack>
  );
}
