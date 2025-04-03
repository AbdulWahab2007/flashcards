"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col dark:bg-backgroundDark dark:text-white bg-purple-100">
      <div className="flex w-full items-center py-4  border-b border-purple-300 dark:border-white/10 bg-purple-200">
        <Link
          onClick={() => router.back()}
          href="/"
          className="ml-2 text-purple-500"
        >
          <ArrowLeft />
        </Link>
        <p className="font-poppins text-2xl mx-2 text-purple-600">Settings</p>
      </div>
      {children}
    </div>
  );
}
