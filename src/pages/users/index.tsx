import Link from "next/link";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { useQuery } from "@tanstack/react-query";


type Users = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function UserList() {
  const { data, isLoading, error } = useQuery(["users"], async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();

    const users = data.users.map((user: Users) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleString("pt-PT", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };
    });
    return users;
  }, {
    staleTime: 1000 * 5, // 5 segundos
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align={"center"}>
            <Heading size={"lg"} fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size={"sm"}
                fontSize="sm"
                colorScheme={"pink"}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo usuário
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Erro ao carregar a lista de usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme={"whiteAlpha"}>
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme={"pink"} />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de registro</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((user: Users) => {
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme={"pink"} />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight={"bold"}>{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      {isWideVersion && (
                        <Td>
                          <Button
                            as="a"
                            size={"sm"}
                            fontSize="sm"
                            colorScheme={"pink"}
                            leftIcon={<Icon as={RiPencilLine} fontSize="20" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
                    </Tr>;
                  })}
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
