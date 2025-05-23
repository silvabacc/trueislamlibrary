"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

export function NavigationBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-end mt-2 space-x-2">
      <Link href={"/studio"}>
        <Button className="cursor-pointer">Studio</Button>
      </Link>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
