import { type Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { MainNav } from "@/components/dashboard/main-nav";

import { Search } from "@/components/dashboard/search";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";

import TabOverview from "@/components/dashboard/tab-overview";
import TabAlumni from "@/components/dashboard/tab-alumni";
import Link from "next/link";
import { type ReactComponentElement } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

interface Props {
  activeValue: "overview" | "alumni" | "announcements" | "users";
  children?: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {/* <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div> */}
          </div>
          <Tabs defaultValue={props.activeValue} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <Link href="/alumni">
                <TabsTrigger value="alumni">Alumni</TabsTrigger>
              </Link>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="users" disabled>
                Users
              </TabsTrigger>
            </TabsList>
            <TabsContent value={props.activeValue} className="space-y-4">
              {props.children}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
