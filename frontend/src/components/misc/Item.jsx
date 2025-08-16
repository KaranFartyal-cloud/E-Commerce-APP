import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";

const Item = ({
  name,
  price,
  quantity,
  productId,
  handleAdd,
  handleSub,
  image,
}) => {
  return (
    <div style={{ padding: "5px", backgroundColor: "blue" }}>
      <Box display={"flex"} alignItems={"flex-start"}>
        <Box width={"25%"}>
          <Image boxSize={"200px"} src={image} />
        </Box>

        <Box width={"60%"}>
          <Text
            fontSize={"2rem"}
            fontWeight={"600"}
            color={"black"}
            fontFamily={"'Noto Sans Georgian', 'sans-serif'"}
          >
            {name}
          </Text>
          <Box
            display={"flex"}
            justifyContent={"center"}
            width={"30%"}
            alignItems={"center"}
            backgroundColor={"#FFFFFF"}
            mt={10}
            padding={3}
            gap={5}
            border={"2px"}
            borderColor={"#FFD814"}
            borderRadius={"lg"}
          >
            <Button onClick={() => handleAdd(productId)}>+</Button>
            <Text>{quantity}</Text>
            <Button onClick={() => handleSub(productId)}>-</Button>
          </Box>
        </Box>

        <Box width={"15%"}>
          <Text
            fontSize={"3rem"}
            fontWeight={"600"}
            fontFamily={"'Noto Sans Georgian', 'sans-serif'"}
          >
            ${price}
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Item;
