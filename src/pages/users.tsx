import Layout from "@/components/layout";
import { api } from "@/utils/api";
import type { NextPage, Metadata } from "next";
import { useRouter } from "next/router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Check, ShieldClose } from "lucide-react";
import {
  AddUserDialog,
  DeleteUserDialog,
  EditUserDialog,
} from "@/components/dialogs/userDialogs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const UsersListPage: NextPage = () => {
  // Automatically animate the list add and delete
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  //Fetching list of worksheets
  const {
    data: fetchedUsers,
    refetch,
    isLoading,
    isError,
  } = api.user.getAll.useQuery();
  const users = fetchedUsers ?? [];

  return (
    <>
      <Layout activeValue="users">
        <div className="flex items-center justify-between space-y-2">
          <div>Users</div>
          <div className="flex items-center space-x-2">
            <AddUserDialog refetch={refetch} />
          </div>
        </div>
        <Table>
          <TableCaption>A list of users</TableCaption>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[200px] text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">
                Can Edit Announcements
              </TableHead>
              <TableHead className="text-center">Can Edit Alumni</TableHead>
              <TableHead className="text-center">Can Edit Users</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={parent}>
            {users.map((user) => {
              return (
                <TableRow key={user.id} className="text-center">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex justify-center">
                      {user.permission?.editAnnouncements ? (
                        <Check />
                      ) : (
                        <ShieldClose />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className=" font-medium">
                    <div className="flex justify-center">
                      {" "}
                      {user.permission?.editAlumni ? (
                        <Check />
                      ) : (
                        <ShieldClose />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex justify-center">
                      {user.permission?.editUsers ? <Check /> : <ShieldClose />}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex w-full justify-center gap-2 ">
                      <EditUserDialog user={user} refetch={refetch} />
                      <DeleteUserDialog user={user} refetch={refetch} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Layout>
    </>
  );
};

export default UsersListPage;
