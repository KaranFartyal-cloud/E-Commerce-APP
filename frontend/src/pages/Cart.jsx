import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Item from "../components/misc/Item";
import { useAppContext } from "../context/App.context";
import axios from "axios";
import { number } from "framer-motion";

const Cart = () => {
  const { user, cart, setCart, fetchCart, userCart, setUserCart } =
    useAppContext();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let val = 0;
    let val2 = 0;
    cart.forEach((element) => {
      val += element.quantity * element.product.price;
      val2++;
    });

    // console.log(cart);

    setTotalPrice(val);
    setTotalItems(val2);
  }, [cart]);

  const handleAdd = async (productId, quantity = 1) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/cart/addToCart",
        {
          productId,
          quantity,
        },
        config
      );

      //   console.log(data);
      fetchCart();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSub = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/cart/deleteFromCart",
        {
          cartId: userCart._id,
          productId: productId,
        },
        config
      );

      fetchCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Box width={"100%"}>
        <Header />
        <Box
          display={"flex"}
          bgColor={"beige"}
          mt={10}
          justifyContent={"space-between"}
          width={"100%"}
          ml={"30px"}
          gap={3}
        >
          <Box display={"flex"} flexDir={"column"} width={"70%"} gap={3}>
            {user ? (
              <>
                {cart.map((item) => (
                  <Item
                    name={item.product.name}
                    key={item._id}
                    price={item.product.price}
                    handleAdd={handleAdd}
                    handleSub={handleSub}
                    quantity={item.quantity}
                    productId={item.product._id}
                    image={item.product.image}
                  />
                ))}
              </>
            ) : (
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
              >
                <Text className="subHeading">Login to see your Cart</Text>
              </Box>
            )}{" "}
          </Box>

          <Box
            width={"20%"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            bgColor={"white"}
            borderRadius={"lg"}
            height={"200px"}
            mr={20}
            mt={6}
          >
            <Box
              mt={5}
              display={"flex"}
              alignItems={"center"}
              flexDir={"column"}
              width={"100%"}
            >
              <h2 className="subHeading">Subtotal ({totalItems}):</h2>
              <p className="normal-text">{totalPrice}</p>

              <Button bgColor={"#FFCE11"} width={"80%"} mt={5}>
                Proceed to buy
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
