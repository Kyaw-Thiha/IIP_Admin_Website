import { type Metadata } from "next";

import Layout from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { api } from "@/utils/api";
import { type QueryObserverBaseResult } from "@tanstack/react-query";

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
                <Card className="cursor-pointer">
                  <CardHeader className="flex items-center justify-center">
                    <CardTitle>
                      <div className="text-2xl font-bold">
                        {igcseClass.series} {igcseClass.year}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

interface Props {
  refetch: QueryObserverBaseResult["refetch"];
}

const AddIGCSEClassDialog: React.FC<Props> = () => {
  const seasons = ["Feb/Mar", "May/Jun", "Oct/Nov"];

  const [igcseYear, setIGCSEYear] = useState(new Date().getFullYear());
  const [igcseSeries, setIGCSESeries] = useState(seasons[0]);

  const createIGCSEClass = api.igcseClass.create.useMutation({
    onSuccess: () => {
      ("");
    },
  });

  const addIGCSEClass = () => {
    createIGCSEClass.mutate({
      year: igcseYear,
      series: igcseSeries as "Feb/Mar" | "May/Jun" | "Oct/Nov",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add IGCSE Class</DialogTitle>
          <DialogDescription>
            Enter data for new IGCSE class here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              value={igcseYear}
              onChange={(e) => {
                setIGCSEYear(parseInt(e.target.value));
              }}
              className="col-span-3"
              type="number"
              min={1950}
              step={1}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="series" className="text-right">
              Series
            </Label>
            <Select value={igcseSeries} onValueChange={setIGCSESeries}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a series" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Series</SelectLabel>
                  {seasons.map((season) => {
                    return (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={addIGCSEClass}>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
