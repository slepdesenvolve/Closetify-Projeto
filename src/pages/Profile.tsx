
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Navigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sun, Moon } from "lucide-react";
import { formatDate } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const Profile = () => {
  const { user, isLoading } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real app, you would update the user profile here
    toast({
      title: t.profile.profileUpdated,
    });
  };

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
      <h1 className="mb-8 text-3xl font-bold">{t.profile.myProfile}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t.profile.profileInfo}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.auth.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.clothing.namePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.auth.email}</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>{t.profile.darkMode}</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>{t.profile.language}</FormLabel>
                    </div>
                    <Select
                      value={language}
                      onValueChange={(value) => changeLanguage(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t.profile.english}</SelectItem>
                        <SelectItem value="pt">{t.profile.portuguese}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit">{t.general.save}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.profile.yourAvatar}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.profilePic} />
              <AvatarFallback className="bg-wardrobe-100 text-2xl text-wardrobe-700 dark:bg-wardrobe-800 dark:text-wardrobe-200">
                {user.name
                  .split(" ")
                  .map(part => part[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full">
              {t.profile.changeAvatar}
            </Button>
            <div className="w-full">
              <h3 className="font-medium">{t.profile.accountStats}</h3>
              <div className="mt-2 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span>{t.profile.totalItems}</span>
                  <span>0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.profile.memberSince}</span>
                  <span>{formatDate(new Date("2023-05-01"))}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
