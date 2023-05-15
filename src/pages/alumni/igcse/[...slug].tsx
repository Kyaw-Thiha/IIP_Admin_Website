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
import {
  AddIGCSEAlumniDialog,
  DeleteIGCSEAlumniDialog,
  EditIGCSEAlumniDialog,
} from "@/components/dialogs/igcseAlumniDialogs";
import { type IntGradesType, intToGrade } from "@/utils/helpers";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const IGCSEAlumniListPage: NextPage = () => {
  const router = useRouter();
  const [year, month1, month2] = router.query.slug ?? [];
  const series = `${month1 ?? ""}/${month2 ?? ""}`;

  // Automatically animate the list add and delete
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  //Fetching list of worksheets
  const {
    data: igcseClass,
    refetch,
    isLoading,
    isError,
  } = api.igcseClass.getByYearAndSeries.useQuery({
    year: parseInt(year ?? "2023"),
    series: series as "Feb/Mar" | "May/Jun" | "Oct/Nov",
  });

  return (
    <>
      <Layout activeValue="alumni">
        <div className="flex items-center justify-between space-y-2">
          <div>
            IGCSE Alumni of {series} {year}
          </div>
          <div className="flex items-center space-x-2">
            <AddIGCSEAlumniDialog
              classId={igcseClass?.id ?? ""}
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
              <TableHead className="text-center">EFL</TableHead>
              <TableHead className="text-center">ESL</TableHead>
              <TableHead className="text-center">E.Maths</TableHead>
              <TableHead className="text-center">A.Maths</TableHead>
              <TableHead className="text-center">Chemistry</TableHead>
              <TableHead className="text-center">Physics</TableHead>
              <TableHead className="text-center">Biology</TableHead>
              <TableHead className="text-center">ICT</TableHead>
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
            {igcseClass?.alumni.map((alumni) => {
              return (
                <TableRow key={alumni.id} className="text-center">
                  <TableCell className="font-medium">{alumni.name}</TableCell>
                  <TableCell>
                    {intToGrade[alumni.efl as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.esl as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.emaths as IntGradesType]}
                  </TableCell>
                  <TableCell>
                    {intToGrade[alumni.amaths as IntGradesType]}
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
                    {intToGrade[alumni.ict as IntGradesType]}
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
                      <EditIGCSEAlumniDialog
                        alumni={alumni}
                        refetch={refetch}
                      />
                      <DeleteIGCSEAlumniDialog
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

export default IGCSEAlumniListPage;
