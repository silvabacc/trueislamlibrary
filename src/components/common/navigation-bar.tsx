"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Header from "./header";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

export function NavigationBar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div>
      <div className="space-x-2 flex justify-between items-center">
        <Header />
        <div className="space-x-2">
          {/* Studio - collapse to icon on small screens */}
          <Button
            className="cursor-pointer hidden sm:inline"
            onClick={() => router.push("/studio")}
          >
            Studio
          </Button>
          <Button
            className="cursor-pointer sm:hidden"
            size="icon"
            variant="ghost"
            title="Studio"
          >
            🛠️ {/* or a proper icon like <ToolIcon /> */}
          </Button>
          {/* Theme Toggle - keep as icon */}
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
      </div>
      <Separator className="mt-2 mb-8" />
    </div>
  );
}
