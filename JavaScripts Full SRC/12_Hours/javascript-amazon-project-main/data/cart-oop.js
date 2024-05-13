import { deliveryOptions } from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

function Cart(localStorageKey)
{
   
const cart = {
    cartItems: undefined,
  
    //method1
    loadFromStogare() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "1",
          },
        ];
      }
    },
  
    //method2
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    //method3
    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveToStorage();
    },
    
    //method4
    removeFromCart(productId) {
      const newArray = [];
  
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newArray.push(cartItem);
        }
      });
      this.cartItems = newArray;
     this.saveToStorage();
    },
     
    //method5
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
     this.saveToStorage();
    },
  
    //method6
    changeDateClick(deliveryOption, productId) {
      deliveryOptions.forEach((item) => {
        if (deliveryOption === item.id) {
          const today = dayjs();
          const deliveryDate = today.add(item.deliveryDays, "days");
          const dateString = deliveryDate.format("dddd, MMMM D");
          document.querySelector(
            `.optionId${productId}`
          ).innerHTML = `Delivery date: ${dateString}`;
          this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
              cartItem.deliveryOptionId = deliveryOption;
            }
          });
          this.saveToStorage();
          renderPaymentSummary();
        }
      });
    },
  };
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStogare();

businessCart.loadFromStogare();

console.log(cart);

console.log(businessCart);

