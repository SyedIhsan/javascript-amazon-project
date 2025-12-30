function Cart(localStorageKey) {
  const cart = {
      cartItems: undefined,
      loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      },
      saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
      },
      addToCart(productId, quantitySelector) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          };
        });
      
        if (matchingItem) {
          matchingItem.quantity += Number(quantitySelector) || 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: Number(quantitySelector) || 1,
            deliveryOptionId: "1",
          });
        };
      
        this.saveToStorage();
      },
      removeFromCart(productId) {
        const newCart = [];
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          };
        });
      
        this.cartItems = newCart;
        this.saveToStorage();
      },
      updateCartQuantity () {
        let cartQuantity = 0;
      
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
        });
        document.querySelector(".cart-quantity").innerHTML = cartQuantity
      },
      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          };
        });
      
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      } 
  };

  return cart;
};

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)