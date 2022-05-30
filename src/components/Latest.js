import useFetch from "./useFetch";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

const Latest = () => {
  const { data, error } = useFetch("plates");
  console.log(data);

  return (
    <Flex height="20vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        background="cyan.100"
        p={12}
        rounded={6}
        height="25vh"
        width="500px"
      >
        <Text>Latest Entry and Exit</Text>
      </Flex>
    </Flex>
  );
};

export default Latest;
