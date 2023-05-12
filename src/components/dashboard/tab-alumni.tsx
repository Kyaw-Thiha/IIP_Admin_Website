import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/select";

import { Plus } from "lucide-react";
import { useState } from "react";

const TabAlumni: React.FC = (props) => {
  const ALevelSeries = ["Jan/Feb", "May/Jun", "Oct/Nov"];

  const [aLevelYear, setaLevelYear] = useState(new Date().getFullYear());
  const [aLevelSeries, setaLevelSeries] = useState(ALevelSeries[0]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>IGCSE</div>
        <div className="flex items-center space-x-2">
          <AddIGCSEYearDialog />
        </div>
      </div>
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>
              <div className="text-2xl font-bold">2020</div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default TabAlumni;

const AddIGCSEYearDialog: React.FC = () => {
  const IGCSEseries = ["Feb/Mar", "May/Jun", "Oct/Nov"];

  const [igcseYear, setIGCSEYear] = useState(new Date().getFullYear());
  const [igcseSeries, setIGCSESeries] = useState(IGCSEseries[0]);

  return (
    <Dialog>
      <DialogTrigger>
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
            <Input id="series" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
