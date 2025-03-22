"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, Settings, Plus } from "lucide-react";
import { useState } from "react";
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

export default function BottomMenu() {
  const { addWord } = useWords();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [tagValue, setTagValue] = useState("");

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
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-400 dark:border-white/10 dark:bg-backgroundDark/80 backdrop-blur-sm">
      <div className="flex justify-between items-center p-2 mx-auto ">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 flex flex-col justify-center items-center hover:bg-transparent"
          >
            <HomeIcon className="!h-6 !w-6 -mb-2" />
            <p className="font-openSans">Home</p>
          </Button>
        </Link>

        <Drawer open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full dark:bg-neutral-900 dark:text-white hover:bg-transparent bg-gray-200 text-black"
            >
              <Plus className="!h-6 !w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerTitle className="hidden"></DrawerTitle>
          <DrawerContent className="dark:bg-backgroundDark dark:text-white h-full">
            <div className="mx-auto w-full max-w-sm p-6">
              <div className="space-y-4">
                <Input
                  placeholder="Enter word"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="dark:bg-zinc-900 border-borderColor dark:text-white placeholder:text-zinc-400 font-opensans"
                />
                <Textarea
                  placeholder="Enter definition"
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  className="h-28 dark:bg-zinc-900 border-borderColor dark:text-white placeholder:text-zinc-400 font-opensans"
                />
                <Input
                  placeholder="Enter tags. (separated by comma)"
                  value={tagValue}
                  onChange={handleTagsChange}
                  className="dark:bg-zinc-900 border-borderColor dark:text-white placeholder:text-zinc-400 font-opensans"
                />
              </div>
              <div className="pt-6 pb-4 space-y-4">
                <Button
                  onClick={() => {
                    handleAddWord();
                  }}
                  className="w-full dark:bg-white dark:text-black hover:bg-white/90 font-poppins"
                >
                  Add Word
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full border border-borderColor font-poppins"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <Link href="/settings">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 flex flex-col justify-center items-center hover:bg-transparent hover:border-none"
          >
            <Settings className="!h-6 !w-6 -mb-2" />
            <p className="font-openSans">Settings</p>
          </Button>
        </Link>

        {/* <NotificationComponent words={words} /> */}
      </div>
    </div>
  );
}
