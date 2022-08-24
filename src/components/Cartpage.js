import React, { useEffect, useState } from "react";
import ProfileIconAccPage from "./Photo/ProfileIconAccPage.png";
import { NavLink, useNavigate } from "react-router-dom";
import ShortSleeveImage from "./Photo/ShortSleeveImage.jpg";
import LongSleeveImage from "./Photo/LongSleeveImage.jpg";
import SweaterImage from "./Photo/SweaterImage.jpg";
import HoodieImage from "./Photo/HoodieImage.jpg";
import TopSecretShirtLogo from "./Photo/TopSecretShirtLogo.png";
import WhiteTeeShirtSpecial from "./Photo/WhiteTeeShirtSpecial.png";
import { motion } from "framer-motion";
import "../style/Cartpage.css";
import {
  getAllCartProductsByCartId,
  updateCartProducts,
  deleteCartProducts,
  attachCartProductsToCart,
} from "../api";

const Cartpage = ({ allCartProducts, setAllCartProducts }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [updatedAllCartProducts, setUpdatedAllCartProducts] = useState([])
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      async function getCartProductsByCartId() {
        const cartId = localStorage.getItem("cartId");
        const cartProducts = await getAllCartProductsByCartId(cartId);
        setAllCartProducts(cartProducts.cart_productsbyid);
      }

      getCartProductsByCartId();
    } catch (error) {
      throw error;
    }
  }, [updatedAllCartProducts]);

  let subTotalCart = 0;
  let toFixedSubTotalCart = 0;
  let quantityCart = 0;

  if (allCartProducts.length > 0) {
    allCartProducts.forEach((element) => {
      subTotalCart += Number(
        (Number(element.price.substring(1)) * element.quantity).toFixed(2)
      );
      toFixedSubTotalCart = Number(subTotalCart.toFixed(2));
      quantityCart += element.quantity;
    });
  }

  return (
    <>
    <div>
        {!token ? (
          <>
            <a href="/register" className="loginSpecialImage">
              <img
                className="loginSpecialImage"
                src={WhiteTeeShirtSpecial}
                href="/register"
              />
            </a>
            <p className="loginSpecialText">
              You found the Top Secret Shirt! Click the shirt to receive 2% off
              your order. All you have to do is sign up.
            </p>
          </>
        ) : null}
      </div>
    <motion.div
      className="CartContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="CartHeader">Cart</div>
      <div className="CartContainerLeft">
        <div>
          {token ? (
            <div>
              Welcome Back {" "}
              {localStorage.getItem("first_name")}!
            </div>
          ) : (
            <div>Login to see your personalized cart.</div>
          )}
        </div>
        <img className="CartPic" src={ProfileIconAccPage} />
      </div>
      <div className="CartContainerRight">
        <div className="CartOrderDetails">
          <div className="CartOrderDetailsHeader">Order Details</div>
          <div className="CartOrderDetailsInfo">
            {allCartProducts.length > 0 ? (
              <span className="CartOrderDetailsInfo">
                <b>Sub-Total: </b>${toFixedSubTotalCart}
              </span>
            ) : (
              <>
                <span>
                  <b>No Items In Your Cart</b>
                </span>
                <br></br>
                <span className="CartOrderDetailsInfo">
                  <NavLink to="/shop">
                    <b>Go Shopping</b>
                  </NavLink>
                </span>
              </>
            )}
          </div>
          <div className="CartOrderDetailsInfo">
            Order Quantity: {quantityCart}
          </div>
          <div className="CartOrderDetailsInfo">
            {allCartProducts.length === 0 ? null : (
              <div>Expected Delivery: Soon™</div>
            )}
          </div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const cartId = localStorage.getItem("cartId");
              const myCart = await attachCartProductsToCart(cartId);
              navigate("/checkout");
            }}
          >
            {allCartProducts.length === 0 ? null : token ? (
              <button type="Submit" className="CartPageButton">
                Check Out
              </button>
            ) : (
              <>
                <button type="Submit" className="CartPageButton">
                  Check Out As Guest
                </button>
                <br></br>
                <span className="loginHereCartPage">
                  Already a Top Secret Member?
                </span>{" "}
                <NavLink to="/login" className="loginHereCartPage">
                  Login
                </NavLink>
                <p className="fineText">
                  Don't worry, we'll keep your cart safe.
                </p>
                <br></br>
                <span className="registerHereCartPage">
                  Become a Top Secret Member!
                </span>{" "}
                <NavLink to="/register" className="registerHereCartPage">
                  Register Here
                </NavLink>
                <p className="fineText">
                  Don't worry, we'll keep your cart safe.
                </p>
              </>
            )}
          </form>
        </div>
        <div className="CartOrderContainer">
          {allCartProducts.map((element, idx) => {
            return (
              <div key={`CartProducts ${idx}`}>
                <div className="CartProductContainer">
                  <div>
                    {element.product_id === 1 ? (
                      <img className="CartImages" src={ShortSleeveImage} />
                    ) : element.product_id === 2 ? (
                      <img className="CartImages" src={LongSleeveImage} />
                    ) : element.product_id === 3 ? (
                      <img className="CartImages" src={SweaterImage} />
                    ) : element.product_id === 4 ? (
                      <img className="CartImages" src={HoodieImage} />
                    ) : (
                      <img className="CartImages" src={TopSecretShirtLogo} />
                    )}
                  </div>
                  <div className="CartInfo">
                    <div className="CartText">Price: {element.price}</div>
                    <div className="CartText">
                      Order Quantity: {element.quantity}
                    </div>
                    <div>
                      {showUpdateForm != element.id ? (
                        <form
                          onSubmit={async (event) => {
                            event.preventDefault();
                            setShowUpdateForm(element.id);
                          }}
                        >
                          <button type="Submit">Update</button>
                        </form>
                      ) : (
                        <>
                          <form
                            onSubmit={async (event) => {
                              event.preventDefault();
                              setShowUpdateForm(null);
                              await updateCartProducts(element.id, quantity);
                              setUpdatedAllCartProducts(allCartProducts)
                            }}
                          >
                            <label>
                              Qty:{" "}
                              <select
                                className="UpdateCartProductsSelect"
                                name="size"
                                id="select-size"
                                value={quantity}
                                onChange={(event) => {
                                  setQuantity(event.target.value);
                                }}
                              >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                              </select>
                            </label>
                            <button type="submit">Update Product</button>
                          </form>
                          <form
                            onSubmit={() => {
                              setShowUpdateForm(null);
                            }}
                          >
                            <button type="submit">Cancel</button>
                          </form>
                        </>
                      )}
                    </div>
                    <form
                      onSubmit={async (event) => {
                        event.preventDefault();
                        const productIdArray = JSON.parse(
                          localStorage.getItem("productIdArray")
                        );
                        const filteredProductIdArray = productIdArray.filter(
                          (item) => {
                            if (item !== element.product_id) {
                              return item;
                            }
                          }
                        );
                        const JSONfilteredProductIdArray = JSON.stringify(
                          filteredProductIdArray
                        );
                        await deleteCartProducts(element.id);
                        localStorage.setItem(
                          "productIdArray",
                          JSONfilteredProductIdArray
                        );
                        setUpdatedAllCartProducts(allCartProducts)
                      }}
                    >
                      <button type="submit">Remove</button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Cartpage;
