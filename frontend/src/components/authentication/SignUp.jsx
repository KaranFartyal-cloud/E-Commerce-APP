import {
  Box,
  Button,
  Container,
  Field,
  Input,
  Text,
  Toaster,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toaster } from "../ui/toaster";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = async () => {
    if (!name || !email || !phone || !password || !address) {
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
        { name, email, phone, password, address },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      console.log("user has been created ");
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <Container sizemaxW={"xl"} centerContent>
      <Box display={"flex"} justifyContent={"center"} p={3} w={"100%"}>
        <Text fontFamily={"Poppins"} fontSize={"3rem"}>
          Shop Sphere
        </Text>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        width={"75%"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Box bg={"white"} w={"100%"} p={4} width={"75%"}>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              placeholder="John Doe"
              pl={3}
              onChange={(e) => setName(e.target.value)}
            />

            <Field.Label>Email</Field.Label>
            <Input
              placeholder="me@example.com"
              pl={3}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Field.Label>Password</Field.Label>
            <Input
              placeholder="12345678"
              pl={3}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Field.Label>Phone</Field.Label>
            <Input
              placeholder="+91 1987654321"
              pl={3}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Field.Label>Address</Field.Label>
            <Input
              placeholder="test street"
              pl={3}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Field.Root>

          <Box display={"flex"} justifyContent={"center"} gap={3} marginTop={3}>
            <Text
              onClick={goToLogin}
              cursor={"pointer"}
              color={"purple.950"}
              _hover={{ color: "purple" }}
            >
              Already have an account??
            </Text>
            <Button px={3} onClick={submitHandler}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
