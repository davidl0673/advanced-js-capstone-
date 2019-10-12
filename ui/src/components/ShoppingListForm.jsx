import React, { useState, useGlobal } from "reactn";
import client from "../api/client";

const ShoppingListForm = props => {
  const [body, setBody] = useState("");
  const { 0: token } = useGlobal("token");

  const postShoppingList = async e => {
    e.preventDefault();

    const { data } = await client.post(
      "/shoppinglist",
      {
        body
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setBody("");

    if (props.onSuccess) props.onSuccess(data);
  };

  return (
    <div>
      <form onSubmit={postShoppingList}>
        <div>
          <input
            type="text"
            placeholder="shit you need?"
            onChange={e => setBody(e.target.value)}
            value={body}
          />
        </div>
        <div>
          <button>Post</button>
        </div>
      </form>
    </div>
  );
};

export default ShoppingListForm;
