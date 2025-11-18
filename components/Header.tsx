"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, MessageSquare } from 'lucide-react';
import { Button } from "./ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                Dependency Hearing SMS
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Court Case Management System
              </span>
            </div>
          </Link>

          {/* Right side - Theme toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
