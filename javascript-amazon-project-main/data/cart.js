export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    };
  });

  let quantitySelector = document.querySelector(`.quantity-selector-${productId}`).value
  if (matchingItem) {
    matchingItem.quantity += Number(quantitySelector);
  } else {
    cart.push({
      productId: productId,
      quantity: Number(quantitySelector),
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