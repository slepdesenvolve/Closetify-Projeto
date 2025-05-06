
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWardrobe } from "@/context/WardrobeContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.enum(["top", "bottom", "shoes", "accessory"], {
    required_error: "Please select a category.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  color: z.string().min(1, {
    message: "Please enter a color.",
  }),
  seasons: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one season.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const NewClothingForm = () => {
  const { addItem, isLoading } = useWardrobe();
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "top",
      description: "",
      color: "",
      seasons: [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload an image for your clothing item",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, you would upload the image to your server/storage here
      // For this mock, we'll just use the preview URL
      await addItem({
        userId: user?._id || "",
        name: values.name,
        category: values.category,
        description: values.description,
        color: values.color,
        season: values.seasons,
        imageUrl: imagePreview || "",
      });

      // Reset form after successful submission
      form.reset();
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Add New Clothing Item</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Blue T-Shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        <SelectItem value="shoes">Shoes</SelectItem>
                        <SelectItem value="accessory">Accessory</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Blue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seasons"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel>Seasons</FormLabel>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {["spring", "summer", "fall", "winter"].map((season) => (
                        <FormField
                          key={season}
                          control={form.control}
                          name="seasons"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={season}
                                className="flex flex-row items-center space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(season)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, season])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== season
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal capitalize">
                                  {season}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A comfortable cotton t-shirt"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full max-h-36 w-auto object-contain"
                  />
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
                  </>
                )}
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="absolute h-full w-full cursor-pointer opacity-0"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="mt-2"
                >
                  Remove Image
                </Button>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewClothingForm;
