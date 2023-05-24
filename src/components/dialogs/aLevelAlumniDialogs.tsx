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
import { UploadFile } from "../ui/upload-file";
import {
  type GradesType,
  gradeToInt,
  type IntGradesType,
  intToGrade,
} from "@/utils/helpers";

type ALevelAlumni = RouterOutputs["aLevelAlumni"]["get"];

interface AddDialogProps {
  classId: string;
  refetch: QueryObserverBaseResult["refetch"];
}

export const AddALevelAlumniDialog: React.FC<AddDialogProps> = (props) => {
  // State variables and setters to store grades of each subjects
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("Female" as "Male" | "Female");
  const [english, setEnglish] = useState("-" as GradesType);
  const [pureMaths, setPureMaths] = useState("-" as GradesType);
  const [furtherMaths, setFurtherMaths] = useState("-" as GradesType);
  const [chemistry, setChemistry] = useState("-" as GradesType);
  const [physics, setPhysics] = useState("-" as GradesType);
  const [biology, setBiology] = useState("-" as GradesType);
  const [it, setIT] = useState("-" as GradesType);
  const [cs, setCS] = useState("-" as GradesType);
  const [business, setBusiness] = useState("-" as GradesType);
  const [accounting, setAccounting] = useState("-" as GradesType);
  const [economics, setEconomics] = useState("-" as GradesType);
  const [history, setHistory] = useState("-" as GradesType);
  const [geography, setGeography] = useState("-" as GradesType);
  const [psychology, setPsychology] = useState("-" as GradesType);

  // List of subejcts and its corresponding values and setters
  const subjects = [
    {
      label: "English",
      value: english,
      func: setEnglish,
    },
    {
      label: "Pure Maths",
      value: pureMaths,
      func: setPureMaths,
    },
    {
      label: "Further Maths",
      value: furtherMaths,
      func: setFurtherMaths,
    },
    {
      label: "Chemistry",
      value: chemistry,
      func: setChemistry,
    },
    {
      label: "Physics",
      value: physics,
      func: setPhysics,
    },
    {
      label: "Biology",
      value: biology,
      func: setBiology,
    },
    {
      label: "IT",
      value: it,
      func: setIT,
    },
    {
      label: "CS",
      value: cs,
      func: setCS,
    },
    {
      label: "Business",
      value: business,
      func: setBusiness,
    },
    {
      label: "Accounting",
      value: accounting,
      func: setAccounting,
    },
    {
      label: "Economics",
      value: economics,
      func: setEconomics,
    },
    {
      label: "History",
      value: history,
      func: setHistory,
    },
    {
      label: "Geography",
      value: geography,
      func: setGeography,
    },
    {
      label: "Psychology",
      value: psychology,
      func: setPsychology,
    },
  ];

  //Function to create the alumni
  const createALevelAlumni = api.aLevelAlumni.create.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const addALevelAlumni = () => {
    createALevelAlumni.mutate({
      name: name,
      image: "",
      gender: gender,
      classId: props.classId,
      english: gradeToInt[english],
      pureMaths: gradeToInt[pureMaths],
      furtherMaths: gradeToInt[furtherMaths],
      chemistry: gradeToInt[chemistry],
      physics: gradeToInt[physics],
      biology: gradeToInt[biology],
      it: gradeToInt[it],
      cs: gradeToInt[cs],
      business: gradeToInt[business],
      accounting: gradeToInt[accounting],
      economics: gradeToInt[economics],
      history: gradeToInt[history],
      geography: gradeToInt[geography],
      psychology: gradeToInt[psychology],
      totalGrades:
        gradeToInt[english] +
        gradeToInt[pureMaths] +
        gradeToInt[furtherMaths] +
        gradeToInt[chemistry] +
        gradeToInt[physics] +
        gradeToInt[biology] +
        gradeToInt[it] +
        gradeToInt[cs] +
        gradeToInt[business] +
        gradeToInt[accounting] +
        gradeToInt[economics] +
        gradeToInt[history] +
        gradeToInt[geography] +
        gradeToInt[psychology],
    });
  };

  const onImageUploaded = (fileUrl: string) => {
    setImage(fileUrl);
  };

  const createDeletedImage = api.deletedImage.create.useMutation({});
  // Function to remove image
  const deleteImage = () => {
    // Need to implement the logic of actually deleting the image in uploadthing
    createDeletedImage.mutate({ url: image });
    setImage("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] overflow-y-scroll sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add A-Level Alumni</DialogTitle>
          <DialogDescription>
            Enter data for new A-Level alumni here. Click save when you are
            done.
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
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Image</Label>
            <div className="col-span-3 flex flex-col gap-4">
              <UploadFile
                file={image}
                onUploadComplete={onImageUploaded}
                alt={`Image of ${name}`}
              />
              {image != "" ? (
                <Button
                  onClick={() => {
                    deleteImage();
                  }}
                >
                  Remove Image
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>

            <Select
              value={gender}
              onValueChange={(value) => {
                setGender(value as "Male" | "Female");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem key="Male" value="Male">
                    Male
                  </SelectItem>
                  <SelectItem key="Female" value="Female">
                    Female
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {subjects.map((subject) => {
            return (
              <div
                key={subject.label}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor="series" className="text-right">
                  {subject.label}
                </Label>

                <Select
                  value={subject.value}
                  onValueChange={(value) => {
                    subject.func(value as GradesType);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Grades</SelectLabel>
                      {Object.keys(gradeToInt).map((grade) => {
                        return (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={addALevelAlumni}>
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface EditDialogProps {
  alumni: ALevelAlumni;
  refetch: QueryObserverBaseResult["refetch"];
}

export const EditALevelAlumniDialog: React.FC<EditDialogProps> = (props) => {
  // State variables and setters to store grades of each subjects
  const [name, setName] = useState(props.alumni?.name ?? "");
  const [gender, setGender] = useState("Female" as "Male" | "Female");
  const [english, setEnglish] = useState(
    intToGrade[props.alumni?.english as IntGradesType] as GradesType
  );
  const [pureMaths, setPureMaths] = useState(
    intToGrade[props.alumni?.pureMaths as IntGradesType] as GradesType
  );
  const [furtherMaths, setFurtherMaths] = useState(
    intToGrade[props.alumni?.furtherMaths as IntGradesType] as GradesType
  );
  const [chemistry, setChemistry] = useState(
    intToGrade[props.alumni?.chemistry as IntGradesType] as GradesType
  );
  const [physics, setPhysics] = useState(
    intToGrade[props.alumni?.physics as IntGradesType] as GradesType
  );
  const [biology, setBiology] = useState(
    intToGrade[props.alumni?.biology as IntGradesType] as GradesType
  );
  const [it, setIT] = useState(
    intToGrade[props.alumni?.it as IntGradesType] as GradesType
  );
  const [cs, setCS] = useState(
    intToGrade[props.alumni?.cs as IntGradesType] as GradesType
  );
  const [business, setBusiness] = useState(
    intToGrade[props.alumni?.business as IntGradesType] as GradesType
  );
  const [accounting, setAccounting] = useState(
    intToGrade[props.alumni?.accounting as IntGradesType] as GradesType
  );
  const [economics, setEconomics] = useState(
    intToGrade[props.alumni?.economics as IntGradesType] as GradesType
  );
  const [history, setHistory] = useState(
    intToGrade[props.alumni?.history as IntGradesType] as GradesType
  );
  const [geography, setGeography] = useState(
    intToGrade[props.alumni?.geography as IntGradesType] as GradesType
  );
  const [psychology, setPsychology] = useState(
    intToGrade[props.alumni?.history as IntGradesType] as GradesType
  );

  // List of subejcts and its corresponding values and setters
  const subjects = [
    {
      label: "English",
      value: english,
      func: setEnglish,
    },
    {
      label: "Pure Maths",
      value: pureMaths,
      func: setPureMaths,
    },
    {
      label: "Further Maths",
      value: furtherMaths,
      func: setFurtherMaths,
    },
    {
      label: "Chemistry",
      value: chemistry,
      func: setChemistry,
    },
    {
      label: "Physics",
      value: physics,
      func: setPhysics,
    },
    {
      label: "Biology",
      value: biology,
      func: setBiology,
    },
    {
      label: "IT",
      value: it,
      func: setIT,
    },
    {
      label: "CS",
      value: cs,
      func: setCS,
    },
    {
      label: "Business",
      value: business,
      func: setBusiness,
    },
    {
      label: "Accounting",
      value: accounting,
      func: setAccounting,
    },
    {
      label: "Economics",
      value: economics,
      func: setEconomics,
    },
    {
      label: "History",
      value: history,
      func: setHistory,
    },
    {
      label: "Geography",
      value: geography,
      func: setGeography,
    },
    {
      label: "Psychology",
      value: psychology,
      func: setPsychology,
    },
  ];

  //Function to create the alumni
  const editALevelAlumni = api.aLevelAlumni.edit.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const saveALevelAlumni = () => {
    editALevelAlumni.mutate({
      id: props.alumni?.id ?? "",
      name: name,
      gender: gender,
      english: gradeToInt[english],
      pureMaths: gradeToInt[pureMaths],
      furtherMaths: gradeToInt[furtherMaths],
      chemistry: gradeToInt[chemistry],
      physics: gradeToInt[physics],
      biology: gradeToInt[biology],
      it: gradeToInt[it],
      cs: gradeToInt[cs],
      business: gradeToInt[business],
      accounting: gradeToInt[accounting],
      economics: gradeToInt[economics],
      history: gradeToInt[history],
      geography: gradeToInt[geography],
      psychology: gradeToInt[psychology],
      totalGrades:
        gradeToInt[english] +
        gradeToInt[pureMaths] +
        gradeToInt[furtherMaths] +
        gradeToInt[chemistry] +
        gradeToInt[physics] +
        gradeToInt[biology] +
        gradeToInt[it] +
        gradeToInt[cs] +
        gradeToInt[business] +
        gradeToInt[accounting] +
        gradeToInt[economics] +
        gradeToInt[history] +
        gradeToInt[geography] +
        gradeToInt[psychology],
    });
  };

  // Function to edit the imaage
  const editImage = api.aLevelAlumni.editImage.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });
  const onImageUploaded = (fileUrl: string) => {
    editImage.mutate({ id: props.alumni?.id ?? "", image: fileUrl });
  };

  const createDeletedImage = api.deletedImage.create.useMutation({});
  // Function to remove image
  const deleteImage = () => {
    // Need to implement the logic of actually deleting the image in uploadthing
    createDeletedImage.mutate({ url: props.alumni?.image ?? "" });
    editImage.mutate({ id: props.alumni?.id ?? "", image: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Edit className=" h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] overflow-y-scroll sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit A-Level Alumni</DialogTitle>
          <DialogDescription>
            Enter data for A-Level alumni here. Click save when you are done.
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
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Image</Label>
            <div className="col-span-3 flex flex-col gap-4">
              <UploadFile
                file={props.alumni?.image ?? ""}
                onUploadComplete={onImageUploaded}
                alt={`Image of ${props.alumni?.name ?? ""}`}
              />
              {props.alumni?.image != "" ? (
                <Button
                  onClick={() => {
                    deleteImage();
                  }}
                >
                  Remove Image
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>

            <Select
              value={gender}
              onValueChange={(value) => {
                setGender(value as "Male" | "Female");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem key="Male" value="Male">
                    Male
                  </SelectItem>
                  <SelectItem key="Female" value="Female">
                    Female
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {subjects.map((subject) => {
            return (
              <div
                key={subject.label}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor="series" className="text-right">
                  {subject.label}
                </Label>

                <Select
                  value={subject.value}
                  onValueChange={(value) => {
                    subject.func(value as GradesType);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Grades</SelectLabel>
                      {Object.keys(gradeToInt).map((grade) => {
                        return (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={saveALevelAlumni}>
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteALevelAlumniDialog: React.FC<EditDialogProps> = (props) => {
  const deleteAlumni = api.aLevelAlumni.delete.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    deleteAlumni.mutate({
      id: props.alumni?.id ?? "",
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
