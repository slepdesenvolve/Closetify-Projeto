
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    title: "Organize Your Wardrobe",
    description:
      "Upload and categorize your clothing items to keep track of everything you own.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wardrobe-600">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    title: "Automatic Classification",
    description:
      "Clothing items are automatically classified by type: tops, bottoms, shoes, and accessories.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wardrobe-600">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Personalized Profiles",
    description:
      "Create and customize your profile to make the most of your virtual wardrobe experience.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wardrobe-600">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-wardrobe-700 to-wardrobe-900 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="wardrobe-pattern h-full w-full"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Organize Your Wardrobe Digitally
            </h1>
            <p className="mb-8 text-xl text-wardrobe-100">
              Upload, categorize, and manage your clothing items all in one place.
              Your virtual closet awaits!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-wardrobe-800">
                    Go to My Wardrobe
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-wardrobe-800">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Everything You Need for Your Virtual Wardrobe
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-4 rounded-full bg-wardrobe-50 p-3 inline-flex">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-wardrobe-100 text-2xl font-bold text-wardrobe-600">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold">Create an Account</h3>
              <p className="text-gray-600">
                Sign up and create your personal profile to get started with your
                virtual wardrobe.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-wardrobe-100 text-2xl font-bold text-wardrobe-600">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold">Upload Your Items</h3>
              <p className="text-gray-600">
                Take photos of your clothing items and upload them to your virtual
                wardrobe with descriptions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-wardrobe-100 text-2xl font-bold text-wardrobe-600">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold">Organize & Manage</h3>
              <p className="text-gray-600">
                Your items will be automatically categorized, making it easy to
                browse and manage your collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-wardrobe-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Organize Your Wardrobe?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Join thousands of users who have already digitized their wardrobes and
            enjoy a more organized closet experience.
          </p>
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-4 text-xl font-bold">StyleStash</h3>
            <p className="mb-8 text-gray-400">
              Your virtual wardrobe management solution
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} StyleStash. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
