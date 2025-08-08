import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !phone || !address) {
      toast({
        title: "Please fill all the details",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        //since we are only receiving json data
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        //we send the post request to this endpoint . see userRoutes.js
        "/api/user/register",
        { name, email, password, phone, address },
        config
      );
      setLoading(false);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        backgroundColor={"yellow"}
      >
        <Text fontSize={"3xl"}>Shop Sphere</Text>
      </Box>
      <Container
        my={3}
        maxW={"container.sm"}
        mx={"auto"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Box
          width={"80%"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <FormControl my={2}>
            <FormLabel>Name</FormLabel>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl my={2}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl my={2}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={!show ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <InputRightAddon
                onClick={() => setShow(!show)}
                cursor={"pointer"}
              >
                {show ? "hide" : "show"}
              </InputRightAddon>
            </InputGroup>
          </FormControl>

          <FormControl my={2}>
            <FormLabel>Phone</FormLabel>

            <Input type="text" onChange={(e) => setPhone(e.target.value)} />
          </FormControl>

          <FormControl my={2}>
            <FormLabel>Address</FormLabel>
            <Input type="text" onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <Box display={"flex"} alignItems={"center"} gap={3} my={3}>
            Already have an account{" "}
            <Box
              as="span"
              onClick={() => navigate("/login")}
              cursor={"pointer"}
              color={"purple"}
              textDecor={"underline"}
            >
              <Text>Sign in</Text>
            </Box>
            <Button
              my={2}
              variant={"solid"}
              backgroundColor={"blue.500"}
              color={"white"}
              onClick={submitHandler}
              isLoading={loading}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
