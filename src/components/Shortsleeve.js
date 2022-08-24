import React, { useEffect } from "react";
import ShortSleeve from "./Photo/ShortSleeveImage.jpg";
import { motion } from "framer-motion";
import {
  createCart,
  createCartProducts,
  getAllProductsByCategory,
  getAllCartProductsByCartId,
} from "../api";
import "../style/Shortsleeve.css";

const Shortsleeve = ({
  allProducts,
  setAllProducts,
  setCartSize,
  cartSize,
  allCartProducts,
  setAllCartProducts,
  productIdArray,
  setProductIdArray,
}) => {
  // function searchHoodieProducts(searchValue) {
  //     if (searchValue.length) {
  //       const data = allProducts.filter((item) => {
  //         return item.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.product_name.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.size.toLowerCase().includes(searchValue.toLowerCase())
  //           ? true
  //           : false;
  //       });

  //       data.length > 0
  //         ? setProductFilteredData(data)
  //         : setProductFilteredData([]);
  //     }
  //   }

  //   useEffect(() => {
  //     searchHoodieProducts(searchProducts);
  //   }, [searchProducts]);

  useEffect(() => {
    async function getShortSleeveProducts() {
      try {
        const allProductsByCategoryObject = await getAllProductsByCategory(
          "Short_Sleeve"
        );
        const allProductsByCategoryArray = allProductsByCategoryObject.products;
        setAllProducts(allProductsByCategoryArray);
      } catch (error) {
        throw error;
      }
    }
    getShortSleeveProducts();
  }, []);

  useEffect(() => {
    async function getShortSleeveCartProducts() {
      try {
        const cartId = localStorage.getItem("cartId");
        const cartProductsObject = await getAllCartProductsByCartId(cartId);
        const cartProducts = cartProductsObject.cart_productsbyid;
        setAllCartProducts(cartProducts);
      } catch (error) {
        throw error;
      }
    }
    getShortSleeveCartProducts();
  }, []);

  return (
    <motion.div
      className="ShortSleeveGrid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {allProducts.map((element, idx) => {
        return (
          <div
            key={`ShortSleeveContainer ${idx}`}
            className="ShortSleeveContainer"
          >
            <div>
              <b>{element.product_name}</b>
            </div>
            <img className="ShortSleeveImage" src={ShortSleeve} />
            <div className="ShortSleeveInfoContainer">
              <div>
                <b>Gender: </b>
                {element.gender}
              </div>
              <div>
                <b>Category: </b>
                {element.category}
              </div>
              <div>
                <b>Size: </b>
                {element.size}
              </div>
              <div>
                <b>Price: </b>
                {element.price}
              </div>
              <div>
                <b>InStock?: </b>
                {element.quantity_instock}
              </div>
              <div className="ShortSleeveAbout">
                <b>Description: </b>
                {element.description}
              </div>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    const cart_id = localStorage.getItem("cartId");
                    const userId = localStorage.getItem("id");
                    const quantity = 1;
                    const newpurchased = false;
                    if (!cart_id) {
                      const createdCart = await createCart(
                        userId,
                        newpurchased
                      );
                      localStorage.setItem("cartId", createdCart.newCart.id);
                      localStorage.setItem(
                        "purchased",
                        createdCart.newCart.purchased
                      );
                      const cartId = localStorage.getItem("cartId");
                      await createCartProducts(
                        userId,
                        cartId,
                        element.id,
                        quantity,
                        element.price
                      );
                      if (localStorage.getItem('productIdArray')){
                        productIdArray = JSON.parse(localStorage.getItem('productIdArray'))
                        productIdArray.push(element.id);
                      } else {
                        productIdArray.push(element.id)
                      }
                      const jsonProductIdArray = JSON.stringify(productIdArray)
                      localStorage.setItem('productIdArray', jsonProductIdArray)
                    } else {
                      if (localStorage.getItem("productIdArray") && (JSON.parse(localStorage.getItem("productIdArray"))).includes(element.id)) {
                        alert(`You are attempting to add a product which is already in your cart. If you would like to update the quantity of ${element.product_name}, please do so in your cart.`);
                      } else {
                        await createCartProducts(
                          userId,
                          cart_id,
                          element.id,
                          quantity,
                          element.price
                          );
                          if (localStorage.getItem('productIdArray')){
                            productIdArray = JSON.parse(localStorage.getItem('productIdArray'))
                            productIdArray.push(element.id);
                          } else {
                            productIdArray.push(element.id)
                          }
                          const jsonProductIdArray = JSON.stringify(productIdArray)
                          localStorage.setItem('productIdArray', jsonProductIdArray)
                      }
                    }
                    setCartSize(cartSize + 1);
                  } catch (error) {
                    throw error;
                  }
                }}
              >
                <button type="Submit" className="ShortSleeveButton">
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Shortsleeve;
