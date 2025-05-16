
export interface User {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
  }
  
  export interface ClothingItem {
    _id: string;
    userId: string;
    name: string;
    category: 'top' | 'bottom' | 'shoes' | 'accessory';
    description: string;
    color: string;
    season: string[];
    imageUrl: string;
    createdAt: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  