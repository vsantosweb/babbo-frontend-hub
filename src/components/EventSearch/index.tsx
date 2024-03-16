import { Box, Input, HStack, Text, Flex, InputGroup, InputLeftAddon, InputRightAddon, FormControl } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export const EventSearch = () => {
  return (
    <Flex flex={1} flexDirection="column" alignItems="center">
      <Box width="100%" maxW="600px">
        <FormControl>
          <Input placeholder='Pesquisar bares, shows, eventos...' />
          <Flex
            p={3}
            alignItems={'center'}
            position={'absolute'}
            top={0}
            bottom={0}
            right={'0'}
            border={'none'}
            color={'#000'}> <CiSearch/> </Flex>
        </FormControl>
        {/* <Input
          placeholder="Pesquisar eventos..."
          borderRadius="full"
          fontSize="lg"
          _placeholder={{ color: "gray.400" }}
          focusBorderColor="brand.500"

        /> */}
      </Box>
    </Flex>
  );
};

const CategoryCard = ({ title }: {title: string}) => {
  return (
    <Box
      px={4}
      py={2}
      bg="gray.100"
      borderRadius="md"
      _hover={{ bg: "gray.200", cursor: "pointer" }}
    >
      <Text fontSize="md">{title}</Text>
    </Box>
  );
};

