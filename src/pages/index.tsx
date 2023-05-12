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
import Layout from "@/components/layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function DashboardPage() {
  return (
    <>
      <Layout activeValue="overview">
        <TabOverview />
      </Layout>
    </>
  );
}
