import { Button } from "./button";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useWords } from "@/app/context/globalContext";

export default function ThemeToggle() {
  const { isDarkMode, setIsDarkMode, isSystem, setIsSystem } = useWords();
  const darkMode = () => {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setIsDarkMode(true);
    setIsSystem(false);
  };
  const lightMode = () => {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setIsDarkMode(false);
    setIsSystem(false);
  };
  const systemMode = () => {
    localStorage.removeItem("theme");
    setIsSystem(true);
  };

  return (
    <div className="flex-col flex justify-center items-center rounded-xl w-[95%]">
      <Button
        onClick={lightMode}
        variant="outline"
        className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark"
      >
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center py-4">
            <Sun />
            <p className="font-poppins mx-2">Light</p>
          </div>
          {!isDarkMode && !isSystem && <Check className="!h-6 !w-6" />}
        </div>
      </Button>
      <Button
        onClick={darkMode}
        variant="outline"
        className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark"
      >
        <div className="flex w-full justify-between items-center dark:border-gray-600 border-borderColor border-t border-x-0">
          <div className="flex items-center py-4">
            <Moon />
            <p className="font-poppins mx-2">Dark</p>
          </div>
          {isDarkMode && !isSystem && <Check className="!h-6 !w-6" />}
        </div>
      </Button>
      <Button
        onClick={systemMode}
        variant="outline"
        className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark border-b-0"
      >
        <div className="flex w-full justify-between items-center dark:border-gray-600 border-borderColor border-t border-x-0">
          <div className="flex items-center py-4">
            <Monitor />
            <p className="font-poppins mx-2">System</p>
          </div>
          {isSystem && <Check className="!h-6 !w-6" />}
        </div>
      </Button>
    </div>
  );
}
