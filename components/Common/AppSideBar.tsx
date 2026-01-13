import { Calendar, Form, Home, Inbox, Search, Settings, Table } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Journal",
        url: "/Form",
        icon: Form,
    },
    {
        title: "Journal Table",
        url: "/table",
        icon: Table,
    },

]

export function AppSidebar() {
    return (
        <Sidebar className="" >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold">AJ TRADER</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-black">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}