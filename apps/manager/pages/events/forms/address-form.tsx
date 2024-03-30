import { useEffect, useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Stack,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { GoogleAutoComplete } from '@/components';
import { Search2Icon } from '@chakra-ui/icons';
import { UseFormReturn } from 'react-hook-form';

export default function AddressForm({ hookForm }: { hookForm: any }) {
  const {
    register,
    control,
    setValue,
    formState: { errors, isValid },
  } = hookForm;

  const [place, setPlace] = useState<any>();

  const address = place?.address_components;

  useEffect(() => {
    if (address?.length > 0) {
      setValue('place.zipcode', address[6]?.long_name || '', { shouldValidate: true });
      setValue('place.address_1', address[1]?.long_name || '', { shouldValidate: true });
      setValue('place.address_2', address[2]?.long_name || '', { shouldValidate: true });
      setValue('place.city', address[3]?.long_name || '', { shouldValidate: true });
      setValue('place.state', address[4]?.short_name || '', { shouldValidate: true });
      setValue('place.address_number', address[0]?.long_name || '', { shouldValidate: true });
    }
  }, [address, setValue]);

  return (
    <Stack>
      <GoogleAutoComplete captureAddress={setPlace}>
        <FormControl isInvalid={!!errors?.place?.full_address}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
              <Search2Icon />
            </InputLeftElement>
            <Input {...register('place.full_address')} placeholder="Digite o endereço" />
          </InputGroup>
          <FormErrorMessage>{errors?.place?.full_address?.message as string}</FormErrorMessage>
        </FormControl>
      </GoogleAutoComplete>

      {address?.length > 0 && (
        <Stack>
          <FormControl isInvalid={!!errors?.place?.name}>
            <FormLabel>Local</FormLabel>
            <Input
              {...register('place.name')}
              defaultValue={place?.name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.name?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.zipcode}>
            <FormLabel>CEP</FormLabel>
            <Input
              {...register('address.zipcode')}
              defaultValue={address[6]?.long_name}
              disabled={!!address[6]?.long_name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.zipcode?.message as string}</FormErrorMessage>
          </FormControl>



          <FormControl isInvalid={!!errors?.place?.address_1}>
            <FormLabel>Endereço</FormLabel>
            <Input
              {...register('address.address_1')}
              defaultValue={address[1]?.long_name}
              disabled={!!address[1]?.long_name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.address_1?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.address_2}>
            <FormLabel>Bairro</FormLabel>
            <Input
              {...register('address.address_2')}
              defaultValue={address[2]?.long_name}
              disabled={!!address[2]?.long_name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.address_2?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Complemento</FormLabel>
            <Input
              {...register('address.complement')}
              defaultValue={address[6]?.long_name}
              disabled={!!address[6]?.long_name}
              type="text"
            />
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.city}>
            <FormLabel>Cidade</FormLabel>
            <Input
              {...register('address.city')}
              defaultValue={address[3]?.long_name}
              disabled={!!address[3]?.long_name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.city?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.state}>
            <FormLabel>Estado</FormLabel>
            <Input
              {...register('address.state')}
              defaultValue={address[4]?.short_name}
              disabled={!!address[4]?.short_name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.state?.message as string}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.place?.state}>
            <FormLabel>Nº</FormLabel>
            <Input
              {...register('address.address_number')}
              defaultValue={address[0]?.long_name}
              disabled={!!address[0]?.long_name}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.address_number?.message as string}</FormErrorMessage>
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
}
