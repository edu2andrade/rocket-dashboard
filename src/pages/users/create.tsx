import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "next/link";
import { useMutation } from '@tanstack/react-query'


import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Formato de e-mail inválido"),
  password: yup
    .string()
    .required("Password obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As passwords tem que ser iguais"),
});

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users',)
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={"8"}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <VStack display="flex" align="flex-start">
                <Input
                  // name="name"
                  label="Nome completo"
                  {...register("name")}
                />
                {errors.name && (
                  <Text as="i" color="red.500">
                    {errors.name.message}
                  </Text>
                )}
              </VStack>
              <VStack display="flex" align="flex-start">
                <Input
                  // name="email"
                  type="email"
                  label="E-mail"
                  {...register("email")}
                />
                {errors.email && (
                  <Text as="i" color="red.500">
                    {errors.email.message}
                  </Text>
                )}
              </VStack>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <VStack display="flex" align="flex-start">
                <Input
                  // name="password"
                  type="password"
                  label="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <Text as="i" color="red.500">
                    {errors.password.message}
                  </Text>
                )}
              </VStack>
              <VStack display="flex" align="flex-start">
                <Input
                  // name="password_confirmation"
                  type="password"
                  label="Confirmação de password"
                  {...register("password_confirmation")}
                />
                {errors.password_confirmation && (
                  <Text as="i" color="red.500">
                    {errors.password_confirmation.message}
                  </Text>
                )}
              </VStack>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme={"whiteAlpha"}>
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme={"pink"}
                isLoading={isSubmitting}
              >
                Guardar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
