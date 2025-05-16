
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClothingCard from "./ClothingCard";
import { useWardrobe } from "@/context/WardrobeContext";
import { ShirtIcon, PantsIcon, ShoesIcon, WatchIcon } from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryIconProps {
  category: string;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className }) => {
  switch (category) {
    case "top":
      return <ShirtIcon className={className} />;
    case "bottom":
      return <PantsIcon className={className} />;
    case "shoes":
      return <ShoesIcon className={className} />;
    case "accessory":
      return <WatchIcon className={className} />;
    default:
      return null;
  }
};

const CategoryTab = () => {
  const { items } = useWardrobe();
  const { t } = useLanguage();
  
  const categories = [
    { id: "all", name: t.clothing.all },
    { id: "top", name: t.clothing.tops },
    { id: "bottom", name: t.clothing.bottoms },
    { id: "shoes", name: t.clothing.footwear },
    { id: "accessory", name: t.clothing.accessories },
  ];

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-6 w-full justify-start overflow-auto">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="flex items-center gap-2"
          >
            {category.id !== "all" && (
              <CategoryIcon category={category.id} className="h-4 w-4" />
            )}
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((item) => <ClothingCard key={item._id} item={item} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
              <h3 className="text-lg font-medium">{t.wardrobe.noItems}</h3>
              <p className="text-sm text-gray-500">
                {t.wardrobe.addItem}
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      {categories.slice(1).map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.filter(item => item.category === category.id).length > 0 ? (
              items
                .filter(item => item.category === category.id)
                .map((item) => <ClothingCard key={item._id} item={item} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
                <CategoryIcon category={category.id} className="mb-2 h-8 w-8 text-gray-400" />
                <h3 className="text-lg font-medium">{t.wardrobe.noItemsCategory.replace('{category}', category.name.toLowerCase())}</h3>
                <p className="text-sm text-gray-500">
                  {t.wardrobe.addItemCategory.replace('{category}', category.name.toLowerCase())}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTab;
