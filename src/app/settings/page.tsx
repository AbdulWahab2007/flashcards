import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, Download, SunMoon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-backgroundDark dark:text-white">
      <div className="w-full flex justify-center my-4">
        <div className="flex-col flex justify-center items-center rounded-xl w-[95%]">
          <Button
            disabled
            variant="outline"
            className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark"
          >
            <Link href="/settings/notifications" className="w-full">
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center py-4">
                  <Bell />
                  <p className="font-poppins mx-2">Notifications</p>
                </div>
                <ChevronRight />
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark"
          >
            <Link href="/settings/import-export" className="w-full">
              <div className="flex w-full justify-between items-center dark:border-gray-600 border-borderColor border-t border-x-0">
                <div className="flex items-center py-4">
                  <Download />
                  <p className="font-poppins mx-2">Import/Export</p>
                </div>
                <ChevronRight />
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark"
          >
            <Link href="/settings/theme" className="w-full">
              <div className="flex w-full justify-between items-center dark:border-gray-600 border-borderColor border-t border-x-0">
                <div className="flex items-center py-4">
                  <SunMoon />
                  <p className="font-poppins mx-2">Theme</p>
                </div>
                <ChevronRight />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
