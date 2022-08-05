import type { NextPage } from "next";
import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório...")
    .email("Formato de e-mail inválido..."),
  password: yup.string().required("Password obrigatória..."),
});

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  // const {errors} = formState

  const handleSignin: SubmitHandler<FieldValues> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing={4}>
          <Input
            // name="email"
            type="email"
            label="E-mail"
            // error={errors.email}
            {...register("email")}
          />
          {errors.email && (
            <Text as="i" color="red.500">
              {errors.email.message}
            </Text>
          )}

          <Input
            // name="password"
            type="password"
            label="Password"
            // error={errors.password}
            {...register("password")}
          />
          {errors.password && (
            <Text as="i" color="red.500">
              {errors.password.message}
            </Text>
          )}
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;
