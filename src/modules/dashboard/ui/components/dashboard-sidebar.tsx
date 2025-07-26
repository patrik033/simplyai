"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";


import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";


const firstSection = [
    {
        label: "Meetings",
        href: "/meetings",
        icon: VideoIcon,
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    },


]

const secondSection = [
    {
        label: "Upgrade",
        href: "/upgrade",
        icon: StarIcon,
    },



]


const DasboardSidebar = () => {

    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} />
                    <p className="text-2xl font-semibold">Meet AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]" />

            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",

                                            pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 "
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]" />

                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",

                                            pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 "
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}

export default DasboardSidebar;