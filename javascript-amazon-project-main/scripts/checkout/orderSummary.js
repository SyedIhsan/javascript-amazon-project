import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js"; // named export
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; // default export
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {

    let cartHTML = "";
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId)
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM D");
    
        cartHTML += `
        <div class="cart-item-container cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">
    
                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity product-quantity-${matchingProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary
                        delete-link-${matchingProduct.id}" 
                        data-product-id="${matchingProduct.id}">
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
                </div>
        `;
    });
    
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
            const dateString = deliveryDate.format("dddd, MMMM D");
            const priceString = deliveryOption.priceCents === 0 ? "FREE Shipping" : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
            <div class="delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
                </div>
            </div>`
        });
    
        return html;
    }
    
    document.querySelector(".order-summary").innerHTML = cartHTML;
    
    document.querySelectorAll(".delete-quantity-link").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            removeFromCart(productId);
            const cartContainer = document.querySelector(`.cart-item-container-${productId}`);
            cartContainer.remove();
            renderPaymentSummary();
        });
    });
    
    document.querySelectorAll(".delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary(); // A function can call / re-run itself = recursion
            renderPaymentSummary();
        });
    });
};

// ESM Version | ESM - EcmaScript Module | (EcmaScript = JavaScript)

/*
1. Update the data
2. Regenerate all the HTML
= MVC (Model - View - Controller)

Model = saves and manages the data
View = takes the data and displays it on the page
Controller = runs some code when we interact with the page

MVC = makes sure the page always matches the data
MVC is a design pattern
*/