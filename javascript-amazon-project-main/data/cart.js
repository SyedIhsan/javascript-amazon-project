export const cart = [
  {
    productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    quantity: 2,
  },
  {
    productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity: 5,
  }
];

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
    });
  };
};

export function updateCartQuantity () {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".cart-quantity").innerHTML = cartQuantity
};