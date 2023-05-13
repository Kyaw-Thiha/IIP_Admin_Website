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
import { AddIGCSEAlumniDialog } from "@/components/dialogs/alumniDialogs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const AlumniList: NextPage = () => {
  const router = useRouter();
  const [year, month1, month2] = router.query.slug ?? [];
  const series = `${month1 ?? ""}/${month2 ?? ""}`;

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
            Alumni of {series} {year}
          </div>
          <div className="flex items-center space-x-2">
            <AddIGCSEAlumniDialog refetch={refetch} />
          </div>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>English</TableHead>
              <TableHead>E.Maths</TableHead>
              <TableHead>A.Maths</TableHead>
              <TableHead>Chemistry</TableHead>
              <TableHead>Physics</TableHead>
              <TableHead>Biology</TableHead>
              <TableHead>ICT</TableHead>
              <TableHead>CS</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Accounting</TableHead>
              <TableHead>Economics</TableHead>
              <TableHead>History</TableHead>
              <TableHead>Geography</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Layout>
    </>
  );
};

export default AlumniList;
