import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";

interface FormData {
  organizer_name: string
  organizer_document: string
  organizer_email: string
  organizer_phone: string
  organizer_description: string
  holder_name: string
  holder_type: string
  holder_document: string
  bank: string
  bank_agency: string
  bank_account_number: string
  bank_check_digit: string
  bank_pix_key: string
}
import { cpfValidator } from '@/tools/documentValidator'
import { GroupBase, OptionsOrGroups, Select } from "chakra-react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import container from "@/repository/Services/container";
import { CustomerRegisterRepositoryInterface } from "@/repository/Interfaces";
import { useRouter } from "next/router";

const customerRegisterService = container.get<CustomerRegisterRepositoryInterface>('customer-register');

const OrganizerSetupPage = () => {

  const [bankOptions, setBankOptions] = useState<OptionsOrGroups<string, GroupBase<string>>>([])
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });


  useEffect(() => {
    getbankOptions()
  }, [])

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);

    await customerRegisterService.basicOrganizerRegister(data).then(response => {
      toast({
        status: 'success',
        title: 'Perfil configurado',
        description: 'Seu perfil de organizador foi configurado'
      });

      router.push('/events/create');

    }).catch(() => {
      toast({
        status: 'error',
        title: 'Ocorreu um erro no servidor',
        description: 'Nossa equipe está verificando o problema'
      });
    })

  };

  const getbankOptions = async () => {

    const response = await axios.get('https://brasilapi.com.br/api/banks/v1');

    const options = response.data.map((bank: Record<string, any>) => ({
      label: `${bank.code} - ${bank.name}`,
      value: bank.code
    })).filter((bank: Record<string, any>) => bank.value !== null);

    setBankOptions(options)

  }


  return (
    <Flex
      borderRadius="2xl"
      boxShadow='lg'
      minH="100%" h='auto' width="100%" align="center" justify="center">
      <Box
        boxShadow='xl'
        bg="white"
        width={{ xs: "100%", md: "80%" }}
        maxW="1200px"
        borderRadius="2xl"
        display="flex"
      >

        <Box flex="1" p={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Complete seu Perfil de Organizador
          </Text>
          <Text mb={4} fontSize={"sm"}>
            O cadastro para organizadores ainda está limitado! Faça seu cadastro agora mesmo e seja um
            dos primeiros a promover seus eventos no Babbo.
          </Text>
          <VStack spacing={4} align="stretch" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.organizer_name}>
              <FormLabel>Nome da Organização</FormLabel>
              <Input
                maxLength={50}
                placeholder="Digite o nome da sua organização"
                {...register('organizer_name', { required: "Este campo é obrigatório." })}
              />
              <FormErrorMessage>{errors.organizer_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" isInvalid={!!errors.organizer_email}>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                {...register("organizer_email", {
                  required: "Este campo é obrigatório.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "E-mail inválido.",
                  },
                })}
              />
              <FormErrorMessage>{errors.organizer_email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.organizer_phone}>
              <FormLabel>Celular/WhatsApp</FormLabel>
              <Input
                as={InputMask}
                alwaysShowMask={false}
                maskChar={null}
                placeholder="(99) 99999-9999"
                mask="(99) 99999-9999"
                {...register("organizer_phone", {
                  required: "Este campo é obrigatório.",
                  setValueAs: v => v.replace(/\D/g, ''),
                })}
              />
              <FormErrorMessage>{errors.organizer_phone?.message}</FormErrorMessage>
            </FormControl>

            {/* <FormControl>
              <FormLabel>Perfil do Instagram (opcional)</FormLabel>
              <FormHelperText>Importante para deixar seu perfil mais completo</FormHelperText>
              <Input
                maxLength={50}
                placeholder="https://instagram.com"
                {...register("socialLink", {
                  pattern: {
                    value: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._%-]+$/,
                    message: "Link inválido.",
                  },
                })}
              />
              {errors.socialLink && (
                <Text color="red.500" fontSize="sm">
                  {errors.socialLink.message}
                </Text>
              )}
            </FormControl> */}

            {/* <FormControl id="description">
              <FormLabel>Descrição</FormLabel>
              <Textarea placeholder="Fale um pouco sobre sua organização" {...register("description")} />
            </FormControl> */}

            <Divider />

            <Heading size="sm">Conta bancária</Heading>

            <FormControl isInvalid={!!errors.organizer_document}>
              <FormLabel>CPF</FormLabel>
              <Input
                as={InputMask}
                alwaysShowMask
                placeholder="999.999.999-99"
                mask="999.999.999-99"
                {...register("organizer_document", {
                  required: "Este campo é obrigatório.",
                  validate: cpfValidator,
                  setValueAs: v => v.replace(/\D/g, '')
                })}
              />
              <FormErrorMessage>{errors.organizer_document?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.bank}>
              <FormLabel>Banco</FormLabel>
              <Controller
                name='bank'
                rules={{ required: 'Campo obrigatório.' }}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={bankOptions} />
                )}
              />
              <FormErrorMessage>{errors?.bank?.message as string}</FormErrorMessage>
            </FormControl>

            <HStack>
              <FormControl flex="2" id="agency" isInvalid={!!errors.bank_agency}>
                <FormLabel>Agência</FormLabel>
                <Input
                  placeholder="000000"
                  {...register("bank_agency", { required: "Este campo é obrigatório." })}
                />
              </FormControl>

              <FormControl flex="3" id="account" isInvalid={!!errors.bank_account_number}>
                <FormLabel>Conta</FormLabel>
                <Input
                  placeholder="0000000000"
                  {...register("bank_account_number", { required: "Este campo é obrigatório." })}
                />
              </FormControl>

              <FormControl flex="1" isInvalid={!!errors.bank_check_digit}>
                <FormLabel>Dígito</FormLabel>
                <Input placeholder="00"{...register("bank_check_digit", { required: true })} />

              </FormControl>
            </HStack>

            <FormControl isInvalid={!!errors.bank_pix_key}>
              <FormLabel>Chave Pix</FormLabel>
              <Input
                placeholder="Digite sua chave Pix"
                {...register("bank_pix_key")}
              />
              <FormErrorMessage>{errors?.bank_pix_key?.message as string}</FormErrorMessage>

            </FormControl>

            <Button type="submit" mt={4} colorScheme="black">
              Continuar
            </Button>

          </VStack>
        </Box>

        <Box flex="1" bg="primary.500" borderRightRadius="2xl" color="white" p={8} display="flex" flexDirection="column" justifyContent="center">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Por que usar nossa plataforma?
          </Text>
          <VStack spacing={4} align="start">
            <Text>✅ Simplifique a gestão de eventos e ingressos.</Text>
            <Text>✅ Alcance mais participantes com nossas ferramentas de marketing.</Text>
            <Text>✅ Gerencie vendas e relatórios com facilidade.</Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default OrganizerSetupPage;
