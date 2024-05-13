import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
//import { updateCheckoutCartQuantity } from './amazon.js';
import { cart } from '../data/cart.js';
import '../data/cart-class.js'
renderOrderSummary();
renderPaymentSummary();
//updateCheckoutCartQuantity();
export function updateCheckoutCartQuantity()
{
  let cartQuantity = 0 ;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-count-item").innerHTML = cartQuantity + ' items';
}
updateCheckoutCartQuantity();
