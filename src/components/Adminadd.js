import React, { useState } from "react";
import { createProduct } from "../api";
import "../style/Adminadd.css";

const Adminadd = () => {
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    await createProduct(
      gender,
      category,
      productName,
      description,
      size,
      price,
      quantityInStock
    );
    setGender("")
    setCategory("")
    setProductName("")
    setDescription("")
    setSize("")
    setPrice(0)
    setQuantityInStock(0)
  }

  return (
    <div className="AdminAddContainer">
      <span>ADMIN ADD <img className="AddProductImage" src="https://sm.ign.com/ign_ap/screenshot/default/ashwins_78um.jpg" /> </span>
      <br></br>
      <br></br>
      <div>
        Add Product BELOW
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label>
            Gender{" "}
            <select
              className="select"
              name="gender"
              id="select-gender"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option>Mens</option>
              <option>Womens</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>
            Category{" "}
            <select
              className="select"
              name="category"
              id="select-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Short_Sleeve</option>
              <option>Long_Sleeve</option>
              <option>Sweater</option>
              <option>Hoodie</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>
            Product_Name{" "}
            <input
              type="text"
              className="input"
              name="name"
              id="input-name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Description{" "}
            <input
              type="text"
              className="input"
              name="description"
              id="input-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Size{" "}
            <select
              className="select"
              name="size"
              id="select-size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>
            Price {" $"}
            <input
              type="number"
              className="select"
              name="gender"
              id="input-price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Quantity_InStock{" "}
            <input
              type="number"
              className="select"
              name="gender"
              id="input-quantity"
              value={quantityInStock}
              onChange={(event) => setQuantityInStock(event.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Adminadd;
