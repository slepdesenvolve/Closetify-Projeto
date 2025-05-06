
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import CategoryTab from "@/components/Wardrobe/CategoryTab";
import NewClothingForm from "@/components/Wardrobe/NewClothingForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-wardrobe-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Wardrobe</h1>
          <p className="text-gray-500">Manage your clothing items</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <NewClothingForm />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="wardrobe" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="wardrobe">My Items</TabsTrigger>
          <TabsTrigger value="outfits">My Outfits</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="wardrobe" className="mt-0">
          <CategoryTab />
        </TabsContent>

        <TabsContent value="outfits" className="mt-0">
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed">
            <h3 className="text-lg font-medium">Coming Soon</h3>
            <p className="text-sm text-gray-500">
              Create and manage your outfits
            </p>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed">
            <h3 className="text-lg font-medium">Coming Soon</h3>
            <p className="text-sm text-gray-500">
              View statistics about your wardrobe
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
