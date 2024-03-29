import { useState } from "react";
import NextLink from "next/link";

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
  Link,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";


import { queryClient } from "../../services/queryClient";
import { useUsers } from "../../services/hooks/useUsers";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isSuccess, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align={"center"}>
            <Heading size={"lg"} fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size={"sm"}
                fontSize="sm"
                colorScheme={"pink"}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo usuário
              </Button>
            </NextLink>
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
                  { isSuccess ? (
                    data.users.map((user) => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme={"pink"} />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="gray.50" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight={"bold"}>{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.created_at}</Td>}
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
                      </Tr>
                    ))
                  ) : (null)
                  }
                </Tbody>
              </Table>

              <Pagination 
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
