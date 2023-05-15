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

import { type IntGradesType, intToGrade } from "@/utils/helpers";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  AddALevelAlumniDialog,
  DeleteALevelAlumniDialog,
  EditALevelAlumniDialog,
} from "@/components/dialogs/aLevelAlumniDialogs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const ALevelAlumniList: NextPage = () => {
  const router = useRouter();
  const [year, month1, month2] = router.query.slug ?? [];
  let series;
  if (month2) {
    series = `${month1 ?? ""}/${month2 ?? ""}`;
  } else {
    series = month1;
  }

  // Automatically animate the list add and delete
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  //Fetching list of worksheets
  const {
    data: aLevelClass,
    refetch,
    isLoading,
    isError,
  } = api.aLevelClass.getByYearAndSeries.useQuery({
    year: parseInt(year ?? "2023"),
    series: series as "Jan" | "May/Jun" | "Oct",
  });

  return (
    <>
      <Layout activeValue="alumni">
        <div className="flex items-center justify-between space-y-2">
          <div>
            A-Level Alumni of {series} {year}
          </div>
          <div className="flex items-center space-x-2">
            <AddALevelAlumniDialog
              classId={aLevelClass?.id ?? ""}
              refetch={refetch}
            />
          </div>
        </div>
        <Table>
          <TableCaption>
            A list of alumni in {series} {year}.
          </TableCaption>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[200px] text-center">Name</TableHead>
              <TableHead className="text-center">English</TableHead>
              <TableHead className="text-center">Pure Maths</TableHead>
              <TableHead className="text-center">Further Maths</TableHead>
              <TableHead className="text-center">Chemistry</TableHead>
              <TableHead className="text-center">Physics</TableHead>
              <TableHead className="text-center">Biology</TableHead>
              <TableHead className="text-center">IT</TableHead>
              <TableHead className="text-center">CS</TableHead>
              <TableHead className="text-center">Business</TableHead>
              <TableHead className="text-center">Accounting</TableHead>
              <TableHead className="text-center">Economics</TableHead>
              <TableHead className="text-center">History</TableHead>
              <TableHead className="text-center">Geography</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={parent}>
            {aLevelClass?.alumni.map((alumni) => {
              return (
                <TableRow key={alumni.id} className="text-center">
                  <TableCell className="font-medium">{alumni.name}</TableCell>
                  <TableCell>
                    {intToGrade[alumni.english as IntGradesType]}
                  </TableCell>

                  <TableCell>
                    {intToGrade[alumni.pureMaths as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.furtherMaths as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.chemistry as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.physics as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.biology as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.it as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.cs as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.business as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.accounting as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.economics as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.history as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.geography as IntGradesType]}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex w-full justify-center gap-2 ">
                      <EditALevelAlumniDialog
                        alumni={alumni}
                        refetch={refetch}
                      />
                      <DeleteALevelAlumniDialog
                        alumni={alumni}
                        refetch={refetch}
                      />
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

export default ALevelAlumniList;
