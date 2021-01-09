import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";

export default  function Profile(){
    return (
        <HStack>
            <ArrowBackIcon/>
            <Text as="span" color="gray.400"> Results</Text>
        </HStack>
    )
}