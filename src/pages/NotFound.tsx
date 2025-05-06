
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-9xl font-bold text-wardrobe-600">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-lg text-gray-500">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
