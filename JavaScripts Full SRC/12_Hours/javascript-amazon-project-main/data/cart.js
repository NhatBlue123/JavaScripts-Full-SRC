export let cart = JSON.parse(localStorage.getItem("cart"));
import { deliveryOptions } from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '1'
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

let count = 0;

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}
export function removeFromCart(productId) {
  const newArray = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newArray.push(cartItem);
    }
  });
  cart = newArray;
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId)
{ 
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();  
}
export function changeDateClick(deliveryOption, productId) {
  deliveryOptions.forEach((item) => {
    if (deliveryOption === item.id) {
      const today = dayjs();
      const deliveryDate = today.add(item.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      document.querySelector(
        `.optionId${productId}`
      ).innerHTML = `Delivery date: ${dateString}`;
      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId)
          {
            cartItem.deliveryOptionId = deliveryOption;
          }
      })
      saveToStorage();

    }
  });
}