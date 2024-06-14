import React from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className={cn("text-3xl font-semibold", font.className)}>🔐 Auth</h1>

      <p className=" text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
