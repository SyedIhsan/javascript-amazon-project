export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
};

export function addToCart(productId, quantitySelector) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    };
  });

  if (matchingItem) {
    matchingItem.quantity += Number(quantitySelector) || 1;
  } else {
    cart.push({
      productId: productId,
      quantity: Number(quantitySelector) || 1,
      deliveryOptionId: "1",
    });
  };

  saveToStorage();
};

export function updateCartQuantity () {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = cartQuantity
};

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    };
  });

  cart = newCart;
  saveToStorage();
};

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart))
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    };
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send(); 
};