import { Plus, Edit, Trash2 } from "lucide-react";
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

import { useState } from "react";
import { type RouterOutputs, api } from "@/utils/api";
import { type QueryObserverBaseResult } from "@tanstack/react-query";

type IGCSEClass = RouterOutputs["igcseClass"]["get"];

interface AddDialogProps {
  refetch: QueryObserverBaseResult["refetch"];
}

export const AddIGCSEAlumniDialog: React.FC<AddDialogProps> = (props) => {
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

export const EditIGCSEAlumniDialog: React.FC<EditDialogProps> = (props) => {
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

export const DeleteIGCSEAlumniDialog: React.FC<EditDialogProps> = (props) => {
  const deleteAlumni = api.igcseClass.delete.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    deleteAlumni.mutate({
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
            This action cannot be undone. This will permanently delete the
            alumni from our servers.
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
