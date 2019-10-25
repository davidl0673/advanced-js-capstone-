import React, { useState, useGlobal, useEffect } from "reactn";
import client from "../api/client";
import "./Component.css";

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

  const completeItem = async item => {
    await client.patch(
      "/shoppinglist/" + item._id,
      {
        ...item,
        completed: !item.completed
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    await getItems();
  };

  const deleteItem = async item => {
    await client.delete("/shoppinglist/" + item._id, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    await getItems();
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="card4">
        <h1>check some stuff you might need </h1>
        <form onSubmit={postShoppingList}>
          <div>
            <input
              type="text"
              placeholder="some things you might need?"
              onChange={e => setBody(e.target.value)}
              value={body}
            />
          </div>
          <button>Post</button>
        </form>
        <div>
          <div>
            {items.map(item => (
              <div>
                <div key={item._id}>{item.item}</div>
                <button onClick={() => completeItem(item)}>
                  {!item.completed ? "Completed" : "Not completed"}
                </button>
                <button onClick={() => deleteItem(item)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingListForm;
