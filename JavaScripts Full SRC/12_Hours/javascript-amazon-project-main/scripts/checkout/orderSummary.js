import { cart, removeFromCart,changeDateClick } from "../../data/cart.js";
import { products, getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
//import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions,getDeliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
//let countItem = 0;
let cartSumaryHTML = "";

// hello();
// const today = dayjs();
// const deliveryDate = today.add(7, "days");
// console.log(deliveryDate.format("dddd, MMMM D"));
export function renderOrderSummary()
{
cart.forEach((cartItem) => {
  const productId = cartItem.productId;


  const matchingProduct = getProducts(productId);


  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryOptions(deliveryOptionId);

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartSumaryHTML += `<div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
            <div class="delivery-date optionId${matchingProduct.id}" >
              Delivery date: ${dateString};
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-id=${matchingProduct.id}>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link 
                  "data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div> 
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                   ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOptions) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOptions.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOptions.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOptions.priceCents)}`;
    const isChecked = deliveryOptions.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option" data-product-id = "${
      matchingProduct.id
    }"
             data-delivery-option-id="${deliveryOptions.id}" ">
            <input type="radio"
            ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>`;
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSumaryHTML;

// document.querySelectorAll(".update-quantity-link").forEach((link) =>{
//   link.addEventListener("click", ()=>{
//     console.log("Hello");
//   });
// });


document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const data = link.dataset.productId;
    removeFromCart(data);
    const container = document.querySelector(`.js-cart-item-container-${data}`);
    container.remove();

    renderPaymentSummary();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    //  updateDeliveryOption(productId,deliveryOptionId);
    changeDateClick(deliveryOptionId, productId);
  });
});
}

//run
//renderOrderSummary();
// function changeDateClick(deliveryOption, productId) {
//   deliveryOptions.forEach((item) => {
//     if (deliveryOption === item.id) {
//       const today = dayjs();
//       const deliveryDate = today.add(item.deliveryDays, "days");
//       const dateString = deliveryDate.format("dddd, MMMM D");
//       document.querySelector(
//         `.optionId${productId}`
//       ).innerHTML = `Delivery date: ${dateString}`;
//     }
//   });
// }
