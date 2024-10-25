// components/Header.tsx
import React, { useState } from 'react';
import { Cart } from '../models/cart';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography, Button, Divider, Link } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CartService } from '../services/cartService';

const cartService = new CartService();
type HeaderProps = {
  cart: Cart;
};

const Header: React.FC<HeaderProps> = ({ cart }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" sx={{ padding: '0 20px', display: 'flex', justifyContent: 'center' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
          E-commerce React
        </Link>

        {/* Cart Icon with Badge */}
        <IconButton color="inherit" onClick={handleMenuOpen}> 
          <Badge badgeContent={cart.items.length} color="error" invisible={!cart.items.length}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Menu with Cart Details */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <div style={{ padding: '16px', minWidth: '200px' }}>
            {/* Items Count and View Cart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Typography>{cart.items.length} Items</Typography>
              <Button variant='text' href="/cart" color="primary" size="small" onClick={handleMenuClose}>
                View Cart
              </Button>
            </div>

            {/* Divider */}
            <Divider />

            {/* Cart Items */}
            <div style={{ marginTop: '12px' }}>
              {cart.items.length ? (
                cart.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 300,
                      marginBottom: '8px',
                    }}
                  >
                    <span>{item.name} x {item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>${item.price.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <Typography variant="body2">No items in cart</Typography>
              )}
            </div>

            {/* Divider */}
            <Divider />

            {/* Total and Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', alignItems: 'center' }}>
              <Typography>Total:</Typography>
              <Typography sx={{ fontWeight: 600 }}>${cartService.getTotal().toFixed(2)}</Typography>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              {/* Clear Cart Button */}
              <IconButton
                onClick={() => {
                  // onClearCart();
                  handleMenuClose();
                }}
                sx={{ color: 'white', backgroundColor: '#d32f2f', ':hover': { backgroundColor: '#c62828' } }}
              >
                <RemoveShoppingCartIcon />
              </IconButton>

              {/* Go to Cart Button */}
              <IconButton
                href="/cart"
                sx={{ color: 'white', backgroundColor: '#388e3c', ':hover': { backgroundColor: '#2e7d32' } }}
                onClick={handleMenuClose}
              >
                <ShoppingCartIcon />
              </IconButton>
            </div>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;