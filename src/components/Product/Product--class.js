import React, { Component } from "react";
import "./Product.css";

const products = [
  {
    emoji: "🍦",
    name: "ice cream",
    price: 5,
  },
  {
    emoji: "🍩",
    name: "donuts",
    price: 2.5,
  },
  {
    emoji: "🍉",
    name: "watermelon",
    price: 4,
  },
];

export default class Product extends Component {
  state = {
    cart: [],
  };

  currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  getTotal = () => {
    const total = this.state.cart.reduce(
      (totalCost, item) => totalCost + item.price,
      0
    );
    return total.toLocaleString(undefined, this.currencyOptions);
  };

  add = (product) => {
    this.setState((state) => ({
      cart: [...state.cart, product],
      total: state.total + product.price,
    }));
  };

  remove = (product) => {
    this.setState((state) => {
      const cart = [...state.cart];
	  const productIndex = cart.findIndex(p => p.name === product.name);
	  if ( productIndex < 0) {
		  return;
	  }

      cart.splice(productIndex, 1);

      return {
        cart
      };
    });
  };

  render() {
    const { cart } = this.state;
    console.log({ cart });

    return (
      <div className="wrapper">
        <div>Shopping Cart: {cart.length} total items.</div>
        <div>Total: {this.getTotal()}</div>
        {products.map((product) => (
          <div className="product">
            <span role="img" aria-label={product.name}>
              {product.emoji}
            </span>
            <button onClick={() => this.add(product)}>Add</button>{" "}
            <button onClick={() => this.remove(product)}>Remove</button>
          </div>
        ))}
      </div>
    );
  }
}
