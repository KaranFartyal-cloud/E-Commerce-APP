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
        justifyContent={"space-around"}
        alignItems={"center"}
        gap={"4"}
        width={"20%"}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/About"}>About</Link>
        <Link to={"/Contact-Us"}>
          <i className="fa-solid fa-phone" style={{ fontSize: "1.5rem" }}></i>
        </Link>
        <Link to={"/cart"}>
          <i
            className="fa-solid fa-cart-shopping"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </Link>
      </Box>
    </Box>
  );
};

export default header;
