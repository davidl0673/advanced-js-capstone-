import React, { useState, useGlobal, useEffect } from "reactn";
import client from "../api/client";

const ShoppingListForm = props => {
  const [body, setBody] = useState("");
  const [items, setItems] = useState([]);
  const { 0: token } = useGlobal("token");

  // get the shopping list using useEffect
  const postShoppingList = async e => {
    e.preventDefault();

    const { data } = await client.post(
      "/shoppinglist",
      {
        item: body
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setBody("");

    setItems([...items, data]);
    // Add the new shopping list item to your local state

    if (props.onSuccess) props.onSuccess(data);
  };

  const getItems = async () => {
    const { data } = await client.get("/shoppinglist/");
    setItems(data);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="card1">
        <form onSubmit={postShoppingList}>
          <div>
            <input
              type="text"
              placeholder="some things you might need?"
              onChange={e => setBody(e.target.value)}
              value={body}
            />
          </div>
          <div>
            <button>Post</button>
            <div>
              {items.map(item => (
                <div key={item._id}>{item.item}</div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShoppingListForm;
