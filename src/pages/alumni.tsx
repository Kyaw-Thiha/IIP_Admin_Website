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

import {
  AddIGCSEClassDialog,
  EditIGCSEClassDialog,
  DeleteIGCSEClassDialog,
} from "@/components/dialogs/igcseClassDialogs";
import Link from "next/link";
import {
  AddALevelClassDialog,
  DeleteALevelClassDialog,
  EditALevelClassDialog,
} from "@/components/dialogs/aLevelClassDialogs";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function AlumniPage() {
  // Automatically animate the list add and delete
  const [igcseParent, enableIGCSEAnimations] =
    useAutoAnimate(/* optional config */);
  const [aLevelParent, enableALevelAnimations] =
    useAutoAnimate(/* optional config */);

  //Fetching list of igcse classes
  const {
    data: fetchedIGCSEClasses,
    refetch: refetchIGCSEClasses,
    isLoading: IGCSELoading,
    isError: IGCSEError,
  } = api.igcseClass.getAll.useQuery(
    undefined // no input
  );

  const igcseClasses = fetchedIGCSEClasses ?? [];

  //Fetching list of igcse classes
  const {
    data: fetchedALevelClasses,
    refetch: refetchALevelClasses,
    isLoading: ALevelLoading,
    isError: ALevelError,
  } = api.aLevelClass.getAll.useQuery(
    undefined // no input
  );

  const aLevelClasses = fetchedALevelClasses ?? [];

  return (
    <>
      <Layout activeValue="alumni">
        <div className="flex flex-col gap-20">
          {/* IGCSE */}
          <section>
            <div className="flex items-center justify-between space-y-2">
              <h2 className="mb-4 text-xl">IGCSE</h2>
              <div className="flex items-center space-x-2">
                <AddIGCSEClassDialog refetch={refetchIGCSEClasses} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
            {IGCSELoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
              </div>
            ) : (
              <div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                ref={igcseParent}
              >
                {igcseClasses.map((igcseClass) => {
                  return (
                    <>
                      <Card key={igcseClass.id}>
                        <CardHeader className="">
                          <div className="flex justify-between">
                            <div></div>
                            <div className="flex gap-2">
                              <EditIGCSEClassDialog
                                class={igcseClass}
                                refetch={refetchIGCSEClasses}
                              />
                              <DeleteIGCSEClassDialog
                                class={igcseClass}
                                refetch={refetchIGCSEClasses}
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="my-8 flex items-center justify-center">
                          <CardTitle>
                            <div className="text-2xl font-bold">
                              {igcseClass.series} {igcseClass.year}
                            </div>
                          </CardTitle>
                        </CardContent>
                        <CardFooter>
                          <Link
                            className="w-full"
                            href={`/alumni/igcse/${igcseClass.year}/${igcseClass.series}`}
                          >
                            <Button className="w-full">Browse Alumni</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </>
                  );
                })}
              </div>
            )}
          </section>

          {/* A Level */}
          <section>
            <div className="flex items-center justify-between space-y-2">
              <h2 className="mb-4 text-xl">A-Level</h2>
              <div className="flex items-center space-x-2">
                <AddALevelClassDialog refetch={refetchALevelClasses} />
              </div>
            </div>
            {ALevelLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
              </div>
            ) : (
              <div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                ref={aLevelParent}
              >
                {aLevelClasses.map((aLevelClass) => {
                  return (
                    <>
                      <Card key={aLevelClass.id}>
                        <CardHeader>
                          <div className="flex justify-between">
                            <div></div>
                            <div className="flex gap-2">
                              <EditALevelClassDialog
                                class={aLevelClass}
                                refetch={refetchALevelClasses}
                              />
                              <DeleteALevelClassDialog
                                class={aLevelClass}
                                refetch={refetchALevelClasses}
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="my-8 flex items-center justify-center">
                          <CardTitle>
                            <div className="text-2xl font-bold">
                              {aLevelClass.series} {aLevelClass.year}
                            </div>
                          </CardTitle>
                        </CardContent>
                        <CardFooter>
                          <Link
                            className="w-full"
                            href={`/alumni/alevel/${aLevelClass.year}/${aLevelClass.series}`}
                          >
                            <Button className="w-full">Browse Alumni</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
}
