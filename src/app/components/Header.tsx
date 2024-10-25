// components/Header.tsx
import React, { useState } from 'react';
import { Cart } from '../models/cart';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography, Button, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, BrowserRouter } from 'react-router-dom';


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
    // <header>
    //   <h1>My Store</h1>
    //   <div>
    //     Cart ({cart.items.length} items)
    //   </div>
    // </header>
    <AppBar position="static" sx={{ padding: '0 20px', display: 'flex', justifyContent: 'center' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <Typography variant="h6" component={Link} to="/home" color="inherit" sx={{ textDecoration: 'none' }}>
          E-commerce React
        </Typography> */}

        {/* Cart Icon with Badge */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Badge badgeContent={0} color="error" invisible={!0}>
            <ShoppingCartIcon />
          </Badge> 
          {/* <Badge badgeContent={itemsQuantity} color="error" invisible={!itemsQuantity}>
            <ShoppingCartIcon />
          </Badge> */}
        </IconButton>

        {/* Menu with Cart Details */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <div style={{ padding: '16px', minWidth: '200px' }}>
            {/* Items Count and View Cart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              {/* <Typography>{itemsQuantity} Items</Typography> */}
              <Typography> Items</Typography>
              <Button component={Link} to="/cart" color="primary" size="small" onClick={handleMenuClose}>
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
              {/* <Typography sx={{ fontWeight: 600 }}>${getTotal(cart.items).toFixed(2)}</Typography> */}
              <Typography sx={{ fontWeight: 600 }}>TOTAL</Typography>
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
                component={Link}
                to="/cart"
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
