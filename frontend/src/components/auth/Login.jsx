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
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/App.context";

const Login = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "please fill all the details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast({
        title: "error Occured",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
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

          <Box display={"flex"} alignItems={"center"} gap={3} my={3}>
            Don't have an Account{" "}
            <Box
              as="span"
              onClick={() => navigate("/signUp")}
              cursor={"pointer"}
              color={"purple"}
              textDecor={"underline"}
            >
              <Text>Sign up</Text>
            </Box>
            <Button
              my={2}
              variant={"solid"}
              backgroundColor={"blue.500"}
              color={"white"}
              onClick={submitHandler}
              isLoading={loading}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
