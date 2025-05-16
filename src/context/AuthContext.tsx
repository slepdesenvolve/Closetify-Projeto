
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { User, AuthContextType } from '@/types';

// Temporary mock API client for authentication
const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    // This is a mock implementation - would connect to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && password === 'password') {
          resolve({
            _id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  register: async (name: string, email: string, password: string): Promise<User> => {
    // This is a mock implementation - would connect to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          _id: '1',
          name,
          email,
        });
      }, 1000);
    });
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('wardrobeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await authApi.login(email, password);
      setUser(user);
      localStorage.setItem('wardrobeUser', JSON.stringify(user));
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await authApi.register(name, email, password);
      setUser(user);
      localStorage.setItem('wardrobeUser', JSON.stringify(user));
      toast({
        title: 'Registration successful',
        description: 'Your account has been created',
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wardrobeUser');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
