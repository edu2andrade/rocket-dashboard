import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

// Controlled components
// Uncontrolled components

// Imperative x Declarative

export function SearchBox() {
  // const [search, setSearch] = useState('')

  return (
    <Flex
      as="label"
      position="relative"
      flex="1"
      px="8"
      py="4"
      ml="6"
      maxW={400}
      alignSelf="center"
      color="gray.200"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Search"
        _placeholder={{ color: "gray.400" }}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
