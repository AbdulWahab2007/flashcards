"use client";
import ThemeToggle from "@/components/ui/themeToggle";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-backgroundDark dark:text-white">
      <div className="w-full flex justify-center my-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
