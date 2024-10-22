// components/Header.tsx
import React from 'react';
import { Cart } from '../models/cart';

type HeaderProps = {
  cart: Cart;
};

const Header: React.FC<HeaderProps> = ({ cart }) => {
  return (
    <header>
      <h1>My Store</h1>
      <div>
        Cart ({cart.items.length} items)
      </div>
    </header>
  );
};

export default Header;
