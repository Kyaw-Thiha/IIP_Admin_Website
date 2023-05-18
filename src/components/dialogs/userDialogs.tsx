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
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { type RouterOutputs, api } from "@/utils/api";
import { type QueryObserverBaseResult } from "@tanstack/react-query";

type UserType = RouterOutputs["user"]["get"];

interface AddDialogProps {
  refetch: QueryObserverBaseResult["refetch"];
}

export const AddUserDialog: React.FC<AddDialogProps> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editAnnouncements, setEditAnnouncements] = useState(false);
  const [editAlumni, setEditAlumni] = useState(false);
  const [editUsers, setEditUsers] = useState(false);

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const addUser = () => {
    createUser.mutate({
      name: name,
      email: email,
      password: password,
      editAnnouncements: editAnnouncements,
      editAlumni: editAlumni,
      editUsers: editUsers,
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
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Enter data for new user here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="mt-4 flex flex-col gap-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="edit-announcements"
                className="col-span-2 text-left"
              >
                Edit Announcements
              </Label>
              <Checkbox
                id="edit-announcements"
                checked={editAnnouncements}
                onCheckedChange={() => {
                  setEditAnnouncements(!editAnnouncements);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alumni" className="col-span-2 text-left">
                Edit Alumni
              </Label>
              <Checkbox
                id="edit-alumni"
                checked={editAlumni}
                onCheckedChange={() => {
                  setEditAlumni(!editAlumni);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-users" className="col-span-2 text-left">
                Edit Users
              </Label>
              <Checkbox
                id="edit-users"
                checked={editUsers}
                onCheckedChange={() => {
                  setEditUsers(!editUsers);
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={addUser}>
              Create Class
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface EditDialogProps {
  user: UserType;
  refetch: QueryObserverBaseResult["refetch"];
}

export const EditUserDialog: React.FC<EditDialogProps> = (props) => {
  const [name, setName] = useState(props.user?.name ?? "");
  const [email, setEmail] = useState(props.user?.email ?? "");
  const [editAnnouncements, setEditAnnouncements] = useState(
    props.user?.permission?.editAnnouncements ?? false
  );
  const [editAlumni, setEditAlumni] = useState(
    props.user?.permission?.editAlumni ?? false
  );
  const [editUsers, setEditUsers] = useState(
    props.user?.permission?.editUsers ?? false
  );

  const editUser = api.user.edit.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    editUser.mutate({
      id: props.user?.id ?? "",
      name: name,
      email: email,
      editAnnouncements: editAnnouncements,
      editAlumni: editAlumni,
      editUsers: editUsers,
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Enter data for user here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="col-span-3"
            />
          </div>

          <div className="mt-4 flex flex-col gap-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="edit-announcements"
                className="col-span-2 text-left"
              >
                Edit Announcements
              </Label>
              <Checkbox
                id="edit-announcements"
                checked={editAnnouncements}
                onCheckedChange={() => {
                  setEditAnnouncements(!editAnnouncements);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-alumni" className="col-span-2 text-left">
                Edit Alumni
              </Label>
              <Checkbox
                id="edit-alumni"
                checked={editAlumni}
                onCheckedChange={() => {
                  setEditAlumni(!editAlumni);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-users" className="col-span-2 text-left">
                Edit Users
              </Label>
              <Checkbox
                id="edit-users"
                checked={editUsers}
                onCheckedChange={() => {
                  setEditUsers(!editUsers);
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={confirm}>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteUserDialog: React.FC<EditDialogProps> = (props) => {
  const deleteUser = api.user.delete.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    deleteUser.mutate({
      id: props.user?.id ?? "",
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
            This action cannot be undone. This will permanently delete the user
            from our servers.
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
