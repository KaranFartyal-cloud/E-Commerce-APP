import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const header = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={14}
      gap={5}
      py={3}
      bgColor={"grey"}
    >
      <Image
        src="./images/logo.png"
        boxSize="50px"
        borderRadius="full"
        fit="cover"
      />
      <Box width={"75%"}>
        <InputGroup>
          <Input backgroundColor={"white"}></Input>
          <InputRightAddon>
            <SearchIcon />
          </InputRightAddon>
        </InputGroup>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"4"}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/About"}>About</Link>
        <Link to={"/Contact-Us"}>Contact-Us</Link>
      </Box>
    </Box>
  );
};

export default header;
