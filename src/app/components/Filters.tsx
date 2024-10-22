// components/filters/Filters.tsx
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StoreService from '../services/storeService'; // Simulate the service import

type FiltersProps = {
  onShowCategory: (category: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ onShowCategory }) => {
  const [categories, setCategories] = useState<string[]>([]);

  // Equivalent to ngOnInit in Angular
  useEffect(() => {
    let isMounted = true; // To avoid setting state on unmounted component
    const fetchCategories = async () => {
      const fetchedCategories = await StoreService.getAllCategories();
      if (isMounted) {
        setCategories(fetchedCategories);
      }
    };
    fetchCategories();

    // Cleanup function (ngOnDestroy)
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryClick = (category: string) => {
    onShowCategory(category);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h4>Categories</h4>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {categories.map((category) => (
            <ListItemButton component="li"  key={category} onClick={() => handleCategoryClick(category)}>
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filters;
