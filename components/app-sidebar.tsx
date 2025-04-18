'use client';

import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChevronUp,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    User2
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@/components/ui/sidebar';
import ModeToggle from './ui/modeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './ui/dropdown-menu';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/vercel.svg'
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise'
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup'
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free'
        }
    ],
    navMain: [
        {
            title: 'Discount Types',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            // items: [
            //     {
            //         title: 'History',
            //         url: '#'
            //     },
            //     {
            //         title: 'Starred',
            //         url: '#'
            //     },
            //     {
            //         title: 'Settings',
            //         url: '#'
            //     }
            // ]
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Genesis',
                    url: '#'
                },
                {
                    title: 'Explorer',
                    url: '#'
                },
                {
                    title: 'Quantum',
                    url: '#'
                }
            ]
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#'
                },
                {
                    title: 'Get Started',
                    url: '#'
                },
                {
                    title: 'Tutorials',
                    url: '#'
                },
                {
                    title: 'Changelog',
                    url: '#'
                }
            ]
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#'
                },
                {
                    title: 'Team',
                    url: '#'
                },
                {
                    title: 'Billing',
                    url: '#'
                },
                {
                    title: 'Limits',
                    url: '#'
                }
            ]
        }
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map
        }
    ]
};

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const shouldShowSidebar = !pathname.includes('/login');

    const sidebar = (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center justify-between">
                    <ModeToggle></ModeToggle>
                    <div className="w-full">
                        <SidebarFooter>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton>
                                                <User2 /> Username
                                                <ChevronUp className="ml-auto" />
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            side="top"
                                            className="w-[--radix-popper-anchor-width]"
                                        >
                                            <DropdownMenuItem>
                                                <span>Account</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Billing</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Sign out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );

    return shouldShowSidebar ? sidebar : null;
}
