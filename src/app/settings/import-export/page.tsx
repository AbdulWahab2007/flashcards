"use client";
import { useWords } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

export default function Page() {
  const { exportWords, importWords } = useWords();

  return (
    <div className="flex flex-col min-h-screen dark:bg-backgroundDark dark:text-white">
      <div className="w-full flex justify-center my-4">
        <div className="flex-col flex justify-center items-center rounded-xl w-[95%]">
          <Button
            onClick={exportWords}
            variant="outline"
            className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark shadow-none"
          >
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center py-4">
                <p className="font-poppins mx-2">Export</p>
              </div>
              <Upload className="!h-6 !w-6" />
            </div>
          </Button>
          <Button
            variant="outline"
            className="flex justify-between py-6 px-0 w-[93%] border-none dark:bg-backgroundDark shadow-none"
          >
            <input
              type="file"
              accept=".json"
              className="absolute w-[90%] bg-red-500 py-3 opacity-0"
              onChange={importWords}
            />
            <div className="flex w-full justify-between items-center dark:border-gray-600 border-borderColor border-t border-x-0">
              <div className="flex items-center py-4">
                <p className="font-poppins mx-2">Import</p>
              </div>
              <Download className="!h-6 !w-6" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
