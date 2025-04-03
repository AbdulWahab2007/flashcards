"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, Settings, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerTitle,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWords } from "@/app/context/globalContext";
import { usePathname } from "next/navigation";

export default function BottomMenu() {
  const { addWord } = useWords();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [active, setActive] = useState<number>(1);
  const pathname = usePathname();

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  };
  const handleAddWord = () => {
    const newTags = tagValue
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    addWord(newWord, newDefinition, newTags);

    setNewWord("");
    setNewDefinition("");
    setTagValue("");
    setIsAddDrawerOpen(false);
  };
  useEffect(() => {
    if (pathname === "/") {
      setActive(1);
    } else if (pathname.startsWith("/settings")) {
      setActive(2);
    }
  }, [pathname]);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-200 border-t border-purple-300 dark:border-white/10 dark:bg-backgroundDark/80 backdrop-blur-sm">
      <div className="flex justify-between items-center p-2 px-10 mx-auto">
        <Link href="/" className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-auto flex justify-center items-center hover:bg-purple-300 ${
              active == 1 && "bg-purple-300 px-2"
            }`}
          >
            <HomeIcon className="!h-6 !w-6 text-purple-600" />
            {active == 1 && (
              <p className="font-openSans font-extrabold text-purple-800">
                Home
              </p>
            )}
          </Button>
        </Link>

        <Drawer open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
          <DrawerTrigger
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-full"
            asChild
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full dark:bg-neutral-900 dark:text-white hover:text-white hover:bg-purple-800 bg-purple-800 text-white"
            >
              <Plus className="!h-6 !w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerTitle className="hidden"></DrawerTitle>
          <DrawerContent className="dark:bg-backgroundDark dark:text-white h-full bg-purple-100">
            <div className="mx-auto w-full max-w-sm p-6">
              <div className="space-y-4">
                <Input
                  placeholder="Enter word"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="dark:bg-zinc-900 border-purple-300 dark:text-white placeholder:text-zinc-400 font-opensans"
                />
                <Textarea
                  placeholder="Enter definition"
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  className="h-28 dark:bg-zinc-900 border-purple-300 dark:text-white placeholder:text-zinc-400 font-opensans"
                />
                <Input
                  placeholder="Enter tags. (separated by comma)"
                  value={tagValue}
                  onChange={handleTagsChange}
                  className="dark:bg-zinc-900 border-purple-300 dark:text-white placeholder:text-zinc-400 font-opensans"
                />
              </div>
              <div className="pt-6 pb-4 space-y-4">
                <Button
                  onClick={() => {
                    handleAddWord();
                  }}
                  className="w-full dark:bg-white dark:text-black bg-purple-800 hover:bg-white/90 font-poppins"
                >
                  Add Word
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full border border-purple-300 font-poppins"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <Link href="/settings" className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-auto flex justify-center items-center hover:bg-purple-300 ${
              active == 2 && "bg-purple-300 px-2"
            }`}
          >
            <Settings className="!h-6 !w-6 text-purple-600" />
            {active == 2 && (
              <p className="font-openSans font-bold text-purple-800">
                Settings
              </p>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}
