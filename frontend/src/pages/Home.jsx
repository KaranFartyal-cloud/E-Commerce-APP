import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Carousel from "../components/Carousel";
import { Box } from "@chakra-ui/react";
import Promotion from "../components/misc/Promotion";

const Home = () => {
  return (
    <>
      <Header />
      <Box>
        <Carousel />
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Promotion />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
