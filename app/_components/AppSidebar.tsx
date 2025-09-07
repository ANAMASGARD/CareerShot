import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Inbox, Search, Target, User2Icon } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "WorkSpace",
        url: "#",
        icon: Target,
    },
    {
        title: "AI Tools", 
        url: "#",
        icon: Inbox,
    },
    {
        title: "My History",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Billing",
        url: "#",
        icon: Search,
    },
    {
        title: "Profile",
        url: "#",
        icon: User2Icon,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar className="bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700">
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'/logo.png'} alt='logo' width={100} height={70}
                        className='w-full ' />
                    <h2 className='text-sm text-gray-400 dark:text-gray-500 text-center mt-3'>Build Awesome Skills</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-2'>
                            {items.map((item, index) => (
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200 
                                 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                                 ${path.includes(item.url) && 'bg-gray-200 dark:bg-slate-700'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 dark:text-gray-500 text-sm'>Made By Gaurav 💝</h2>
            </SidebarFooter>
        </Sidebar>
    )
}