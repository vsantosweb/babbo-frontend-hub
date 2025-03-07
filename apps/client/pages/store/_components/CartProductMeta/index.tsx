import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { FiGift } from 'react-icons/fi'
  
  export type CartProductMetaProps = {
    isGiftWrapping?: boolean
    name: string
    description: string
    image: string
  }
  
  export const CartProductMeta = (props: CartProductMetaProps) => {
    const { isGiftWrapping = true, image, name, description } = props
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontSize={'small'} fontWeight="medium">{name}</Text>
            <Text fontSize={'x-small'} color={mode('gray.600', 'gray.400')} fontSize="sm">R$ 60,00 </Text>
          </Stack>
          <Stack spacing="0.5">
            <Text fontSize={'small'} fontWeight="medium">{name}</Text>
            <Text fontSize={'x-small'} color={mode('gray.600', 'gray.400')} fontSize="sm">R$ 60,00 </Text>
          </Stack>
          {/* {isGiftWrapping && (
            <HStack spacing="1" mt="3" color={mode('gray.600', 'gray.400')}>
              <Icon as={FiGift} boxSize="4" />
              <Link fontSize="sm" textDecoration="underline">
                Add gift wrapping
              </Link>
            </HStack>
          )} */}
        </Box>
      </Stack>
    )
  }