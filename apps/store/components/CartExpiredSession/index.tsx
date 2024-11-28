import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { FaTicketAlt } from "react-icons/fa";
import { useRouter } from "next/router";

export default function CartExpiredSession() {

  const router = useRouter();

  return (
    <Center h="100vh" bg="white.50">
      <Box textAlign="center" p={8} borderRadius="lg" >
        <Box fontSize="6xl" display='flex' justifyContent='center' textAlign={'center'} color="primary.500" mb={4}>
          <FaTicketAlt />
        </Box>
        <Heading mb={2}>Sessão Expirada</Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          O tempo para finalizar sua compra expirou.
        </Text>
        <Button onClick={() => router.push("/")}>
          Voltar para a Home
        </Button>
      </Box>
    </Center>
  );
}
