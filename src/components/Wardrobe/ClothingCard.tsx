
import React from "react";
import { ClothingItem } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useWardrobe } from "@/context/WardrobeContext";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ClothingCardProps {
  item: ClothingItem;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item }) => {
  const { deleteItem } = useWardrobe();
  const { t, language } = useLanguage();

  const categoryColors = {
    top: "bg-blue-100 text-blue-800",
    bottom: "bg-green-100 text-green-800",
    shoes: "bg-amber-100 text-amber-800",
    accessory: "bg-purple-100 text-purple-800",
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "top": return t.clothing.tops;
      case "bottom": return t.clothing.bottoms;
      case "shoes": return t.clothing.footwear;
      case "accessory": return t.clothing.accessories;
      default: return capitalizeFirstLetter(category);
    }
  };

  const getSeasonName = (season: string) => {
    switch (season) {
      case "spring": return t.clothing.spring;
      case "summer": return t.clothing.summer;
      case "fall": return t.clothing.fall;
      case "winter": return t.clothing.winter;
      default: return capitalizeFirstLetter(season);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge 
          className={`absolute right-2 top-2 ${categoryColors[item.category]} border-none`}
        >
          {getCategoryName(item.category)}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.season.map((season) => (
            <Badge key={season} variant="outline" className="text-xs">
              {getSeasonName(season)}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="text-xs"
            style={{ color: item.color, borderColor: item.color }}
          >
            {capitalizeFirstLetter(item.color)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 pt-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-red-500"
          onClick={() => deleteItem(item._id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClothingCard;
