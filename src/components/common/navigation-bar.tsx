"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import TrueIslam from "@/components/icons/trueislam.ico";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export function NavigationBar() {
  const { setTheme } = useTheme();

  return (
    <div className="flex my-4">
      <Link
        className="flex flex-1 justify-center items-center ml-24 space-x-2 cursor-pointer"
        href="/"
      >
        <Image className="w-12 h-12 rounded" src={TrueIslam} alt="" />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          True Islam Library
        </h1>
      </Link>{" "}
      <div className="mt-2 space-x-2">
        <Link href={"/studio"}>
          <Button className="cursor-pointer">Studio</Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
