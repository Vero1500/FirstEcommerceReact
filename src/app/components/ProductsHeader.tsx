// components/products-header/ProductsHeader.tsx
import React, {useState, MouseEvent} from 'react';
import { Card, Menu, MenuItem, IconButton, Typography, Icon, Button } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type ProductsHeaderProps = {
  onSortUpdated: (sortOrder: 'asc' | 'desc') => void;
  onItemsUpdated: (count: number) => void;
  onColumnsUpdated: (columns: number) => void;
};

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  onSortUpdated,
  onItemsUpdated,
  onColumnsUpdated,
}) => {
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [itemsShowCount, setItemsShowCount] = useState<number>(12);
  const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [itemsMenuAnchorEl, setItemsMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleSortMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setSortMenuAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setSortMenuAnchorEl(null);
  };

  const handleItemsMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setItemsMenuAnchorEl(event.currentTarget);
  };
  const handleItemsMenuClose = () => {
    setItemsMenuAnchorEl(null);
  };

  const handleSortChange = (newSort: 'asc' | 'desc') => {
    setSort(newSort);
    onSortUpdated(newSort);
    handleSortMenuClose();
  };

  const handleItemsChange = (count: number) => {
    setItemsShowCount(count);
    onItemsUpdated(count);
    handleItemsMenuClose();
  };

  return (
    <Card sx={{ mb: 4, p: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Sort By Menu */}
        <div>
          <Button onClick={handleSortMenuOpen} endIcon={<ExpandMoreIcon/>}>
            Sort by {sort}
          </Button>
          <Menu anchorEl={sortMenuAnchorEl} open={Boolean(sortMenuAnchorEl)} onClose={handleSortMenuClose}>
            <MenuItem onClick={() => handleSortChange('desc')}>Desc</MenuItem>
            <MenuItem onClick={() => handleSortChange('asc')}>Asc</MenuItem>
          </Menu>
        </div>

        {/* Show Items Menu */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Button onClick={handleItemsMenuOpen} endIcon={<ExpandMoreIcon/>}>
              Show {itemsShowCount}
            </Button>
            <Menu anchorEl={itemsMenuAnchorEl} open={Boolean(itemsMenuAnchorEl)} onClose={handleItemsMenuClose}>
              <MenuItem onClick={() => handleItemsChange(12)}>12</MenuItem>
              <MenuItem onClick={() => handleItemsChange(24)}>24</MenuItem>
              <MenuItem onClick={() => handleItemsChange(36)}>36</MenuItem>
            </Menu>
          </div>

          {/* Column View Buttons */}
          <Button onClick={() => onColumnsUpdated(1)}>
            <ViewListIcon/>
          </Button>
          <Button onClick={() => onColumnsUpdated(3)}>
            <ViewModuleIcon/>
          </Button>
          <Button onClick={() => onColumnsUpdated(4)}>
            <ViewComfyIcon/>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductsHeader;
