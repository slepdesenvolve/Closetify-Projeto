
import React, { createContext, useState, useContext } from 'react';
import { toast } from '@/components/ui/use-toast';
import { ClothingItem } from '@/types';

interface WardrobeContextType {
  items: ClothingItem[];
  isLoading: boolean;
  addItem: (item: Omit<ClothingItem, '_id' | 'createdAt'>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItemsByCategory: (category: string) => ClothingItem[];
}

// Mock data for clothing items
const mockItems: ClothingItem[] = [
  {
    _id: '1',
    userId: '1',
    name: 'Blue T-Shirt',
    category: 'top',
    description: 'Comfortable cotton t-shirt',
    color: 'blue',
    season: ['spring', 'summer'],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    userId: '1',
    name: 'Black Jeans',
    category: 'bottom',
    description: 'Slim fit black jeans',
    color: 'black',
    season: ['fall', 'winter', 'spring'],
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    userId: '1',
    name: 'White Sneakers',
    category: 'shoes',
    description: 'Classic white sneakers',
    color: 'white',
    season: ['spring', 'summer', 'fall'],
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    userId: '1',
    name: 'Gold Necklace',
    category: 'accessory',
    description: 'Elegant gold necklace',
    color: 'gold',
    season: ['spring', 'summer', 'fall', 'winter'],
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: new Date().toISOString(),
  },
];

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

export const WardrobeProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ClothingItem[]>(mockItems);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = async (newItem: Omit<ClothingItem, '_id' | 'createdAt'>) => {
    setIsLoading(true);
    // Mock API call - would connect to your backend
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const item: ClothingItem = {
        ...newItem,
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      
      setItems([...items, item]);
      toast({
        title: 'Item added',
        description: 'Your item has been added to your wardrobe',
      });
    } catch (error) {
      toast({
        title: 'Failed to add item',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setItems(items.filter(item => item._id !== id));
      toast({
        title: 'Item removed',
        description: 'Your item has been removed from your wardrobe',
      });
    } catch (error) {
      toast({
        title: 'Failed to remove item',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getItemsByCategory = (category: string) => {
    return items.filter(item => item.category === category);
  };

  return (
    <WardrobeContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        deleteItem,
        getItemsByCategory,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = (): WardrobeContextType => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};
