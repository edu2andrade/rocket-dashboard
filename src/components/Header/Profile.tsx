import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Eduardo Andrade</Text>
        <Text color="gray.300" fontSize="small">
          eduardo@andradept.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Eduardo Andrade"
        src="https://github.com/edu2andrade.png"
      />
    </Flex>
  );
}
