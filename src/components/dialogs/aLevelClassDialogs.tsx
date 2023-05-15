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

type ALevelClass = RouterOutputs["aLevelClass"]["get"];

interface AddDialogProps {
  refetch: QueryObserverBaseResult["refetch"];
}

export const AddALevelClassDialog: React.FC<AddDialogProps> = (props) => {
  const seasons = ["Jan", "May/Jun", "Oct"];

  const [aLevelYear, setALevelYear] = useState(new Date().getFullYear());
  const [aLevelSeries, setALevelSeries] = useState(seasons[0]);

  const createALevelClass = api.aLevelClass.create.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const addALevelClass = () => {
    createALevelClass.mutate({
      year: aLevelYear,
      series: aLevelSeries as "Jan" | "May/Jun" | "Oct",
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
          <DialogTitle>Add A Level Class</DialogTitle>
          <DialogDescription>
            Enter data for new A Level class here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              value={aLevelYear}
              onChange={(e) => {
                setALevelYear(parseInt(e.target.value));
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
            <Select value={aLevelSeries} onValueChange={setALevelSeries}>
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
            <Button type="submit" onClick={addALevelClass}>
              Create Class
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface EditDialogProps {
  class: ALevelClass;
  refetch: QueryObserverBaseResult["refetch"];
}

export const EditALevelClassDialog: React.FC<EditDialogProps> = (props) => {
  const seasons = ["Jan", "May/Jun", "Oct"];

  const [aLevelYear, setALevelYear] = useState(props.class?.year);
  const [aLevelSeries, setALevelSeries] = useState(props.class?.series);

  const editALevelClass = api.aLevelClass.edit.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const saveALevelClass = () => {
    editALevelClass.mutate({
      id: props.class?.id ?? "",
      year: aLevelYear ?? new Date().getFullYear(),
      series: aLevelSeries as "Jan" | "May/Jun" | "Oct",
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
          <DialogTitle>Edit A-Level Class</DialogTitle>
          <DialogDescription>
            Enter data for A Level class here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              value={aLevelYear}
              onChange={(e) => {
                setALevelYear(parseInt(e.target.value));
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
            <Select value={aLevelSeries} onValueChange={setALevelSeries}>
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
            <Button type="submit" onClick={saveALevelClass}>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteALevelClassDialog: React.FC<EditDialogProps> = (props) => {
  const deleteALevelClass = api.aLevelClass.delete.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    deleteALevelClass.mutate({
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
