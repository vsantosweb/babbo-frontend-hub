import { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { GoogleAutoComplete } from '@/components';
import { Search2Icon } from '@chakra-ui/icons';

export default function AddressForm({ hookForm }: { hookForm: any }) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
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
  
  console.log(hookForm.getValues('place'), 'PLACEEE')
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

      { hookForm.getValues('place.full_address') && (
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
              {...register('place.zipcode')}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.zipcode?.message as string}</FormErrorMessage>
          </FormControl>



          <FormControl isInvalid={!!errors?.place?.address_1}>
            <FormLabel>Endereço</FormLabel>
            <Input
              {...register('place.address_1')}
              disabled={!!hookForm.getValues('place.address_1')}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.address_1?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.address_2}>
            <FormLabel>Bairro</FormLabel>
            <Input
              {...register('place.address_2')}
              disabled={!!hookForm.getValues('place.address_2')}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.address_2?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Complemento</FormLabel>
            <Input
              {...register('place.complement')}
              disabled={!!hookForm.getValues('place.complement')}
              type="text"
            />
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.city}>
            <FormLabel>Cidade</FormLabel>
            <Input
              {...register('place.city')}
              disabled={!!hookForm.getValues('place.city')}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.city?.message as string}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.place?.state}>
            <FormLabel>Estado</FormLabel>
            <Input
              {...register('place.state')}
              disabled={!!hookForm.getValues('place.city')}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.state?.message as string}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.place?.state}>
            <FormLabel>Nº</FormLabel>
            <Input
              {...register('place.address_number')}
              disabled={!!hookForm.getValues('place.address_number')}
              type="text"
            />
            <FormErrorMessage>{errors?.place?.address_number?.message as string}</FormErrorMessage>
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
}
