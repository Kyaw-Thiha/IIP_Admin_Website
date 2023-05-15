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

import { useState } from "react";
import { type RouterOutputs, api } from "@/utils/api";
import { type QueryObserverBaseResult } from "@tanstack/react-query";

type AnnouncementType = RouterOutputs["announcement"]["get"];

interface AddDialogProps {
  refetch: QueryObserverBaseResult["refetch"];
}

export const AddAnnouncementDialog: React.FC<AddDialogProps> = (props) => {
  const [title, setTitle] = useState("");

  const createAnnouoncement = api.announcement.create.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const addAnnouncement = () => {
    createAnnouoncement.mutate({
      title: title,
      image: "",
      text: "",
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
          <DialogTitle>Add Announcement</DialogTitle>
          <DialogDescription>
            Enter title for new announcement here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={addAnnouncement}>
              Create Announcement
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteDialogProps {
  class: AnnouncementType;
  refetch: QueryObserverBaseResult["refetch"];
}

export const DeleteAnnouncementDialog: React.FC<DeleteDialogProps> = (
  props
) => {
  const deleteAnnouncement = api.announcement.delete.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    deleteAnnouncement.mutate({
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            annoucement from our servers.
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
