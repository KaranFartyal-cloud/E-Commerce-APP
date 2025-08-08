import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import React from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Promotion = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const products = [
    { id: 1, img: "./images/w-dress2.jpg", viewed: "1 viewed" },
    { id: 2, img: "./images/red-dress.jpg", viewed: "1 viewed" },
    { id: 3, img: "./images/w-dress3.jpg", viewed: "1 viewed" },
    { id: 4, img: "./images/w-dress4.jpg", viewed: "1 viewed" },
    { id: 5, img: "./images/w-dress5.jpg", viewed: "2 viewed" },
    { id: 6, img: "./images/w-dress6.jpg", viewed: "2 viewed" },
    { id: 7, img: "./images/w-dress7.jpg", viewed: "3 viewed" },
  ];

  return (
    <Box mx={5}>
      <Slider {...settings}>
        {products.map((item) => (
          <Box key={item.id} px={2}>
            <Card maxW="200px" backgroundColor="grey" mx="auto">
              <CardBody
                display="flex"
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Image
                  src={item.img}
                  boxSize="200px"
                  objectFit="cover"
                  borderRadius="md"
                  alt="Dress"
                />
                <Text>{item.viewed}</Text>
              </CardBody>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Promotion;
