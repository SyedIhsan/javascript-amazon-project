class Cart {
    cartItems; // Public property
    #localStorageKey; // Private property: can only be accessed inside the class

    constructor(localStorageKey) { // setup code: runs when generate an objects
      this.#localStorageKey = localStorageKey;
      this.#loadFromStorage();
    }

    #loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }

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
    }

    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        };
      });
    
      this.cartItems = newCart;
      this.saveToStorage();
    }

    updateCartQuantity () {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      document.querySelector(".cart-quantity").innerHTML = cartQuantity
    }

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

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);