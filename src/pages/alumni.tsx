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
} from "@/components/dashboard/dialogs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function AlumniPage() {
  // Automatically animate the list add and delete
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  //Fetching list of worksheets
  const {
    data: igcseClasses,
    refetch: refetchIgcseClasses,
    isLoading,
    isError,
  } = api.igcseClass.getAll.useQuery(
    undefined // no input
  );

  // const deleteUser = api.user.delete.useMutation({
  //   onSuccess: () => {
  //     void signOut({
  //       callbackUrl: `${window.location.origin}`,
  //     });
  //   },
  // });

  const classes = igcseClasses ?? [];

  return (
    <>
      <Layout activeValue="alumni">
        <div className="flex items-center justify-between space-y-2">
          <div>IGCSE</div>
          <div className="flex items-center space-x-2">
            <AddIGCSEClassDialog refetch={refetchIgcseClasses} />
          </div>
        </div>
        <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-4" ref={parent}>
          {classes.map((igcseClass) => {
            return (
              <>
                <Card>
                  <CardHeader className="">
                    <div className="flex justify-between">
                      <div></div>
                      <div className="flex gap-2">
                        <EditIGCSEClassDialog
                          class={igcseClass}
                          refetch={refetchIgcseClasses}
                        />
                        <DeleteIGCSEClassDialog
                          class={igcseClass}
                          refetch={refetchIgcseClasses}
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
      </Layout>
    </>
  );
}
