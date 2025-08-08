import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Carousel from "../components/Carousel";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import Promotion from "../components/misc/Promotion";
import Section from "../components/misc/Section";

const Home = () => {
  return (
    <>
      <Header />
      <Box>
        <Carousel />
      </Box>
      <Box>
        <Heading ml={"20px"} my={"10px"} mb={"10px"}>
          Buy Women's Dress
        </Heading>
        <Promotion />
      </Box>

      <Footer />
    </>
  );
};

export default Home;
