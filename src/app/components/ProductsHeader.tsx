// components/products-header/ProductsHeader.tsx
import React from 'react';
import { Card, Menu, MenuItem, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

type ProductsHeaderProps = {
  onColumnsCountChange: (cols: number) => void;
  onItemsCountChange: (count: number) => void;
  onSortChange: (sort: string) => void;
};

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  onColumnsCountChange,
  onItemsCountChange,
  onSortChange,
}) => {
  const [sort, setSort] = React.useState('desc');
  const [itemsShowCount, setItemsShowCount] = React.useState(12);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    onSortChange(newSort);
    handleMenuClose();
  };

  const handleItemsCountChange = (count: number) => {
    setItemsShowCount(count);
    onItemsCountChange(count);
  };

  const handleColumnCountChange = (cols: number) => {
    onColumnsCountChange(cols);
  };

  return (
    <Card sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Sort Options Menu */}
      <div>
        <IconButton onClick={handleMenuOpen}>
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleSortChange('asc')}>Sort Ascending</MenuItem>
          <MenuItem onClick={() => handleSortChange('desc')}>Sort Descending</MenuItem>
        </Menu>
      </div>

      {/* Items Per Page */}
      <div>
        <button onClick={() => handleItemsCountChange(12)}>12 Items</button>
        <button onClick={() => handleItemsCountChange(24)}>24 Items</button>
        <button onClick={() => handleItemsCountChange(36)}>36 Items</button>
      </div>

      {/* Column Layout Options */}
      <div>
        <button onClick={() => handleColumnCountChange(1)}>1 Column</button>
        <button onClick={() => handleColumnCountChange(3)}>3 Columns</button>
        <button onClick={() => handleColumnCountChange(4)}>4 Columns</button>
      </div>
    </Card>
  );
};

export default ProductsHeader;
