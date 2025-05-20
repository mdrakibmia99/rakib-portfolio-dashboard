"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LaptopIcon,
  ServerIcon,
  DatabaseIcon,
  CodeIcon,
  WrenchIcon,
  PaletteIcon,
} from "lucide-react";
import { JSX } from "react";

export const iconMap: Record<string, JSX.Element> = {
  LaptopIcon: <LaptopIcon className="h-6 w-6 text-blue-400" />,
  ServerIcon: <ServerIcon className="h-6 w-6 text-blue-400" />,
  DatabaseIcon: <DatabaseIcon className="h-6 w-6 text-blue-400" />,
  CodeIcon: <CodeIcon className="h-6 w-6 text-blue-400" />,
  WrenchIcon: <WrenchIcon className="h-6 w-6 text-blue-400" />,
  PaletteIcon: <PaletteIcon className="h-6 w-6 text-blue-400" />,
};



export default function SkillHighlights({skills}:{skills:any[]}) {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 xl:px-20 container mx-auto">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2">
          My Skills
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Skill Highlights
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills?.map((section) => (
          <Card
            key={section.title}
            className="bg-card !py-0 !gap-1 text-card-foreground shadow-md h-full"
          >
           <div className="p-6 flex items-center gap-3">
              <div>{iconMap[section.icon as any]}</div>
              <h3 className=" font-bold leading-none tracking-tight text-2xl">
                {section.title}
              </h3>
            </div>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="flex flex-wrap gap-2">
                {section.items.map((item:any) => (
                  <div
                    key={item.name}
                    className="border px-2.5 text-xs font-medium bg-secondary/50 text-secondary-foreground flex items-center gap-2 py-1.5 rounded-md"
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="size-5 rounded-sm object-cover"
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
