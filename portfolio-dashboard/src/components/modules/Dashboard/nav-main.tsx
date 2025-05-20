"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() => {
    // initialize state with active items open
    const state: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.items?.length) {
        state[item.title] = !!item.isActive;
      }
    });
    return state;
  });

  const toggleOpen = (title: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;
          const isOpen = openStates[item.title];

          return (
            <Collapsible key={item.title} open={isOpen} asChild>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild>
                    <button
                      className="flex w-full items-center justify-between"
                      onClick={() => {
                        if (hasChildren) {
                          toggleOpen(item.title);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {hasChildren && (
                        <ChevronRight
                          className={`transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasChildren && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item?.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
