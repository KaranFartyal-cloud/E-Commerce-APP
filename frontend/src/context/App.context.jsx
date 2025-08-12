import { useStatStyles } from "@chakra-ui/react";
import { Children } from "react";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    const token = user.token;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "/api/cart/fetchCart",

        config
      );

      console.log(data.products);

      setCart(data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
