"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface SubItemProps {
  title: string;
  url: string;
}

export interface ItemsProps {
  title: string;
  url: string;
  icon: LucideIcon;
  subItems?: SubItemProps[];
}

interface AppSidebarProps {
  items: ItemsProps[];
}

export function AppSidebar({ items }: AppSidebarProps) {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-6">
          <SidebarGroupLabel className="mt-6 flex justify-center pt-2">
            <Image
              src={logo}
              width={120}
              height={120}
              alt=""
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarHeader />

            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathName === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.subItems ? (
                      <Collapsible defaultOpen className="group/collapsible">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            data-active={isActive}
                            className="flex items-center justify-between py-8 hover:bg-[#560C5C] hover:text-zinc-50 active:hover:bg-[#560C5C] active:hover:text-zinc-50 data-[active=true]:bg-[#560C5C] data-[active=true]:text-zinc-50 data-[active=true]:hover:bg-[#560C5C] data-[state=open]:hover:bg-[#560C5C] data-[active=true]:hover:text-zinc-50 data-[state=open]:hover:text-zinc-50"
                          >
                            <Link href={item.url} className="flex items-center">
                              <item.icon className="mr-4 size-6" />
                              <span className="text-base font-semibold">
                                {item.title}
                              </span>
                            </Link>
                            <ChevronDown className="ml-2 size-4" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem
                                key={subItem.title}
                                data-active={pathName === subItem.url}
                                className="rounded-md py-2 hover:bg-[#560C5C] data-[active=true]:bg-[#560C5C] data-[active=true]:text-zinc-50"
                              >
                                <Link
                                  href={subItem.url}
                                  className="ml-6 text-sm text-zinc-50"
                                >
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        data-active={isActive}
                        className="py-5 hover:bg-[#560C5C] hover:text-zinc-50 active:hover:bg-[#560C5C] active:hover:text-zinc-50 data-[active=true]:bg-[#560C5C] data-[active=true]:text-zinc-50 data-[active=true]:hover:bg-[#560C5C] data-[state=open]:hover:bg-[#560C5C] data-[active=true]:hover:text-zinc-50 data-[state=open]:hover:text-zinc-50"
                      >
                        <Link href={item.url} className="flex items-center">
                          <item.icon className="mr-4 size-6" />
                          <span className="text-base font-semibold">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
