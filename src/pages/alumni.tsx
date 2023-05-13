import { type Metadata } from "next";

import Layout from "@/components/layout";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { type RouterOutputs, api } from "@/utils/api";
import { type QueryObserverBaseResult } from "@tanstack/react-query";
import Link from "next/link";

type IGCSEClass = RouterOutputs["igcseClass"]["get"];

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
                    <Link className="w-full" href={`/igcse/${igcseClass.id}`}>
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

interface AddDialogProps {
  refetch: QueryObserverBaseResult["refetch"];
}

const AddIGCSEClassDialog: React.FC<AddDialogProps> = (props) => {
  const seasons = ["Feb/Mar", "May/Jun", "Oct/Nov"];

  const [igcseYear, setIGCSEYear] = useState(new Date().getFullYear());
  const [igcseSeries, setIGCSESeries] = useState(seasons[0]);

  const createIGCSEClass = api.igcseClass.create.useMutation({
    onSuccess: () => {
      void props.refetch();
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
              Create Class
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface EditDialogProps {
  class: IGCSEClass;
  refetch: QueryObserverBaseResult["refetch"];
}

const EditIGCSEClassDialog: React.FC<EditDialogProps> = (props) => {
  const seasons = ["Feb/Mar", "May/Jun", "Oct/Nov"];

  const [igcseYear, setIGCSEYear] = useState(props.class?.year);
  const [igcseSeries, setIGCSESeries] = useState(props.class?.series);

  const editIGCSEClass = api.igcseClass.edit.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const saveIGCSEClass = () => {
    editIGCSEClass.mutate({
      id: props.class?.id ?? "",
      year: igcseYear ?? new Date().getFullYear(),
      series: igcseSeries as "Feb/Mar" | "May/Jun" | "Oct/Nov",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit IGCSE Class</DialogTitle>
          <DialogDescription>
            Enter data for IGCSE class here. Click save when you are done.
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
            <Button type="submit" onClick={saveIGCSEClass}>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DeleteIGCSEClassDialog: React.FC<EditDialogProps> = (props) => {
  const deleteIGCSEClass = api.igcseClass.delete.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    deleteIGCSEClass.mutate({
      id: props.class?.id ?? "",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the class
            and remove the alumni in that class from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
