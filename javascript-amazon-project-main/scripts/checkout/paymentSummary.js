import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";


export function renderPaymentSummary() {

    let totalPrice = 0;
    let shippingPrice = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        totalPrice += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.priceCents;
    });

    const totalBeforeTax = totalPrice + shippingPrice;
    const taxRate = totalBeforeTax * 0.1;
    const totalOrder = totalBeforeTax + taxRate;

    const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxRate)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalOrder)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;

    document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;

    document.querySelector(".place-order-button").addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: { // headers gives the backend more information about our request
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart: cart
          })
        });
  
        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log("Unexpected error. Try again later.");
      }
      
      window.location.href = "orders.html";
    });
};