import { type Metadata } from "next";

import Layout from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "@/utils/api";

import { Skeleton } from "@/components/ui/skeleton";
import {
  AddAnnouncementDialog,
  DeleteAnnouncementDialog,
} from "@/components/dialogs/announcementDialogs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function AlumniPage() {
  // Automatically animate the list add and delete
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  //Fetching list of igcse classes
  const {
    data: fetchedAnnouncements,
    refetch,
    isLoading,
    isError,
  } = api.announcement.getAll.useQuery(
    undefined // no input
  );

  const announcements = fetchedAnnouncements ?? [];

  return (
    <>
      <Layout activeValue="announcements">
        <section>
          <div className="flex items-center justify-between space-y-2">
            <h2 className="mb-4 text-xl">Announcements</h2>
            <div className="flex items-center space-x-2">
              <AddAnnouncementDialog refetch={refetch} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="h-72" />
              <Skeleton className="h-72" />
              <Skeleton className="h-72" />
              <Skeleton className="h-72" />
            </div>
          ) : (
            <div
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              ref={parent}
            >
              {announcements.map((announcement) => {
                return (
                  <>
                    <Card key={announcement.id}>
                      <CardHeader className="">
                        <div className="flex justify-between">
                          <div></div>

                          <DeleteAnnouncementDialog
                            class={announcement}
                            refetch={refetch}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="my-8 flex items-center justify-center">
                        <CardTitle>
                          <div className="text-2xl font-bold">
                            {announcement.title}
                          </div>
                        </CardTitle>
                      </CardContent>
                      <CardFooter>
                        <Link
                          className="w-full"
                          href={`/announcements/${announcement.id}`}
                        >
                          <Button className="w-full">Edit Text</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </>
                );
              })}
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}
