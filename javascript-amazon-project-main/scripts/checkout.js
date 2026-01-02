import { loadCart } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

async function loadPage() { // async = makes a function return a promise
  // Error Handling
  try {
    // throw "error1"; - manually create an error

    await loadProductsFetch();
  
    const value = await new Promise((resolve, reject) => {
      // throw "error2"; - 1st way to create an error in a promise
      loadCart(() => {
        // reject("error3"); - (2nd way) create an error in the future
        resolve("value3");
      });
    });
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });

}).then((value) => {

  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

/*
Async await is a shortcut for promises
await = lets us wait for a promise to finish, before going to the next line

We can only use await, when we're inside an async function
async await can only be used with promises

try/catch = can be used to catch errors in normal code
it's meant to handle unexpected errors (code is correct, outside our control)
*/