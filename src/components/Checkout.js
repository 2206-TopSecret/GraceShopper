import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { attachCartProductsToCart } from "../api";
import ShortSleeveImage from "./Photo/ShortSleeveImage.jpg";
import LongSleeveImage from "./Photo/LongSleeveImage.jpg";
import SweaterImage from "./Photo/SweaterImage.jpg";
import HoodieImage from "./Photo/HoodieImage.jpg";
import TopSecretShirtLogo from "./Photo/TopSecretShirtLogo.png";
import "../style/Checkout.css";

const Checkout = ({ cartSize, setCartSize }) => {

  const [myCart, setMyCart] = useState(null);
  const token = localStorage.getItem("token");
  let orderNumber = Number(Math.random().toString().substring(2));
  const navigate = useNavigate();

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    async function getMyCart() {
      const myFuncCart = await attachCartProductsToCart(cartId);
      setMyCart(myFuncCart);
    }
    getMyCart();
  }, []);

  let cartPageGrandTotal = 0;
  let toFixedSubTotal = 0;
  let toFixedSavings = 0;
  let toFixedTax = 0;
  let toFixedCartPageGrandTotal = 0;

  if (myCart) {
    myCart.newCart.forEach((element) => {
      cartPageGrandTotal += Number(
        (Number(element.price.substring(1)) * element.quantity).toFixed(2)
      );
      toFixedSubTotal = Number(cartPageGrandTotal.toFixed(2))
      toFixedTax = Number((cartPageGrandTotal.toFixed(2) * .045).toFixed(2));
      toFixedCartPageGrandTotal = Number((toFixedSubTotal + toFixedTax).toFixed(2));
    });
    if (token) {
      toFixedSavings = Number((Number(cartPageGrandTotal.toFixed(2)) * .02).toFixed(2))
      toFixedCartPageGrandTotal = toFixedSubTotal + toFixedTax - toFixedSavings
    }
  }

  return (
    <>
      <div className="CheckoutContainer">
      <div className="CheckoutCartProducts">
        {myCart
          ? myCart.newCart.map((element, idx) => {
              return (
                <div className="CheckoutCartProductsContainer" key={`Checkout ${idx}`}>
                  <div className="CheckoutImages">
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
                  <br></br>
                  <p>
                    <b>Price:</b> {element.price}
                  </p>
                  <p>
                    <b>Quantity:</b> {element.quantity}
                  </p>
                </div>
              );
            })
          : null}
      </div>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setCartSize(0);
          localStorage.removeItem('cartId')
          localStorage.removeItem('productIdArray')
          localStorage.setItem('purchased', true)
          localStorage.setItem('orderNumber', orderNumber)
          navigate("/purchase");
        }}
        className="GrandTotalCheckout"
      >
        <h1>Sub Total:</h1>
        <h2>$ {toFixedSubTotal}</h2>
        <h1>Tax: </h1>
        <h2>$ {toFixedTax}</h2>
        <h1>Savings: </h1>
        <h2>($ {toFixedSavings})</h2>
        <h1>Grand Total: </h1>
        <h2>$ {toFixedCartPageGrandTotal}</h2>
        <div>
          {token ? (
            <>
              <button type="submit" className="CheckoutPageButton">
                Purchase
              </button>
              <br></br>
              <NavLink to="/cartpage">Back to Cart</NavLink>
            </>
          ) : (
            <>
              <button type="submit" className="CheckoutPageButton">
                Purchase As Guest
              </button>
              <br></br>
              <NavLink to="/cartpage">Back to Cart</NavLink>
              <br></br>
              <NavLink to="/login">Login</NavLink>
              <br></br>
              <NavLink to="/register">Become a Member Today</NavLink>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Checkout;
