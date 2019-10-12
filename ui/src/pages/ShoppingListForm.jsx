import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";

const ShoppingList = () => {
  const [shoppinglist, setShoppingList] = useState([]);
  const { 0: token } = useGlobal("token");

  useEffect(() => {
    const getShoppingList = async () => {
      const { data } = await client.get("/shoppinglist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShoppingList(data);
    };

    getShoppingList();
  }, [token]);

  return <div>{shoppinglist}</div>;
};

export default ShoppingList;
