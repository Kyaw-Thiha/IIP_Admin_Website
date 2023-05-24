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
import {
  type GradesType,
  gradeToInt,
  type IntGradesType,
  intToGrade,
} from "@/utils/helpers";
import { UploadFile } from "../ui/upload-file";

type IGCSEAlumni = RouterOutputs["igcseAlumni"]["get"];

interface AddDialogProps {
  classId: string;
  refetch: QueryObserverBaseResult["refetch"];
}

export const AddIGCSEAlumniDialog: React.FC<AddDialogProps> = (props) => {
  // State variables and setters to store grades of each subjects
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("Female" as "Male" | "Female");
  const [esl, setESL] = useState("-" as GradesType);
  const [efl, setEFL] = useState("-" as GradesType);
  const [englishLiterature, setEnglishLiterature] = useState("-" as GradesType);
  const [emaths, setEMaths] = useState("-" as GradesType);
  const [amaths, setAMaths] = useState("-" as GradesType);
  const [chemistry, setChemistry] = useState("-" as GradesType);
  const [physics, setPhysics] = useState("-" as GradesType);
  const [biology, setBiology] = useState("-" as GradesType);
  const [ict, setICT] = useState("-" as GradesType);
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
      label: "ESL",
      value: esl,
      func: setESL,
    },
    {
      label: "EFL",
      value: efl,
      func: setEFL,
    },
    {
      label: "EnglishLiterature",
      value: englishLiterature,
      func: setEnglishLiterature,
    },
    {
      label: "E.Maths",
      value: emaths,
      func: setEMaths,
    },
    {
      label: "A.Maths",
      value: amaths,
      func: setAMaths,
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
      label: "ICT",
      value: ict,
      func: setICT,
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
  const createIGCSEAlumni = api.igcseAlumni.create.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const addIGCSEAlumni = () => {
    createIGCSEAlumni.mutate({
      name: name,
      image: "",
      gender: gender,
      classId: props.classId,
      esl: gradeToInt[esl],
      efl: gradeToInt[efl],
      englishLiterature: gradeToInt[englishLiterature],
      emaths: gradeToInt[emaths],
      amaths: gradeToInt[amaths],
      chemistry: gradeToInt[chemistry],
      physics: gradeToInt[physics],
      biology: gradeToInt[biology],
      ict: gradeToInt[ict],
      cs: gradeToInt[cs],
      business: gradeToInt[business],
      accounting: gradeToInt[accounting],
      economics: gradeToInt[economics],
      history: gradeToInt[history],
      geography: gradeToInt[geography],
      psychology: gradeToInt[psychology],
      totalGrades:
        gradeToInt[esl] +
        gradeToInt[efl] +
        gradeToInt[emaths] +
        gradeToInt[amaths] +
        gradeToInt[chemistry] +
        gradeToInt[physics] +
        gradeToInt[biology] +
        gradeToInt[ict] +
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
      <DialogContent className="h-[80vh] overflow-y-scroll sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add IGCSE Alumni</DialogTitle>
          <DialogDescription>
            Enter data for new IGCSE alumni here. Click save when you are done.
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
            <Button type="submit" onClick={addIGCSEAlumni}>
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface EditDialogProps {
  alumni: IGCSEAlumni;
  refetch: QueryObserverBaseResult["refetch"];
}

export const EditIGCSEAlumniDialog: React.FC<EditDialogProps> = (props) => {
  // State variables and setters to store grades of each subjects
  const [name, setName] = useState(props.alumni?.name ?? "");
  const [gender, setGender] = useState(
    (props.alumni?.gender ?? "Male") as "Male" | "Female"
  );
  const [esl, setESL] = useState(
    intToGrade[props.alumni?.esl as IntGradesType] as GradesType
  );
  const [efl, setEFL] = useState(
    intToGrade[props.alumni?.efl as IntGradesType] as GradesType
  );
  const [englishLiterature, setEnglishLiterature] = useState(
    intToGrade[props.alumni?.englishLiterature as IntGradesType] as GradesType
  );
  const [emaths, setEMaths] = useState(
    intToGrade[props.alumni?.emaths as IntGradesType] as GradesType
  );
  const [amaths, setAMaths] = useState(
    intToGrade[props.alumni?.amaths as IntGradesType] as GradesType
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
  const [ict, setICT] = useState(
    intToGrade[props.alumni?.ict as IntGradesType] as GradesType
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
      label: "ESL",
      value: esl,
      func: setESL,
    },
    {
      label: "EFL",
      value: efl,
      func: setEFL,
    },
    {
      label: "English Literature",
      value: englishLiterature,
      func: setEnglishLiterature,
    },
    {
      label: "E.Maths",
      value: emaths,
      func: setEMaths,
    },
    {
      label: "A.Maths",
      value: amaths,
      func: setAMaths,
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
      label: "ICT",
      value: ict,
      func: setICT,
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
  const editIGCSEAlumni = api.igcseAlumni.edit.useMutation({
    onSuccess: () => {
      void props.refetch();
    },
  });

  const confirm = () => {
    editIGCSEAlumni.mutate({
      id: props.alumni?.id ?? "",
      name: name,
      gender: gender,
      esl: gradeToInt[esl],
      efl: gradeToInt[efl],
      englishLiterature: gradeToInt[englishLiterature],
      emaths: gradeToInt[emaths],
      amaths: gradeToInt[amaths],
      chemistry: gradeToInt[chemistry],
      physics: gradeToInt[physics],
      biology: gradeToInt[biology],
      ict: gradeToInt[ict],
      cs: gradeToInt[cs],
      business: gradeToInt[business],
      accounting: gradeToInt[accounting],
      economics: gradeToInt[economics],
      history: gradeToInt[history],
      geography: gradeToInt[geography],
      psychology: gradeToInt[psychology],
      totalGrades:
        gradeToInt[esl] +
        gradeToInt[efl] +
        gradeToInt[emaths] +
        gradeToInt[amaths] +
        gradeToInt[chemistry] +
        gradeToInt[physics] +
        gradeToInt[biology] +
        gradeToInt[ict] +
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
  const editImage = api.igcseAlumni.editImage.useMutation({
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
          <DialogTitle>Edit IGCSE Alumni</DialogTitle>
          <DialogDescription>
            Enter data for IGCSE alumni here. Click save when you are done.
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
            <Button type="submit" onClick={confirm}>
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteIGCSEAlumniDialog: React.FC<EditDialogProps> = (props) => {
  const deleteAlumni = api.igcseAlumni.delete.useMutation({
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
