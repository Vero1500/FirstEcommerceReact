import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export class CartService {
  private localStorageKey = 'cart';
  private cartSubject = new BehaviorSubject<Cart>({ items: [] });
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  // Load cart from localStorage
  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem(this.localStorageKey);
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }

  // Get cart items from localStorage
  getCartItems(): CartItem[] {
    const cart = localStorage.getItem(this.localStorageKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Save the cart items to localStorage
  saveCartItems(cart: CartItem[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
  }


  // Add item to the cart
  addToCart(item: CartItem): void {
    const currentCart = this.cartSubject.value;
    const items = [...currentCart.items];
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    const updatedCart: Cart = { items };
    this.cartSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  // Save cart items to localStorage
  private saveCartToLocalStorage(cart: Cart): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
  }

  // Clear the cart
  clearCart(): void {
    this.cartSubject.next({ items: [] });
    localStorage.removeItem(this.localStorageKey);
  }

  // Get total price
  getTotal(): number {
    const currentCart = this.cartSubject.value;
    return currentCart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Remove item from cart
  removeFromCart(item: CartItem): void {
    const updatedItems = this.cartSubject.value.items.filter((_item) => _item.id !== item.id);
    this.cartSubject.next({ items: updatedItems });
    this.saveCartToLocalStorage({ items: updatedItems });
  }

  // Decrease the quantity of an item
  removeQuantity(item: CartItem): void {
    const updatedItems = this.cartSubject.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          return null; // Mark for removal
        }
      }
      return _item;
    }).filter(Boolean) as CartItem[]; // Filter out null items

    this.cartSubject.next({ items: updatedItems });
    this.saveCartToLocalStorage({ items: updatedItems });
  }
}
